// Debatslist data array for filling in info box
var debatsListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
// Question link click
  $('#debatsList table tbody').on('click', 'td a.linkshowuser', showDebatInfo());
  // Populate the debat table on initial page load
  populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/debats/debatslist', function( data ) {
    debatsListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowdebat" rel="' + this.question + '">' + this.question + '</a></td>';
      tableContent += '<td><a href="#" class="linkdeletedebat" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#debatsList table tbody').html(tableContent);
  });
};

// Show Debat Info
function showDebatInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisDebatQuestion = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = debatsListData.map(function(arrayItem) { return arrayItem.question; }).indexOf(thisDebatQuestion);
  // Get our Debat Object
  var thisDebatObject = debatsListData[arrayPosition];

  //Populate Info Box
  $('#debatInfoQuestion').text(thisDebatObject.question);

};