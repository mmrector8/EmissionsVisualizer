import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client"; 
import * as mapcss from "./map.css"

const Map = ()=> {
     const svgRef = useRef(null);

        useEffect(() => {
            // Set up the SVG element
            const svg = d3.select(svgRef.current);

            // Set up the projection and path generators
            const projection = d3.geoOrthographic().scale(250).translate([250, 250]);
            const pathGenerator = d3.geoPath().projection(projection);

            // Draw the globe
            const graticule = d3.geoGraticule();
            svg
                .append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", pathGenerator)
                .style("fill", "none")
                .style("stroke", "#ccc");

            // Load the world map data
            d3.json("https://raw.githubusercontent.com/d3/d3-geo/master/test/data/world-110m.json").then(
                (data) => {
                    // Convert the topojson to geojson
                    const countries = topojson.feature(data, data.objects.countries);

                    // Draw the map
                    svg
                        .selectAll(".country")
                        .data(countries.features)
                        .enter()
                        .append("path")
                        .attr("class", "country")
                        .attr("d", pathGenerator)
                        .style("fill", "gray")
                        .style("stroke", "white")
                        .style("stroke-width", "0.5px");
                }
            );

            // Rotate the globe
            d3.timer(() => {
                const rotation = projection.rotate();
                projection.rotate([rotation[0] + 0.2, rotation[1], rotation[2]]);
                svg.selectAll(".country").attr("d", pathGenerator);
            });
        }, []);

        return <svg ref={svgRef} className='svg'/>;
    }
export default Map;