import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client"; 
import * as mapcss from "./map.css"
import { useCO2Data } from "../../util/CO2-Provider";
import Marks from "./GlobeMarks";

const Map = ()=> {
    const CO2Data = useCO2Data();
     const svgRef = useRef(null);
    const jsonUrl = 'countries-50m.json';
    const [data, setData] = useState(null);

    useEffect(() => {
        d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(topojsonData => {
            const { countries, land } = topojsonData.objects
            setData({
                land: topojson.feature(topojsonData, land),
                interiors: topojson.mesh(
                    topojsonData, countries, (a, b) => a !== b)
            })
        });
    }, [data])
     return (
        <svg className='svg'>
            <Marks data={data}/>
        </svg>
     )
    }
export default Map;