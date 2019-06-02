$(document).ready(function() {

  populateDebates();

}


function populateDebates() {

  let tableContent = '';

  $.getJSON( '/api/debates', data => {

    debatsListData = data;

    $.each(data, () => {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" rel="' + this.question + '">' + this.question + '</a></td>';
      tableContent += '<td><a href="#" rel="' + this._id + '">Supprimer</a></td>';
      tableContent += '</tr>';
    });

    $('#debates table tbody').html(tableContent);
  });
};

