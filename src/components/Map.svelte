<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

    <script src="https://d3js.org/d3.v6.js" charset="utf-8"></script>
</head>
<body>
    <div id='map' style='width: 400px; height: 500px;'></div>
    <script>

        mapboxgl.accessToken = 'pk.eyJ1IjoiamVjdW1taW4iLCJhIjoiY2xnZmExMGl0MTFqODNtcGYza3N4MThuYSJ9.PqUnWvtJxHzj8zho_DFRwg';
        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [-88.8965, 13.7942], // starting position [lng, lat]
            zoom: 6, // starting zoom
        });

        markerContainer = d3
            .select(map.getCanvasContainer() )
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("position", "absolute")
            .style("z-index", 2);

        function project(d) {
            return map.project(new mapboxgl.LngLat(+d.lon, +d.lat));
        }

        station_markers = markerContainer
            .selectAll("circle")
            .data({lon: -89.8411, lat: 13.9259})
            .enter()
            .append("circle")
            .attr("r", 5)
            .style("fill", "#808080")
            .attr("stroke", "#808080")
            .attr("stroke-width", 1)
            .attr("fill-opacity", 0.4)
            .attr("cx", function (d) {
                console.log('wut', d); return project(d).x;
            })
            .attr("cy", function (d) {
                return project(d).y;
            });
        // municipo [-89.8411, 13.9259]
        // TODO add marker for location of person
    </script>
</body>



