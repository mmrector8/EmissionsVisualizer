import React, { useState, useEffect, useContext, useRef } from 'react'

const CO2DataContext = React.createContext();

export function useCO2Data(){
    return useContext(CO2Data)
}

const DataProvider = ({children})=>{
    const [CO2Data, setCO2Data] = useState([])
    const dataLoaded = useRef(false)

    useEffect(()=>{
        const url = 'https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=3000';
       if (!dataLoaded){
           fetch(url)
               .then((res) => res.json())
               .then((data) => {
                   setCO2Data(data)
                   dataLoaded.current = true;
               })
               .catch(error=> {
                console.error(error)
               })
       }

    }, [CO2Data])

    return (
        <>
            <CO2Data.Provider value={CO2Data}>
                {children}
            </CO2Data.Provider>
        </>
    )

}
export default DataProvider;