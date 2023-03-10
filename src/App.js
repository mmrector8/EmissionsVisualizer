import Homepage from "./components/Homepage";
import DataProvider from "./util/CO2-Provider";
function App() {
  return (
    <DataProvider>
      <div className="App">
        <Homepage />
      </div>
    </DataProvider>
  );
}

export default App;
