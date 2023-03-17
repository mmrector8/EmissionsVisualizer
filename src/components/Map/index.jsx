import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client"; 
import * as mapcss from "./map.css"
import { useCO2Data } from "../../util/CO2-Provider";
import Globe from "./GlobeMarks";

const Map = ()=> {
    // const CO2Data = useCO2Data();
    const svgRef = useRef(null);
    const [data, setData] = useState("");
    const [scale, setScale] = useState(350)

    useEffect(() => {
        d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(topojsonData => {
            const { countries, land } = topojsonData.objects
            setData({
                land: topojson.feature(topojsonData, land),
                interiors: topojson.mesh(
                    topojsonData, countries, (a, b) => a !== b)
            })
        });
    }, [])

    const increaseScale = useCallback(() => {
        setScale(prevScale => prevScale * 1.2);
    }, []);

    const decreaseScale = useCallback(() => {
        setScale(prevScale => prevScale / 1.1);
    }, []);


     return (
        <>
            <svg className='svg'  >
                <Globe data={data} scale={scale}/>
            </svg>
            {/* <button onClick={increaseScale}>+</button>
            <button onClick={decreaseScale}>-</button> */}
         </>
     )
    }
export default Map;