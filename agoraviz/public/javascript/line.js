
var data=[
  { "date":"01-01-2019",
    "count":7
  },
  { "date":"02-02-2019",
    "count":5
  },
  { "date":"03-02-2019",
    "count":1
  },
  { "date":"10-02-2019",
    "count":6
  },
  { "date":"20-02-2019",
    "count":5
  },
  { "date":"21-02-2019",
    "count":3
  },
  { "date":"22-02-2019",
    "count":6
  },
]

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%m-%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var bisect = d3.bisector(function (data) {
    return data.date;
}).right;

createLine(stats);

function createLine(data){

// define the line
var valueline = d3.line()
    .x(function(d) { console.log("x", x(d.date)); return x(d.date); })
    .y(function(d) { console.log("y", y(d.count)); return y(d.count); })
    .curve(d3.curveMonotoneX)
   

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
$("#affTreeMap").append('<svg width="672" id="stat" height="372"></svg>')
var svg = d3.select("#stat")
  //  .attr("width", width + margin.left + margin.right)
  //  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.bottom + ")  scale(0.6,0.45)")


  // format the data
  data.forEach(function(d) {
//      d.date = parseTime(d.date);
      d.date = parseTime(d._id.day+"-"+d._id.month+"-"+d._id.year)
      d.count = +d.count;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.count; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("r", 4.5)
    .attr("class", "plot")
    .attr("cx", function(d) { console.log(d.date); return x(d.date); })
    .attr("cy", function(d) { console.log(d.count); return y(d.count); })
     .style("fill", "white")
     .style("stroke", "blue")
     .on("click", handleCircle)

     $(svg).css({
            'pointer-events' : 'auto'
        })

  
  
function handleCircle(d){
  var x= d.date;
  var y= d.count;
  var month = d.date.getMonth() <10 ? "0"+d.date.getMonth().toString() : d.date.getMonth().toString();
  var day = d.date.getDay() <10 ? "0"+d.date.getDay().toString() : d.date.getDay().toString();
  
  console.log( d.date.getMonth()<10, d.date.getFullYear()+"-"+month+"-"+day);
  $("#dateValue").val(d.date.getFullYear()+"-"+month+"-"+day)
  //$("#end").click();
}



}