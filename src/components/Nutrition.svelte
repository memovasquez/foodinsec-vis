<script>
	//@ts-nocheck
    import * as d3 from 'd3';
	import {onMount} from 'svelte';
    //input data 
	let path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
	let person1 = {};
	let data;

	//TODO use real data
    // let nutritionServings = {'Grains': 11, 'Vegetables': 5, 'Fruit': 3, 'Dairy': 3, 'Protein': 7, 'Fats and Sweets': 1};
	// let individualServings = {'Grains': 5, 'Vegetables': 3, 'Fruit': 1, 'Dairy': 2, 'Protein': 2, 'Fats and Sweets': 1}
	
	// number of servings recommended by US gov food pyramid
	let nutritionServings = {'Grains': 11, 'Vegetables': 5, 'Fruit': 3, 'Dairy': 3, 'Protein': 7, 'Fats and Sweets': 1};

	//
	let individualServings;


	onMount( () => {
        d3.csv(path).then((d) => {
        data = d;
        person1 = data[2211];
        data = data.filter(obj => obj.country == 'SLV') 

		console.log(person1['fcs_fruit']);
		individualServings = {
			'Grains': Math.round(Number(person1['fcs_staples']) / 7 * nutritionServings['Grains'] * 100) / 100, 
			'Vegetables': Math.round(Number(person1['fcs_veg']) / 7 * nutritionServings['Vegetables'] * 100) / 100,
			'Fruit': Math.round(Number(person1['fcs_fruits']) / 7 * nutritionServings['Fruit'] * 100) / 100, 
			'Dairy': Math.round(Number(person1['fcs_dairy']) / 7 * nutritionServings['Dairy'] * 100) / 100,
			'Protein': Math.round(Number(person1['fcs_proteins']) / 7 * nutritionServings['Protein'] * 100) / 100,
			'Fats and Sweets': Math.round((Number(person1['fcs_fats']) + Number(person1['fcs_sugars'])) / 7 * nutritionServings['Fats and Sweets'] * 100) / 100,
		};

        })

    })

	let fullRadius = 200
    
    
    let fullArcGenerator = d3.arc()
        .innerRadius(2)
		.outerRadius(fullRadius)
		.padAngle(.02)
		.cornerRadius(2);

	function getArcGenerator(fraction) {
		let radius = Math.sqrt((fullRadius ** 2) * fraction);
		return d3.arc()
        .innerRadius(2)
		.outerRadius(radius)
		.padAngle(.02)
		.cornerRadius(2);
	}

	let fullArcData = [];
	let individualArcData = [];

    // // color mapping function
	// const arcColorDefault = d3.scaleLinear()
	// 	.range(["#bd6202", "#158504", "#e02504", "#02c8de", "#f5830a", "#f5c60a"])
	// 	// .domain([0,3,6,9,12,15,18,21,24]);

	let colors = ["#bd6202", "#158504", "#e02504", "#02c8de", "#f5830a", "#f5c60a"]
	let lightColors = ["#fed3a7", "#a7fc9a", "#febdb1", "#b0f6fe", "#fcdcba", "#fcefba"]
	
    function colorFunction (idx) {	
		return colors[idx];
	}
	//arcColorDefault;
	
    

	// state trackers
	let hovered = -1; // index of the hovered arc, -1 when nothing is hovered
	let recorded_mouse_position = { x: 0, y: 0 };

    $: {


		if (Object.keys(person1).length > 0) {
        	const arcColor = d3.scaleOrdinal(d3.schemeAccent).domain(Object.keys(nutritionServings));
		
        	let pie = d3.pie().value( (d) => d[1] );
        	fullArcData = pie(Object.entries(nutritionServings)); 
			individualArcData = pie(Object.entries(individualServings));
			console.log(fullArcData);
		}

    }

  
function shadeColor(color, percent) {
	// taken from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

	var R = parseInt(color.substring(1,3),16);
	var G = parseInt(color.substring(3,5),16);
	var B = parseInt(color.substring(5,7),16);

	R = parseInt(R * (100 + percent) / 100);
	G = parseInt(G * (100 + percent) / 100);
	B = parseInt(B * (100 + percent) / 100);

	R = (R<255)?R:255;  
	G = (G<255)?G:255;  
	B = (B<255)?B:255;  

	R = Math.round(R)
	G = Math.round(G)
	B = Math.round(B)

	var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
	var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
	var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

	return "#"+RR+GG+BB;
}



//console.log('color', colorFunction(0));
</script>

<div class="visualization">
	<div>
		<span style="display:block; height: 25px;"></span>
		Nutrition and Diet Breakdown
		<span style="display:block; height: 25px;"></span>
	</div>
    <svg width="1000" height="1000">
        <g transform="translate(500,400)">
            {#each fullArcData as data, index}
			<path 
				d={fullArcGenerator({
					startAngle: data.startAngle,
					endAngle: data.endAngle
				})}
				fill={index === hovered ? shadeColor("#037ffc", 40): lightColors[index]}
                
                on:mouseover={(event) => {
                     hovered = index;
                     recorded_mouse_position = {
							x: event.pageX,
							y: event.pageY
						};
                }}
				on:mouseout={(event) => { hovered = -1; }}

			/>

			<path 
				d={getArcGenerator(individualArcData[index].value / data.value)({
					startAngle: data.startAngle,
					endAngle: data.endAngle
				})}
				fill={index === hovered ? "#037ffc": colors[index]}
                
                on:mouseover={(event) => {
                     hovered = index;
                     recorded_mouse_position = {
							x: event.pageX,
							y: event.pageY
						};
                }}
				on:mouseout={(event) => { hovered = -1; }}

			/>
			{/each}

        </g>
    </svg>
    <div
		class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}	
        style="left: {recorded_mouse_position.x + 40}px; top: {recorded_mouse_position.y + 40}px"
	>
		{#if hovered !== -1}
		    INDIVIDUAL ate {individualArcData[hovered].data[1]} servings per day of {individualArcData[hovered].data[0].toLowerCase()} this week. The US government recommends {fullArcData[hovered].data[1]} servings.
		{/if}
	</div>



</div>

<style>
	.visualization {
		font: 25px sans-serif;
		margin: auto;
		margin-top: 1px;
		text-align: middle;
	}

	/* dynamic classes for the tooltip */
	.tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.tooltip-visible {
		font: 25px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #69b3a2;
		border-radius: 10px;
		width: 200px;
		color: white;
		position: absolute;
		padding: 10px;
	}
</style>
