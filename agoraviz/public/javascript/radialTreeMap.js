var data = contributions;
const debateJSON = debate;


/* === Création du graphe === */

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g")
      .attr("transform", "translate(" + (width / 2 + 40) + "," + (height /3) + ")");


var stratify = d3.stratify()
    .id(function(d) { return d._id; })
    .parentId(function(d) { return d.parent; })


var tree = d3.tree()
    .size([360, 500])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var root = tree(stratify(data));

// Arcs

var link = g.selectAll(".link")
  .data(root.descendants().slice(1))
  .enter().append("path")
      .attr("class", "link")
      .style("stroke", "#8da0cb")
      .attr("d", function(d) {
        return "M" + project(d.x, d.y)
            + "C" + project(d.x, (d.y + d.parent.y)  /2)
            + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, d.parent.y);
      });


// Noeuds

var node = g.selectAll(".node")
  .data(root.descendants())
  .enter().append("g")
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })

node.append("circle")
      .attr("r", 4.5)
      .on('click', click)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);



// Labels

node.append("text")
    .attr("dy", ".31em")
    .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
    .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
    .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
    .text(function(d) { return d.data.name.substring(d.data.name.lastIndexOf(".") + 1); });

// Tooltips

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


/* === Ajout d'un noeud === */

var selected=null;
$("#addNode").click(function() {

  const newDebate = {
    debate: debateJSON._id,
    parent: selected.data._id,
    name: $("#label").val(),
    value: $("#comment").val(),
  };

  $.ajax({
    type: 'POST',
    data: newDebate,
    url: '/contributions/',
    dataType: 'JSON'
  });
});



function project(x, y) {
  var angle = (x - 90) / 180 * Math.PI, radius = y/2;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

function click(d) {
    selected = d;
    document.getElementById('addNode').disabled = false;
    d3.select(this).attr("r", function(d) {  return this.r.baseVal.value*2 })
      .style('fill', function(d) {return "orange"});
  }

function handleMouseOver(d) {
   div.transition()
                .duration(200)
                .style("opacity", .9);

   div .html("<br/>"  + d.data.value)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
}

function handleMouseOut(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
}

function update(source) {

  var duration=700,
  temp=d3.selectAll("path.link"),
  treeData = tree(root);

  var nodes = treeData.descendants(),
  links = treeData.descendants().slice(1);

  var link = g.selectAll('newLink')
      .data(links, function(d) {
        return d.id;
      });

  /* ====  Màj des arcs ===== */

  // Calcul des coordonnées :
  var linkEnter = link.enter().
    append('path').
    attr("class", "link").
    attr("stroke-width", 2).
    style("stroke", "#8da0cb").
    attr("d", function(d, i) {
          return "M" + project(d.x, d.y)
              + "C" + project(d.x, (d.y + d.parent.y) / 2)
              + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
              + " " + project(d.parent.x, d.parent.y);
        });

    // Suppression des anciens arcs :
    temp.attr("fill-opacity", 1)
            .attr("stroke-opacity", 1)
            .transition()
                .duration(700)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .remove();


  /* ====  Màj des noeuds ===== */

  var node = g.selectAll('.node')
    .data(nodes, function(d) {
      return d.id || d.name;
    });


  var nodeEnter = node.enter().
    append('g')
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })


  nodeEnter.append('circle')
    .attr("r", 4.5)
    .on('click', click)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  var nodeUpdate = nodeEnter.merge(node);
  nodeUpdate.transition().
    duration(duration)
    .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })

  nodeUpdate.select('circle.node')
    .attr("r", 4.5)
    .attr('cursor', 'pointer');

  // Suppression des anciens noeuds :
  var nodeExit = node.exit()
  .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .transition()
            .duration(500)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .remove();
  nodeExit.select('circle').attr('r', 0);
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

}


