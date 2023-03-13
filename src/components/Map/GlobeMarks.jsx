import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'

const Marks = ({ data: { land, interiors } }) => {
    const projection = geoOrthographic();
    const path = geoPath(projection);
    const graticule = geoGraticule();

    return (
        <g className="marks" >
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