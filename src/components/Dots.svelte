<script>
    //@ts-nocheck
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    // import * as science from 'science';

    //import { draw } from 'svelte/types/runtime/transition';
    //input data 
    let numDots = {};
    let histData = {};
    let dots;
    let hist;
    let dotState = 'all';
    let histState = 'income';
    var bins = [];
    let person1 = [];
    let person2 = {
        "avg_income_amount": 1000,
        "debt_amount": 300,
    }; //TODO import person2 data
    // TODO handle if person2 line is off the charts
    let isPressed = false;

    let yesColor = "#69b3a2";
    let noColor = "#a83e32";
    let person1Color ="#c32ef0";
    let person2Color =  "#f0dc2e";
    let person1Loc = 0;
    let person2Loc = 1;

    let nameToField = {
        "income": "avg_income_amount",
        "debt": "debt_amount",
    };


    let labels; 

    const margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 1000 - margin.left - margin.right;
    
    let centerWidth = 400;
    let sidePlotWidth = (width - centerWidth) / 2


    var numColumns = 60;
    var dotCoords = [];
    var size = centerWidth / numColumns - 4;
    let numRows;
    let height; 
    

    var histWidth = 600
    var histHeight = 200

    var dotMarkers;
    let radius = 2;

    let path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
    let data;


    onMount( () => {
    //function processData () {
        console.log(path)
        d3.csv(path).then((d) => {
        data = d;
        person1 = data[2211];
        data = data.filter(obj => obj.country == 'SLV') 
        let missedMeals = data.map(obj => (Number(obj.rcsi_meal_nb) > 0))//.filter( number => number > 0);
        let borrowedFood = data.map(obj => (Number(obj.rcsi_borrow) > 0))

        let incomeCurrency = data.map(obj => Number(obj.avg_income_currency))
        let income = data.map(obj => Number(obj.avg_income_amount))
            .filter((number, i) => ((number < 1000) && (incomeCurrency[i] == 1)));

        let incomePerCapita = data.map(obj => Number(obj.income_per_capita))
            .filter((number, i) => ((number < 500) && (incomeCurrency[i] == 1)));

        let debtCurrency = data.map(obj => Number(obj.debt_currency))
        let debt = data.map(obj => Number(obj.debt_amount))
            .filter((number, i) => ((number < 1000) && (number > 0)  && (debtCurrency[i] == 1)));

        let remittanceCurrency = data.map(obj => Number(obj.rem_currency))
        let remittance = data.map(obj => Number(obj.remesa_amount))
            .filter((number, i) => ((number < 1000) && (number > 0)  && (remittanceCurrency[i] == 1)));

        let div = 1
        numDots = {
            'all': Number(Math.round(data.length / div)), 
            'missedMeals': Number(Math.round(missedMeals.filter(n => (n > 0) && (n != 88)).length / div)),
            'borrowedFood': Number(Math.round(borrowedFood.filter(n => (n > 0) && (n != 88)).length / div))
        };
        histData = {
            'income': {
                'all': income, 
                'missedMeals': [income.filter((n, i) => missedMeals[i]), income.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [income.filter((n, i) => borrowedFood[i]), income.filter((n, i) => ! borrowedFood[i])]
            },
            'incomePerCapita': {
                'all': incomePerCapita, 
                'missedMeals': [incomePerCapita.filter((n, i) => missedMeals[i]), incomePerCapita.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [incomePerCapita.filter((n, i) => borrowedFood[i]), incomePerCapita.filter((n, i) => ! borrowedFood[i])]
            },
            'debt': {
                'all': debt, 
                'missedMeals': [debt.filter((n, i) => missedMeals[i]), debt.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [debt.filter((n, i) => borrowedFood[i]), debt.filter((n, i) => ! borrowedFood[i])]
            },
            'remittance': {
                'all': remittance, 
                'missedMeals': [remittance.filter((n, i) => missedMeals[i]), remittance.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [remittance.filter((n, i) => borrowedFood[i]), remittance.filter((n, i) => ! borrowedFood[i])]
            }  
        }


    })

	});


    function getLabels () {
        let total = numDots['all'];
        labels = [
            {
                "name": "all",
                "text": total.toString() + " total responses",
                "x": width / 2,
                "y": 10,
                "visibility": "visible"
            },
            {
                "name": "missedMeals",
                "text": numDots['missedMeals'].toString() + " missed at least one meal this week",
                "x": 250,
                "y": 10,
                "visibility": "hidden"
            },
            {
                "name": "missedMeals",
                "text": (total - numDots['missedMeals']).toString() + " missed no meals this week",
                "x": 750,
                "y": 10,
                "visibility": "hidden",
            },
            {
                "name": "borrowedFood",
                "text": numDots['borrowedFood'].toString() + " borrowed money for food this week",
                "x": 250,
                "y": 10,
                "visibility": "hidden",
            },
            {
                "name": "borrowedFood",
                "text": (total - numDots['borrowedFood']).toString() + " did not",
                "x": 750,
                "y": 10,
                "visibility": "hidden",
            },
        ]
    }
    
    
    function updateDotCoords (fieldName) {
         //- margin.top - margin.bottom;

        let nextDotCoords = []
        let offset = 0
        let verticalOffset = 20;
        if (fieldName == 'all') {
            for (let i =0; i < numRows; i++) {
                for (let j=0; j < numColumns; j ++) {

                    if (i * numColumns + j < numDots['all']) {
                        let minX = (width / 2) - (centerWidth / 2)
                        let maxX = (width / 2) + (centerWidth / 2)

                        let color = yesColor;
                        nextDotCoords.push({"x": getDotX(j, minX, maxX), 
                                    "y": getDotY(i) + verticalOffset,
                                    "c": color});
                    }
                }
            }
        } else {
            let numLeftRows = 0;
            let firstRightCol = 0;
            for (let i=0; i < numRows; i++) {
                for (let j=0; j < numColumns; j ++) {

                    if (i * numColumns + j < numDots['all']) {
                        if (i * numColumns + j < numDots[fieldName]) {
                            numLeftRows = i;
                            firstRightCol = j

                            let color = yesColor
                            nextDotCoords.push({"x": getDotX(j, 0, centerWidth), "y": getDotY(i) + verticalOffset, "c": color});  
                        } else {
                            let x = j - firstRightCol - 1
                            let y = i - numLeftRows
                            if (x < 0) {
                                y--;
                                x = numColumns + x;
                            }

                            let color =  noColor;
                            nextDotCoords.push({"x": getDotX(x, width - centerWidth, width), 
                                        "y": getDotY(y) + verticalOffset,
                                        "c": color});
                        }                     
                    }
                }
            }
        }
        dotCoords = nextDotCoords.sort((a, b) => 0.5 - Math.random());
        let idx1 = 0;
        let idx2 = 1;
        if (fieldName != 'all') {
            let person1Found = false;
            let person2Found = false;
            for (let i=1; i <= dotCoords.length; i++) {
                if (! person1Found) {
                    if (dotCoords[dotCoords.length - i]["c"] == yesColor) {
                        idx1 = dotCoords.length - i
                        person1Found = true;
                    }
                } 
                if (! person2Found)  {
                    if (dotCoords[dotCoords.length - i]["c"] == noColor) {
                        idx2 = dotCoords.length - i
                        person2Found = true;
                    }
                }
            }
        }

        dotCoords[idx1]["c"] = person1Color;
        dotCoords[idx2]["c"] = person2Color;

        arrayReplace(dotCoords, idx1, 0);
        arrayReplace(dotCoords, idx2, 1);
    
        
    }
    
    function arrayReplace(arr, fromIndex, toIndex) {
        var element1 = arr[fromIndex];
        var element2 = arr[toIndex];
        arr[fromIndex] = element2;
        arr[toIndex] = element1;  
    }

    function getDotX(x, minX, maxX) {
        const scale = d3.scaleLinear()
            .domain([0, numColumns])
            .range([minX, maxX])
        return scale(x)
    }

    function getDotY(y) {
        const scale = d3.scaleLinear()
            .domain([0, numRows])
            .range([0, height])
        return scale(y)
    }

    var moveDots = function (name) {
        // return function () {
            updateDotCoords(name);
            d3.select("#dots").select("svg").select("g").selectAll("circle")
        .data(dotCoords)
        .join("circle")
        .attr("r", radius)
        .attr("fill-opacity", 1)
        .transition()
                .duration(1000)
                .attr("cx", function (d) {
                    return d["x"]
                })
                .attr("cy", function (d) {
                    return d["y"]
                })
                .style("fill", function (d) {
                    return d["c"]
                })
                .attr("stroke", function (d) {
                    return d["c"]
                })
        hideLabels();
        showLabel(name);
        
        // }
    }

    function splitHistogram (name, split) {
        let data = histData[name][split];
        let leftData = data[0];
        let rightData = data[1];

        const x = d3.scaleLinear()
            .domain([0, d3.max(histData[name]['all'])*1.25])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
            .range([0, histWidth]);

        const histogram = d3.histogram()
            .value(function(d) { return d; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(20)); // then the numbers of bins; 6 here because we remove 0

        const allBins = histogram(histData[name]['all']);
        
        let leftBins = histogram(leftData);
        let rightBins = histogram(rightData);

        if (split == 'all') {
            leftBins = allBins;
            rightBins = histogram([]);
        }

        const leftTotal = leftBins.reduce((acc, cur) => acc + cur.length, 0);
        const rightTotal = (split == 'all') ? 1 : rightBins.reduce((acc, cur) => acc + cur.length, 0);
        const leftMax = d3.max(leftBins, function(d) {return d.length }) / leftTotal;
        const rightMax = (split == 'all') ? 0 : d3.max(rightBins, function(d) {return d.length }) / rightTotal;


        const y = d3.scaleLinear()
            .range([histHeight, 0])
            .domain([0, d3.max([leftMax, rightMax])]);//d3.max(allBins, function(d) {return d.length })]);  
        
        // TODO redo x axis ticks


        bins = []
        for (let i = 0; i < leftBins.length; i++) {
            
            // switched order? TODO
            bins.push(rightBins[i]);
            bins.push(leftBins[i]);
        }
  
        function kde(kernel, thresholds, data) {
            return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
        }
        function epanechnikov(bandwidth) {
            return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }
        

        
        let thresholds = x.ticks(200)
        let bandwidth = 300;


        if (split == 'all') {
            leftData = data;
        }

        let leftDensity = kde(epanechnikov(bandwidth), thresholds, leftData)

        let rightDensity
        if (split == 'all') {
            rightDensity = leftDensity.map(d => [d[0], 0]);
        } else {
            rightDensity = kde(epanechnikov(bandwidth), thresholds, rightData)

        }

        let newY = d3.scaleLinear()
            .range([histHeight, 0.0001])
            .domain([0, d3.max(
                [d3.max(leftDensity, function(d) {return d[1]}),
                d3.max(rightDensity, function(d) {return d[1]})])
             * 1.2]);
        let line = d3.line()
            .curve(d3.curveBasis)
            .x(d => x(d[0]))
            .y(d => newY(d[1]))

        // let rightDensity = []
        // for (let i = 0; i < leftDensity.length; i++) {
        //     rightDensity.push([leftDensity[i][0], 0])
        // }
        //let rightDensity = kde(epanechnikov(bandwidth), thresholds, rightData);

        d3.select('#leftCurve')
            .datum(leftDensity)
            .attr('id', 'leftCurve')
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("stroke", yesColor)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line);

        d3.select("#rightCurve")
            .datum(rightDensity)
            .attr('id', 'rightCurve')
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("stroke", noColor)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line);

        var area = d3.area()
            .x(function(d) { return x(d[0]); })
            .y0(y(0))
            .y1(function(d) { return newY(d[1]); });

        d3.select("#leftArea")
            .datum(leftDensity)
            .attr('id', 'leftArea')
            .attr("class", "area")
            .transition()
            .duration(1000)
            .style("fill", yesColor)
            .style("opacity", 0.5)
            .attr("d", area);
        d3.select("#rightArea")
            .datum(rightDensity)
            .attr('id', 'rightArea')
            .attr("class", "area")
            .transition()
            .duration(1000)
            .style("fill", noColor)
            .style("opacity", 0.5)
            .attr("d", area);

    
        d3.select("#person1Line")
            .style("stroke", person1Color)
            .style("stroke-width", 1.5)
            .transition()
            .duration(1000)
            .attr("x1", x(person1[nameToField[name]]))
            .attr("y1", y(0))
            .attr("x2", x(person1[nameToField[name]]))
            .attr("y2", y(1));

        d3.select("#person2Line")
            .style("stroke", person2Color)
            .style("stroke-width", 1.5)
            .transition()
            .duration(1000)
            .attr("x1", x(person2[nameToField[name]]))
            .attr("y1", y(0))
            .attr("x2", x(person2[nameToField[name]]))
            .attr("y2", y(1));
    }

    var updatePlots = function (name, histName, buttonName) {
        return function () { 


            if (dotState !== name) {
                moveDots(name);
                splitHistogram(histName, name);
            }
            else if (histState !== histName){
                splitHistogram(histName, name);
            }
            dotState = name;
            histState = histName;
        }
    }


    $: {
        if ((Object.keys(numDots).length > 0) && (Object.keys(histData).length > 0)){
            numRows = Math.ceil(numDots['all'] / numColumns);
            height = numRows * (size + 3);
            getLabels();
            updateDotCoords('all');
            draw()
        }
    }


    function addLabels () {
        d3.select("#dots").select("svg").select("g").selectAll("text")
                .data(labels)
                .enter()
                .append("text")
                .text(function (d) {return d["text"]})
                .attr("class", function (d) { return d["name"] + "Text"})
                .attr("x", function (d) { return d["x"]})
                .attr("y", function (d) { return d["y"]})
                .attr("text-anchor", "middle")
                .attr("visibility", function (d) {return d["visibility"]});
    }

    function hideLabels () {
        d3.select("#dots").select("svg").select("g").selectAll("text")
            .attr("visibility", "hidden")
    }

    function showLabel (name) {
        d3.select("#dots").select("svg").select("g").selectAll("." + name + "Text")
            .attr("visibility", "visible")
    }

    //onMount( () => {
    function draw() {
        d3.select(dots).html(null);

        const svg = d3.select("#dots")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "dotArray")
            .append("g")
            .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);

    d3.select("#dots").select("svg").select("g").selectAll("circle")
        .data(dotCoords)
        .enter()
        .append("circle")
        .attr("r", radius)
        .style("fill", function (d) {
            return d["c"];
        })
        .attr("stroke", function (d) {
            return d["c"];
        })
        .attr("fill-opacity", 1)
        .attr("cx", function (d) {
            return d["x"];
        })
        .attr("cy", function (d) {
            return d["y"];
        })

        addLabels();
        
    //     svg.append("text")
	// .text("This is text")
	// .attr("x", 20)
	// .attr("y", 20);


        // build histogram

    d3.select(hist).html(null);
    const svgHist = d3.select("#hist")
        .append('svg')
            .attr("width", histWidth + margin.left + margin.right)
            .attr("height", histHeight + margin.top + margin.bottom)
            .attr("id", "histogram")
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
            .domain([0, d3.max(histData['income']['all']) * 1.25])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
            .range([0, histWidth]); //width of histogram

    // TODO fix 
    svgHist.append("g")
        .attr("transform", `translate(0, ${histHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    const histogram = d3.histogram()
        .value(function(d) { return d; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins; 6 here because we remove 0

    const leftBins = histogram(histData['income']['all']);
    const leftTotal = leftBins.reduce((acc, cur) => acc + cur.length, 0);
    const rightBins = histogram([]);
    const rightTotal = rightBins.reduce((acc, cur) => acc + cur.length, 0)

    

    bins = []
    for (let i = 0; i < leftBins.length; i++) {
        // switched order? TODO
        bins.push(rightBins[i]);
        bins.push(leftBins[i]);
        
    }


    const y = d3.scaleLinear()
        .range([histHeight, 0.0001])
        .domain([0, d3.max(bins, function(d) {return d.length}) / leftTotal]);   // d3.hist has to be called before the Y axis obviously
            
    let barWidth = (x(bins[0].x1) - x(bins[0].x0)) / 2 - 1


    function kde(kernel, thresholds, data) {
        return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
    }
    function epanechnikov(bandwidth) {
        return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
    }
    
    
    let thresholds = x.ticks(200)
    let bandwidth = 150;
    let leftDensity = kde(epanechnikov(bandwidth), thresholds, histData['income']['all'])

    let newY = d3.scaleLinear()
        .range([histHeight, 0.0001])
        .domain([0, d3.max(leftDensity, function(d) {return d[1]})]);

    svgHist.append("g")
        .call(d3.axisLeft(newY).tickFormat(""));

    //d3.axis().tickFormat("")
    
    let line = d3.line()
        .curve(d3.curveBasis)
        .x(d => x(d[0]))
        .y(d => newY(d[1]))


    let rightDensity = []
    for (let i = 0; i < leftDensity.length; i++) {
        rightDensity.push([leftDensity[i][0], 0])
    }
    //let rightDensity = kde(epanechnikov(bandwidth), thresholds, rightData);

    svgHist.append("path")
      .datum(leftDensity)
      .attr('id', 'leftCurve')
      .attr("fill", "none")
      .attr("stroke", yesColor)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", line);

    svgHist.append("path")
      .datum(rightDensity)
      .attr("fill", "none")
      .attr('id', 'rightCurve')
      .attr("stroke", noColor)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", line);

    var area = d3.area()
        .x(function(d) { return x(d[0]); })
        .y0(y(0))
        .y1(function(d) { return newY(d[1]); });

    svgHist.append("path")
        .datum(leftDensity)
        .attr('id', 'leftArea')
        .attr("class", "area")
        .style("fill", yesColor)
        .style("opacity", 0.5)
        .attr("d", area);
    svgHist.append("path")
        .datum(rightDensity)
        .attr('id', 'rightArea')
        .attr("class", "area")
        .style("fill", noColor)
        .style("opacity", 0.5)
        .attr("d", area);

    svgHist.append("line")
        .attr("id", "person1Line")
        .style("stroke", person1Color)
        .style("stroke-width", 1.5)
        .attr("x1", x(person1["avg_income_amount"]))
        .attr("y1", y(0))
        .attr("x2", x(person1["avg_income_amount"]))
        .attr("y2", y(1));
    
    svgHist.append("line")
        .attr("id", "person2Line")
        .style("stroke", person2Color)
        .style("stroke-width", 1.5)
        .attr("x1", x(person2["avg_income_amount"]))
        .attr("y1", y(0))
        .attr("x2", x(person2["avg_income_amount"]))
        .attr("y2", y(1));

    }

</script>
<div>
    <span style="display:block; height: 25px;"></span>
    Food and Financial Security
    <span style="display:block; height: 25px;"></span>
</div>


<button class="button dotButton {dotState === 'all' ? 'pressed' : ''}" id="allButton" on:click="{updatePlots('all', histState, 'allButton')}">All</button>
<button class="button dotButton {dotState === 'missedMeals' ? 'pressed' : ''}" id="mealsButton" on:click="{updatePlots('missedMeals', histState, 'mealsButton')}">Missed meals</button>
<button class="button dotButton {dotState === 'borrowedFood' ? 'pressed' : ''}" id="borrowedButton" on:click="{updatePlots('borrowedFood', histState, 'borrowButton')}">Borrowed Money for Food</button>


<div id="dots" align="center" style="display:block; margin:auto" bind:this={dots} class="visualization"></div>

<button class="button histButton {histState === 'income' ? 'pressed' : ''}" id="incomeButton" on:click="{updatePlots(dotState, 'income', 'incomeButton')}">Monthly Income</button>
<!-- <button class="button histButton {histState === 'incomePerCapita' ? 'pressed' : ''}" id="incomePerCapitaButton" on:click="{updatePlots(dotState, 'incomePerCapita', 'incomePerCapitaButton')}">Income per capita</button> -->
<button class="button histButton {histState === 'debt' ? 'pressed' : ''}" id="debtButton" on:click="{updatePlots(dotState, 'debt', 'debtButton')}">Debt</button>
<!-- <button class="button histButton {histState === 'remittance' ? 'pressed' : ''}" id="remittanceButton" on:click="{updatePlots(dotState, 'remittance', 'remittanceButton')}">Remittances</button> -->


<div id="hist" bind:this={dots} class="visualization"></div>

<style>
    .button {
  border: noColor;
  /* color: '#00'; */
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.pressed {
    background-color: #69b3a2;
}


</style>
