import * as homepagecss from "./homepage.css"
import Map from "../Map";
import Shapes from "../shapes/shapes";
const Homepage = ()=>{

    return (
        <div className="homepage-wrapper">
            <h1 className="webpage-title">Explore Global Emissions by Country</h1>
            <div className='map-container'>
                <Map />
                {/* <Shapes /> */}
            </div>
        </div>
    )
}
export default Homepage;