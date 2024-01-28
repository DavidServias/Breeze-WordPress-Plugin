// Test to make sure the file is loaded
// get heading and change the color
// var heading = document.querySelector('#event-list-heading');
// heading.style.color = 'red';

var eventContainer = document.querySelector('.event-summary-container');
var eventListContainerWidth = "100%";

function toggleEventSummary(event) {
  if ( !(event.id === "is-open")) {
    console.log("!is-open");
    event.id = "is-open";
    //event.classList.remove("is-not-open");
    openEventSummary(event);
  } else if (event.id === "is-open") {
    // remove id "is-open" from event summary container
    console.log("is-open");
    closeEventSummary(event);
    event.removeAttribute("id");
  };
};

function openEventSummary(event) {
  var eventSummaries = document.querySelectorAll('.event-summary');
  var eventDetails = event.querySelector('.event-details');
  // collapse event summary
  console.log(eventSummaries);
  eventSummaries.forEach(function(event) {
    event.style.transition = "height .5s ease-in-out, min-height .5s ease-in-out";
    event.style.minHeight = "0px";
    event.style.height= "0px";
  });
  // expand event details
  eventDetails.style.transition = "height .5s";
  eventDetails.style.height= "500px";
  event.style.maxHeight = "500px";
  event.style.width = "95%";
  event.style.position = "absolute";
  event.style.zIndex = "1";
  event.style.top = "0px";
  event.style.margin = "auto";
  event.onmouseover = function() {
    event.style.transform = "scale(1)";
    event.style.border = "2px solid #5F92A1";
    event.style.marginLeft = "2.5%";
  };
  event.onmouseout = function() {
    event.style.border = "none";
  };
  // scroll to top of list when event expands to keep it all in view.
  var breezeCalendarHeading = document.getElementById("breeze-calendar-heading");
  breezeCalendarHeading.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
  // scroll to top of event on expansion
  eventListContainer = document.querySelector(".event-list-container");
  eventListContainer.scrollTop = 0;
  eventDetails.scrollTop = 0;
  // Hide the "end of list" element
  let end = document.getElementById("end");
  end.style.display = "none";
};

function closeEventSummary(event) {
  let close_duration = 100;
  var eventSummaries = document.querySelectorAll('.event-summary');
  var eventDetails = event.querySelector('.event-details');
  // collapse event details
  eventDetails.style.transition = "height .25s ease-in-out, min-height .25s ease-in-out";
  eventDetails.style.minHeight = "0px";
  eventDetails.style.height= "0px";
  
  // expand event summary
  eventSummaries.forEach(function(event) {
    event.style.transition = `height .25s ease-in-out, min-height .25s ease-in-out, max-height .25s ease-in-out`;
    event.style.minHeight = "100px";
    event.style.maxHeight= "200px";
    event.style.height= "100px";
  });

  event.style.maxHeight = "200px";
  event.style.position = "relative";
  event.removeAttribute("top");
  event.style.zIndex = "0";
  event.style.margin = "10px auto";
  event.style.border = "none";
  let end = document.getElementById("end");
  end.style.display = "block";
 
};




// Original Code+++++++++++

// var eventContainer = document.querySelector('.event-summary-container');
// var eventListContainerWidth = "100%";

// function toggleEventSummary(event) {
//   if ( !(event.id === "is-open")) {
//     console.log("!is-open");
//     event.id = "is-open";
//     //event.classList.remove("is-not-open");
//     openEventSummary(event);
//   } else if (event.id === "is-open") {
//     // remove id "is-open" from event summary container
//     console.log("is-open");
//     closeEventSummary(event);
//     event.removeAttribute("id");
//   };
// };


// function openEventSummary(event) {
//   var eventSummary = event.querySelector('.event-summary');
//   var eventDetails = event.querySelector('.event-details');
//   // collapse event summary
//   eventSummary.style.transition = "height .5s ease-in-out, min-height .5s ease-in-out";
//   eventSummary.style.minHeight = "0px";
//   eventSummary.style.height= "0px";
//   // expand event details
//   eventDetails.style.transition = "height .5s";
//   eventDetails.style.height= "500px";
//   event.style.maxHeight = "500px";
//   event.style.width = "95%";
//   event.style.position = "absolute";
//   event.style.zIndex = "1";
//   event.style.top = "0px";
//   event.style.margin = "auto";
//   event.onmouseover = function() {
//     event.style.transform = "scale(1)";
//     event.style.border = "2px solid #5F92A1";
//     event.style.marginLeft = "2.5%";
//   };
//   event.onmouseout = function() {
//     event.style.border = "none";
//   };
// };

// function closeEventSummary(event) {
//   let close_duration = 100;
//   var eventSummary = event.querySelector('.event-summary');
//   var eventDetails = event.querySelector('.event-details');
//   // collapse event details
//   eventDetails.style.transition = "height .25s ease-in-out, min-height .25s ease-in-out";
//   eventDetails.style.minHeight = "0px";
//   eventDetails.style.height= "0px";
  
//   // expand event summary
//   eventSummary.style.transition = `height .25s ease-in-out, min-height .25s ease-in-out, max-height .25s ease-in-out`;
//   eventSummary.style.minHeight = "100px";
//   eventSummary.style.maxHeight= "200px";
//   eventSummary.style.height= "100px";
//   event.style.maxHeight = "200px";
//   event.style.position = "relative";
//   event.removeAttribute("top");
//   event.style.zIndex = "0";
//   event.style.margin = "10px auto";
//   event.style.border = "none";
 
// };


