import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { useState, useCallback } from 'react';
const projection = geoOrthographic();
const path = geoPath(projection);
const graticule = geoGraticule();


const Marks = ({ data: { land, interiors } }) => {
    const [MousePosition, setMousePosition] = useState({x:0, y:0})
    const handleMouseMove = useCallback((event)=>{
        const {clientX, clientY} = event;
        setMousePosition({x: clientX, y: clientY})
    }, [setMousePosition])
    return (
        <g className="marks" onMouseMove= {handleMouseMove}>
            {projection.rotate([MousePosition.x + 30 / 1000, -(MousePosition.y - 0.05), 0])}
            <path className="sphere" d={path({ type: 'Sphere' })} />
            {
                land?.features?.map((feature, idx) => (
                    <path className="feature" d={path(feature)} key={idx}/>
                ))
            }
            <path className="interiors" d={path(interiors)} />
        </g>
    );
};
export default Marks;