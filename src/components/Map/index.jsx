import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client"; 
import * as mapcss from "./map.css"
import { useCO2Data } from "../../util/CO2-Provider";
import Globe from "./GlobeMarks";

const Map = ()=> {
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
        setScale(prevScale => prevScale * 1.09);
    }, []);

    const decreaseScale = useCallback(() => {
        setScale(prevScale => prevScale / 1.09);
    }, []);


     return (
        <>
        <div className="svg-container">
            <svg className='svg' >
                <Globe data={data} scale={scale}/>
            </svg>
            <div className='resize-button-container'>
                <p>Click to zoom</p>
                <button onClick={increaseScale} className='zoom-buttons'>+</button>
                <button onClick={decreaseScale} className='zoom-buttons'>-</button>
            </div>
         </div>

         </>
     )
    }
export default Map;