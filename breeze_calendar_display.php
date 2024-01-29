<?php 
// Wordpress plugin header
/*
Plugin Name: Breeze Calendar
Description: A plugin to display data from the Breeze ChMS API. 
Version: 1.0
Author: David Servias
*/

// Set development mode to true to use test data instead of data from the Breeze API.
$development_mode = false;

// TODO: 
// try to import a file that contains the api key
// If the file doesn't exist, set development mode do true.
// code:
// Check if file exists:
require_once("api_secrets.php");

// include javascript
wp_enqueue_script('breeze_calendar_display', plugin_dir_url(__FILE__) . 'javascript/breeze_calendar_display.js');

// include css
wp_enqueue_style('breeze_calendar_display', plugin_dir_url(__FILE__) . 'css/breeze_calendar_display.css');


function construct_data_array($api_key) {
  $data = array();
  require_once('breeze.php');
  $breeze = new Breeze($api_key);

  // Get start and end dates for events
  $today = date("Y-m-d");
  $start_date_obj = date_create($today);
  $start_date_string = date_format($start_date_obj, "Y-m-d");
  $end_date_obj = date_add($start_date_obj, date_interval_create_from_date_string("2 Months"));
  $end_date_string = date_format($end_date_obj, "Y-m-d");

  // construct request url from start and end dates
  $request_url = "https://uufc.breezechms.com/api/events?start=" . $start_date_string . "&end=" . $end_date_string . "&details=1"; 
  //. "&calendar_id=" . $upcoming_events_calendar_id;

  // Get event data from Breeze 
  $events = $breeze->url($request_url);
  
  $events_data = json_decode($events, true);

  // get locations from breeze
  $locations = $breeze->url('https://uufc.breezechms.com/api/events/locations');
  $available_locations_array = json_decode($locations, true);

  // add data to data array
  $data["events"] = $events_data;
  
  $data["locations"] = $available_locations_array;
  
  // build array of calendar ids
  $data["calendar_ids"] = array(
    "upcoming_events" => "86556",
    "main" => "0",
    "re_sundays" => "81098",
    "rentals" => "86204",
    "inquirers_series" => "89238"
  );

  
  return $data;
};

// TODO: Set up procedures for development mode.
if ($development_mode == true) {
  echo "development mode is true";
  // require_once("event_list_test_data.php");
  // $available_locations_array = json_decode($available_locations_json, true);
  // $events_data = json_decode($events, true);
} 
else 
{
  // do something
        
};

// Function to display heading
function display_heading() {
  $html = "<h1>Events Calendar</h1>";
  return $html;

};

function list_events($api_key) {
  $data = construct_data_array($api_key);
  $output = '<div id="app-container" class=" custom-sidebar-group breeze-template-part" >
  <div class="event-list-container calendar-page">
  <h1 style="font-weight:bold;">Events Calendar</h1>
  <div id="event-list">';
  // loop through events
  foreach ( $data['events'] as $event)  {
       
    // the request to the api gets all the events in all calendars.
    // Here we exclude the events on calendars we don't want to display.
    // If an event has a calendar_id that matches on of the calendars
    // that should not be displayed, it is skipped.
    if (in_array($event['details']['category_id'], 
          [
            $data['calendar_ids']["main"],
            $data['calendar_ids']["re_sundays"],
            $data['calendar_ids']["rentals"],
            $data['calendar_ids']["inquirers_series"]
          ])
        )
    {             
      continue;
    };
  
    $event_name = $event["name"];
    $start_datetime = $event["start_datetime"];
    $month = date("M", strtotime($start_datetime));
    $day = date("d", strtotime($start_datetime));
    $year = date("Y", strtotime($start_datetime));
    // strip of the leading zero
    if ($day[0] == "0") {
      $day = $day[1];
    };
    // parse start time string
    $start_time = date("g:i A", strtotime($start_datetime));
    // if the start time is on the hour, remove the minutes
    if (substr($start_time, -2) == "00") {
      $start_time = substr($start_time, 0, -6);
    }; 
    // remove leading zero from start time.
    if ($start_time[0] == "0") {
      $start_time = substr($start_time, 1);
    };
    // parse end time string
    $end_datetime = $event["end_datetime"];
    // if end time is not set, don't display it
    if ($end_datetime == "0000-00-00 00:00:00") {
      $end_time = "";
      $time_string = $start_time;
    } else {
      $end_time = date("g:i A", strtotime($end_datetime));
      $time_string = $start_time . " - " . $end_time;
    };
    //$event_description = $event["details"]["event_description"];
    $category_id = $event["category_id"];
    
    // get only the first location id listed 
    $location_ids_raw = $event["details"]["location_ids_json"];
    $location_ids_array = json_decode($location_ids_raw);
    $event_location_id = $location_ids_array[0]->id;

    // get the location name from the available locations array
    // Find the element in  $available_locations_array with the value for "id" that matches $event_location_id.
    // Then get the value for "name" from that element.
    // $index will be the index of the element in $available_locations_array that matches $event_location_id.
    $index = array_search($event_location_id, array_column($data['locations'], 'id'));
    $location_name = $data['locations'][$index]["name"];
   


    $output .= '<div class="event-container" onclick="toggleEventSummary(this)">'
      . '<div class="event-summary">' 
      . '<div class="date-container">'
      . '<h1 class="day">' . $day . '</h1>'
      . '<p class="month">' . $month . '</p>'
      . '</div>'
      . '<div class="event-info-container">
          <h2 class="event-name">' . $event_name . '</h2>
          <p class="event_time"><i class="fa-regular fa-clock"></i>
          * ' . $time_string . '</p>
          <p class="event_location"><i class="fa-solid fa-location-dot"></i>*' . $location_name . '</p>    
        </div>  
        <div class="link-to-info-container">
          <span id="link-to-info">info</span>
        </div>
      </div>';
      // Event Details: 
      // Expands when event summary is clicked upon -->
      $output .= '<div class="event-details">
        <h1 class="details-date"> ' . $month . $day . $year . '</h1>
        <h2 class="details-name">' . $event["name"] . '</h2> 
        <p><strong>start time: </strong>' . date("g:i A", strtotime($start_datetime) ) . '</p>
        <p><strong>end time: </strong>' . date("g:i A", strtotime($end_datetime) ) . '</p>
        <p><strong>location: </strong>' . $location_name . '</p>
        <p><strong>description: </strong>' . $event["details"]["event_description"] . '</p>
        <p class="back-to-list">(click to go back to list)</p>
      </div></div>';

    // End of event container -->  
  }; // end foreach loop 
  $output .= '</div></div>';

  // Test: write $output to a text file.
  $file = fopen("output.txt", "w");
  fwrite($file, $output);
  fclose($file);



  return $output;
};



  

// main function
function build_interface($api_key, $events_data) {
  

  $output = display_heading();
  $output .= list_events($api_key);

  return $output;
};

// register the shortcode
add_shortcode('breeze_calendar_display', 'build_interface');







