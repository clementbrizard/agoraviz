

	function addCircleDraggable(){

		var offset, x, y;
		$("#newNode").remove();

       d3.select("g").append("circle")
      	  .attr("r", 4.5)
	      .style('fill', function() { return color($('#type').val());})
	      .attr("class", "draggable")
	      .attr("id", "newNode")
	      .attr("cx", 700)
	      .attr("cy", 400)
   		  .attr("transform", function() { return "translate(-200 -200)"; })
   		  .call(d3.drag()
       	 .on("start", dragstarted)
       	 .on("drag", dragged)
       	 .on("end", dragended)
       	 );


		function dragstarted(d) {

        x=+d3.event.x;
        y=+d3.event.y;

		  d3.select(this).raise().classed("active", true);
		  offset=d3.event;
			offset.x -= parseFloat(d3.select(this).attr("cx"));
        	offset.y -= parseFloat(d3.select(this).attr("cx"));
		}

		function dragged(d) {

		   console.log("start");

			d3.select(this).attr("cx", d3.event.x - offset.x);
			d3.select(this).attr("cy", d3.event.y - offset.y);

			$(this).css({
            'pointer-events' : 'none'
        })


		}

		function dragended(d) {
		  console.log("ended");
		  d3.select(this).classed("active", false);
		  $(this).css({
            'pointer-events' : 'auto'
        })
		}

		/*
		d3.selectAll(".node").on("mouseover", handle)

	function handle(d){
		console.log("you", d);
		selected=d;
		$("#addNode").click();
	}
	*/



	}




