import * as d3 from "d3";
import * as topojson from "topojson-client"; 

const Marks = ({ data: { land, interiors } }) => {
    const projection = geoOrthographic();
    const path = geoPath(projection);
    const graticule = geoGraticule();

    return (
        <g className="marks" >
            <path className="sphere" d={path({ type: 'Sphere' })} />
            {
                land.features.map(feature => (
                    <path className="feature" d={path(feature)} />
                ))
            }
            <path className="interiors" d={path(interiors)} />
        </g>
    );
};
export default Marks;