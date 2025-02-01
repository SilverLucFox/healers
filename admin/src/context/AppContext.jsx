/* eslint-disable react/prop-types */
import {createContext} from 'react'


export const AppContext = createContext()
const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const SDF = (SD) => {
    const dateARR = SD.split("_");
    return dateARR[0] + " " + month[Number(dateARR[1]) - 1] + " " + dateARR[2];
  };
  
  const backendurl = import.meta.env.VITE_BACKEND_URL;
const AppContextProvider = (props)=>{
    const cur = '$'
    const calAge = (dob)=>{
        const today = new Date()
        const nday = new Date(dob)
        let age = today.getFullYear()-nday.getFullYear()
        console.log(nday.getFullYear())
        return age
    }


const value = {
calAge,cur,SDF,backendurl
}
return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}

export default AppContextProvider