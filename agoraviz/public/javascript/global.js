// Debatslist data array for filling in info box
var debatsListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the debat table on initial page load
  populateTable();
// Question link click

  $('#debates table tbody').on('click', 'td a.linkshowdebat', showDebatInfo);
  $('#formAddContrib').hide();
    // Delete Debat link click
  $('#debates table tbody').on('click', 'td a.linkdeletedebat', deleteDebat);
  $('#contribsList table tbody').hide();
  $




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
      tableContent += '<td><a href="#" class="linkdeletedebat" rel="' + this._id + '">Supprimer</a></td>';
      tableContent += '</tr>';
    });
    // Inject the whole content string into our existing HTML table
    $('#debatsList table tbody').html(tableContent);
  });
};





// Show Debat Info

function showDebatInfo( event ) {

  // Prevent Link from Firing
  //event.preventDefault();

  // Retrieve question from link rel attribute
  var thisDebatQuestion = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = debatsListData.map(function(arrayItem) { return arrayItem.question; }).indexOf(thisDebatQuestion);
  // Get our Debat Object
  var thisDebatObject = debatsListData[arrayPosition];

  //Populate Info Box
  $('#debatInfoQuestion').text(thisDebatObject.question);
  $('#debatId').text(thisDebatObject._id);
  $('#contribsList table tbody').show();
  $('#contribsList table tbody').on('click', 'td a.linkdeletecontrib', deleteContrib);

  var tableContent = '';

  // jQuery AJAX call for JSON

  $.getJSON( '/debats/'+thisDebatObject._id+'/contribslist', function( data ) {

    contribsListData = data;

    if (contribsListData == null){
       $('#debatInfoContribs').text('Pas de contribution pour l\'instant !');

    }
    else{
          // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td>' + this.type + '</td>';
        tableContent += '<td><a href="#" class="linkshowcontrib" rel="' + this._id + '">' + this.tcourt + '</a></td>';
        tableContent += '<td>' + this.tlong + '</td>';
        tableContent += '<td>' + this.auteur + '</td>';
        tableContent += '<td>' + this.timestamp + '</td>';
        tableContent += '<td><a href="#" class="linkdeletecontrib" rel="' + this._id + '">Supprimer</a></td>';
        tableContent += '</tr>';
      });
      // Inject the whole content string into our existing HTML table
      $('#contribsList table tbody').html(tableContent);
    }

  });


  //thisDebatObject.reponses.forEach(function())
  //$('#debatInfoContribs').text(thisDebatObject.reponses.type+''+thisDebatObject.reponses.tcourt+'\n'+thisDebatObject.reponses.tlong+thisDebatObject.reponses.auteur+thisDebatObject.reponses.date);

  $('#formAddContrib').show();
  $('#inputContribQuestionId').val(thisDebatObject._id);

};

// Add Debat button click
  $('#btnAddDebat').on('click', addDebat);

// Add Debat
function addDebat(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#formAddDebat input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var newDebat = {
      'question': $('#formAddDebat form input#inputDebatQuestion').val()
    }

    // Use AJAX to post the object to our adddebat service
    $.ajax({
      type: 'POST',
      data: newDebat,
      url: '/adddebat',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#formAddDebat form input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};


// Delete Debat
function deleteDebat(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Souhaitez-vous supprimer ce débat de manière définitive ?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    //TODO : SUPPRIMER CONTRIBS ASSOCIEES

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/debats/deletedebat/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};



  $('#btnAddContrib').on('click', addContrib);

// Add Contrib
function addContrib(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#formAddContrib input').each(function(index, val) {

    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

  questionParentId = $('#inputContribQuestionId').val();
  contribParentId = null;


    // If it is, compile all contrib info into one object
    var newContrib = {
      "questionParent" :  questionParentId,
      "contribParent" : contribParentId,
        "type" : document.querySelector('input[name="contribType"]:checked').value,
        "tcourt" : $('#inputContribTexteCourt').val(),
        "tlong" : $('#inputContribTexteLong').val(),
        "auteur" : $('#inputContribAuteur').val()
        //"timestamp" : + new Date();
    }
    // Use AJAX to post the object to our addcontrib service
    $.ajax({
      type: 'POST',
      data: newContrib,
      url: '/debats/addcontrib',
      dataType: 'JSON'
    }).done(function( response ) {
        // Clear the form inputs
        $('#formAddContrib form input').val('');
        document.location.reload(true);

    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};



// Delete Contrib
function deleteContrib(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Souhaitez-vous supprimer cette contribution de manière définitive ?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/debats/deletecontrib/' + $(this).attr('rel')
    }).done(function( response ) {
      // Check for a successful (blank) response
      if (response.msg === '') {
        alert('Contribution supprimée !');
        document.location.reload(true);
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table


    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};
