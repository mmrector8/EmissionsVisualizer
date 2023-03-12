import * as homepagecss from "./homepage.css"
import Map from "../Map";
const Homepage = ()=>{

    return (
        <div className="homepage-wrapper">
            <h1 className="webpage-title">Explore Global Emissions by Country</h1>
            <Map />
        </div>
    )
}
export default Homepage;