import React, { useState, useEffect, useContext, useRef } from 'react'

const CO2DataContext = React.createContext();

export function useCO2Data(){
    return useContext(CO2DataContext)
}

const DataProvider = ({children})=>{
    const [CO2Data, setCO2Data] = useState([])
    const dataLoaded = useRef(false)

    useEffect(()=>{
        const url = 'https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=3000';
       if (!dataLoaded.current){
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

    }, [dataLoaded.current])

    return (
        <>
            <CO2DataContext.Provider value={CO2Data}>
                {children}
            </CO2DataContext.Provider>
        </>
    )

}
export default DataProvider;