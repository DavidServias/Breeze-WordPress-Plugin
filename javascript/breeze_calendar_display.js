// Test to make sure the file is loaded
// get heading and change the color
// var heading = document.querySelector('#event-list-heading');
// heading.style.color = 'red';

var eventContainer = document.querySelector('.event-summary-container');
var eventListContainerWidth = "100%";

 // Select all event containers
 var eventContainers = document.querySelectorAll('.event-container');


function toggleEventDetails(event) {
  if ( !(event.id === "is-open")) {
    event.id = "is-open";
    openEventDetails(event);
  } else if (event.id === "is-open") {
    event.id = "is-closed";
    closeEventDetails(event);
    
  };
};

function openEventDetails(event) {
  var eventSummaries = document.querySelectorAll('.event-summary');
  var eventDetails = event.querySelector('.event-details');


  // Remove border event container
  event.style.border = "none";
  

  // collapse event summary
  console.log(eventSummaries);
  eventSummaries.forEach(function(event) {
    event.style.transition = "height .5s ease-in-out, min-height .5s ease-in-out";
    event.style.minHeight = "0px";
    event.style.height= "0px";
  });
  // expand event details
  eventDetails.style.transition = "height .5s";
  eventDetails.style.height= "fit-content";
  eventDetails.style.border = "3px solid #5F92A1";
  event.style.position = "absolute";
  event.border = "solid #5F92A1 2px";
  event.style.zIndex = "1";
  event.style.top = "0px";
  event.style.margin = "auto";
  event.onmouseover = function() {
    event.style.border = "2px solid #5F92A1"; 
  };
  event.onmouseout = function() {
    event.style.border = "#00000025 2px solid";
  };
  // scroll to top of list when event expands to keep it all in view.
  var topOfApp = document.getElementById("app-container");
  
  // Remove borders from eventContainers
  eventContainers.forEach(function(container) {
    container.style.border = "0px";

  });


  topOfApp.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
  // scroll to top of event on expansion
  var top = document.querySelector(".app-container");
  top.scrollTop = 0;
  eventDetails.scrollTop = 0;
  // Hide the "end of list" element
  let end = document.getElementById("end");
  end.style.display = "none";
};

function closeEventDetails(event) {
  let close_duration = 100;
  var eventSummaries = document.querySelectorAll('.event-summary');
  var eventDetails = event.querySelector('.event-details');
  // collapse event details
  eventDetails.style.transition = "height .25s ease-in-out, min-height .25s ease-in-out";
  eventDetails.style.minHeight = "0px";
  eventDetails.style.height= "0px";
  eventDetails.style.border = "none";
  
  // expand event summary
  eventSummaries.forEach(function(event) {
    event.style.transition = `height .25s ease-in-out, min-height .25s ease-in-out, max-height .25s ease-in-out`;
    event.style.height= "unset";
    event.style.minHeight = "125px";
    event.style.maxHeight= "225px";
   
   
  });

  // replace borders from eventContainers
  eventContainers.forEach(function(container) {
    container.onmouseover = function() {
      container.style.border = "2px solid #5F92A1"; 
    };
    container.onmouseout = function() {
      container.style.border = "#00000025 2px solid";
    };
  });

  // event.style.maxHeight = "200px";
  event.style.position = "relative";
  event.removeAttribute("top");
  event.style.zIndex = "0";
  event.style.margin = "10px auto";
  event.style.border = "2px solid #00000025";
  let end = document.getElementById("end");
  end.style.display = "block";
 
};






