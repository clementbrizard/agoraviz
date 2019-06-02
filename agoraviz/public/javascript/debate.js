$(document).ready(function() {
  console.log("hello boy");
  populateDebates();

});


function populateDebates() {

  let tableContent = '';

  $.getJSON('/api/debates', function (data) {
    let debatsListData = [];
    debatsListData = data;

    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" rel="' + this.question + '">' + this.question + '</a></td>';
      tableContent += '<td><a href="#" rel="' + this._id + '">Supprimer</a></td>';
      tableContent += '</tr>';
    });

    $('#debates table tbody').html(tableContent);
  });
}

