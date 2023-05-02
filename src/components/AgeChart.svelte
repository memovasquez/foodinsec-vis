<script>
// @ts-nocheck

    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    export let data = [];
    
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    let svg;
    let xScale, yScale, xAxis, yAxis;

    function display () {
        data = data.filter(d => d.rsp_age != ""); //make sure to discard any nulls
        let ageMin = d3.min(data.map(d => Number(d.rsp_age)));
        let ageMax = d3.max(data.map(d => Number(d.rsp_age)));
    
        xScale = d3.scaleLinear()
        .domain([10,ageMax])
        .range([0,width])

        let binSize = 10;

        const histogram = d3.histogram()
        .value(function(d) {return Number(d.rsp_age)})
        .domain(xScale.domain())
        .thresholds(d3.range(10, 100, binSize))
        

        const bins = histogram(data);

        var xAxis = d3.axisBottom(xScale)
            .tickValues(bins.map(function(d) { return d.x0; }))
            .tickFormat(function(d, i) { 
                    return d + '+'; // Add a plus sign to the first tick label
                }
            );

        yScale = d3.scaleLinear()
        .range([height,0]);
        yScale.domain([0,d3.max(bins, function(d) {return d.length})]);

        svg = d3.select("#ageChart")
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`)

        svg.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
        // d3.axisBottom(xScale)

        svg.append("text")
                .attr("class", "axis-label")
                .attr("text-anchor", "middle") // set the alignment of the text
                .attr("font-size", "12px") // set the font size
                .attr("fill", "black") // set the font color
                .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")") // position the label at the bottom center of the axis
                .text("Respondent Age"); // set the label text

        svg.append('g')
        .attr('class', 'axis y-axis')

        svg.append("text")
                .attr("class", "axis-label")
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("transform", "rotate(-90) translate(" + (-height/2) + "," + (0) + ")") // position the label at the left center of the axis and rotate it by -90 degrees

        // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
            // Its opacity is set to 0: we don't see it by default.
            const tooltip = d3.select("#ageChart")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip-visible")
                .style("background-color", "black")
                .style("color", "white")
                .style("border-radius", "5px")
                .style("padding", "10px")


            const showTooltip = function(event,d) {
                d3.select(event.target).attr('fill', 'light-orange');
                tooltip
                .transition()
                .duration(100)
                .style("opacity", 1)
                tooltip
                .html(String(d.length) + " respondents in El Salvador are age "+ String(d.x0) +" to "+ String(d.x1) )
                .style("left", (event.x)/2-100 + "px")
                .style("top", (event.y)/2 + "px")
            }


            const moveTooltip = function(event,d) {
                tooltip
                .style("left", (event.x)/2-100 + "px")
                .style("top", (event.y)/2 + "px")
            }

            // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
            const hideTooltip = function(event,d) {
                tooltip
                .transition()
                .duration(100)
                .style("opacity", 0)

            }


        svg.selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", 1)   //"translate(" + x(d.x0) + "," + y(d.length) + ")"
        .attr("transform", function(d) { return `translate(${xScale(d.x0) - (xScale(d.x1) - xScale(d.x0))/4 } , ${yScale(d.length)})`})
            .attr("width", function(d) { return (xScale(d.x1) - xScale(d.x0))/2 -1})
            .attr("height", function(d) { return height - yScale(d.length); })
            .style("fill", function(d) { return bins.indexOf(d) === 4 ? "red" : bins.indexOf(d) === 5 ? "blue" : "black" })

            //  Show tooltip on hover
             .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip )

    }


    $: {
        if (data.length > 0){
            display();
        }
    }

</script>

<main>
    <div id="ageChart"></div>
       
</main>
    
    
<style>

</style>