<script>
    //@ts-nocheck
    import * as d3 from 'd3';
    import {onMount} from 'svelte';


    export let fao_data = [];

    let necessaryUSAData = [];
    let necessarySalvadorData = [];
    let necessaryData = [];
    // let hist;

    let x;
    let y;
    let xAxis;
    let yAxis;
    let svg;
    let selectedYear = 2016;
    let sliderVisble = false;

    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

    onMount( () => {

        let filteredData = fao_data.filter( (item) => (item.Country == 'El Salvador' || item.Country == 'United States of America') && Number(item.Year) > 2015);
        // necessarySalvadorData = salvadorData.map( (obj) => {return {year:obj.Year, perecentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)']} });
        necessaryData = filteredData.map( (obj) => {return {year:obj.Year, percentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'], country: obj.Country}} );
        // let usaData = fao_data.filter( (item) => item.Country == 'United States of America' && Number(item.Year) > 2015);
        // necessaryUSAData = usaData.map( (obj) => {return {year:obj.Year, perecentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'], country: obj.Country } } );
        

        // append the svg object to the body of the page
        svg = d3.select("#my_dataviz")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

            // Initialize the X axis
            x = d3.scaleBand()
            .range([ 0, width ])
            .padding(0.2);
            xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`);
        
            // Initialize the Y axis
            y = d3.scaleLinear()
            .range([ height, 0]);
            yAxis = svg.append("g")
            .attr("class", "myYaxis");


            // Add slider input
            const slider = d3.select('#year-slider');
            slider.attr('min', 2016)
            .attr('max', 2021)
            .attr('step', 1)
            .attr('value', 2016)
            .attr('list', 'tickmarks')
            .on('input', () => {
                selectedYear = +slider.node().value; // Convert to number
                update(necessaryData, selectedYear);
            });

            const tickValues = d3.range(2016, 2022);

            const slider_container = d3.select('#slider_container');

            const slider_ticks = slider_container.append('svg')
            .attr('width', '80%')
            .attr('height','10' )
            .attr('id', 'slider-ticks')
            .selectAll('rect')
            .data(tickValues)
            .enter()
            .append('rect')
            .attr('class', 'range__tick')
            .attr('x', d => `${(d - 2016) / 5 * 100}%`)
            .attr('y', '3')
            .attr('width', '1')
            .attr('height', '10')

            const ticks_text = slider_container.append('svg')
            .attr('width', '80%')
            .attr('height','14' )
            .attr('id', 'ticks-text')
            .selectAll('text')
            .data(tickValues)
            .enter()
            .append('text')
            .attr('class', 'range__point')
            .attr('text-anchor', d => d === 2016 ? 'start' : d === 2021 ? 'end' : 'middle' )
            .attr('x', d => `${(d - 2016) / 5 * 100}%`)
            .attr('y', '14')
            .attr('font-size', 'medium')
            .text(d=>d);

            // slider.append('datalist')
            // .attr('id', 'tickmarks')
            // .selectAll('option')
            // .data(tickValues)
            // .enter()
            // .append('option')
            // .attr('value', d => d)
            // .attr('label', d=>d);
        // Add Y axis
        y.domain([0, d3.max(necessaryData, d => Number(d.percentFoodInsec)) + 5 ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));
        // update(necessaryData, 2016);

    });


    function dragStart(d) {
    d3.select( this )
        .raise()
        .style('stroke', 'black');

    }

    function dragging(d) {
        let new_y = d.y;
        // Calculate the new value of the rectangle based on the y position
        let value = y.invert(new_y);
        // Update the data and the y position of the rectangle
        d.value = value;
        d3.select(this)
        .attr("y", y(value))
        .attr("height", height - y(value));


    }

    function dragEnd(d) {
        let new_y = d.y;
        // Calculate the new value of the rectangle based on the y position
        let value = y.invert(new_y);
        // Update the data and the y position of the rectangle
        d.value = value;
        d3.select(this)
        .attr("y", y(value))
        .attr("height", height - y(value));
        sliderVisble = true;

    }

    function firstDisplay(data) {
        // console.log("See data before ", data);
        // Parse the Data
        // X axis
        x.domain(data.map(d => d.country));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        //filter by year
        const u = svg.selectAll("rect")
            .data(data.filter(obj => Number(obj.year) === 2016))

        // update bars
        u.join("rect")
            .attr("x", d => x(d.country))
            .attr("y", function(d) {return d.country === "El Salvador" ? y(10.5) : y(Number(d.percentFoodInsec))})
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return d.country === "El Salvador" ? height - y(10.5) : height - y(d.percentFoodInsec)})
            .attr('id', d => d.country + d.year)
            .attr("fill", function (d) { return d.country === "El Salvador" ? "#0047AB": "#69b3a2"})
            .filter(d => d.country === 'El Salvador') //makes only El Salvador bar draggable
             .call(d3.drag()
            .on("start", dragStart)
            .on("drag", dragging)
            .on("end", dragEnd)
            );
    }

    // A function that create / update the plot for a given variable:
    function update(data, selected_year) {
        console.log("called update");
        // Parse the Data
        // X axis
        x.domain(data.map(d => d.country));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        //filter by year

        data = data.filter((obj) => Number(obj.year) == selected_year);
        // variable u: map data to existing bars
        console.log("Data on update ", data);
        const u = svg.selectAll("rect")
            .data(data)

        // update bars
        u.join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x(d.country))
            .attr("y", d => y(Number(d.percentFoodInsec)))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.percentFoodInsec))
            .attr("fill", function (d) { return d.country === "El Salvador" ? "#0047AB": "#69b3a2"})
            
    }


    $: {

        if (necessaryData.length > 0){
            firstDisplay(necessaryData);
            // update(necessaryData, 2016);
        }


    }



</script>

<main>

    <!-- <button on:click="{() => {sliderVisble = !sliderVisble}}">View Slider</button> -->
    <h2>Prevalence of moderate or severe food insecurity in the total population (percent)</h2>
    <h3>The % of the population in the U.S. that reported moderate to severe food insecurity in 2016 was 10.5</h3>
    <p id="guessInstruction">Drag the bar on the left to what you think the metric is for El Salvador</p> 
    <!-- Create a div where the graph will take place -->
    <div id="my_dataviz"></div>


    <div id="slider_container" style="visibility: {sliderVisble ? "visible" : "hidden"};">
    <input style="width: 80%;" id="year-slider" type="range" bind:value={selectedYear} />

    </div>




</main>


<style>
    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 24px;
        color: var(--color-text);
        margin-top: 100px;
    }

    #tick-container {
        position: relative;
        height: 2em;
    }

    .tick-labels {
        position: relative;
        height: 2em;
    }
    .tick-label {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 20%;
        transform: translateX(-50%);
    }

    .tick {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 20%;
        transform: translateX(-50%);
     }

     .range__tick {
        fill: #000000;
    }
   
   

</style>