import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { useState, useCallback } from 'react';


const Globe = ({ data: { land, interiors }, scale } ) => {
    const [clicked, setClicked] = useState(false)
    const projection = geoOrthographic().scale(scale);
    const path = geoPath(projection)
    const graticule = geoGraticule();

    const [MousePosition, setMousePosition] = useState({x:null, y:null})

    const handleMouseDown = useCallback((event)=>{
        setClicked(true)
    }, [])

    const handleMouseUp = useCallback((event) => {
        setClicked(false)
    }, [])

    const handleMouseMove = useCallback((event)=>{
        if (clicked){
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY })
        }
    }, [setMousePosition, clicked])
    
    return (
        <g className="marks" transform="translate(0, 100)" onMouseMove= {handleMouseMove} onMouseDown= {handleMouseDown} onMouseUp={handleMouseUp} >
            {projection.rotate([MousePosition.x + 10 / 1000, -(MousePosition.y - 0.05), 0])}
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
export default Globe;