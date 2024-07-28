import {createContext, useContext,useState, useEffect, Children } from "react";
import fetchUserData from "../lib/user.js";
import handleApiError from '../utils/handleApiError.js';
const GlobalContext=createContext();
export const useGlobalContext=()=>useContext(GlobalContext);

const GlobalProvider=({children})=>{
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message,setMessage]=useState('');
    const [isError,setIsError]=useState(false)
    useEffect(()=>{
        fetchUserData(setMessage,setIsError)
        .then(userdata=>{
            if (userdata) {
                setIsLoggedIn(true)
                setUserData(userdata)
            }else{
                setIsLoggedIn(false)
                setUserData(null)
                setIsLoading(false)
                console.log('ooooops');
                return null;
            }
        })
        .catch((error)=>{
           setMessage( handleApiError(error,setIsError));
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[])
    return(
        <GlobalContext.Provider
            value={{
                userData,
                setUserData,
                isLoading,
                setIsLoading,
                setIsLoggedIn,
                isLoggedIn,
                message,
                setMessage,
                isError,
                setIsError
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;