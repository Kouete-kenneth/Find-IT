import { Alert } from 'react-native';
import checkIfLogin from '../utils/Authentication/Login/checkIfLogin.js'
import backendBaseURL from '../utils/backendBaseURL.jsx';
import getLoggedInUserId from '../utils/getUserIdFromAccessToken.js';
import handleApiError from '../utils/handleApiError.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const fetchUserData=async(setMessage,setIsError)=>{
    const isLoogedIn=await checkIfLogin();
    if (!isLoogedIn) {
            console.log('user is not login')
            return null
    }

    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
        setMessage('This action require the user to be logged in');
        setIsError(true)
        return
    }

    const userid=await getLoggedInUserId(setMessage,setIsError)
    if (!userid) {
        setMessage('unable to identify the user');
        setIsError(true)
        return
    }
    backendBaseURL.get('/users',{
        params:{
        userId:userid
        },
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    }).then((userdata)=>{
        return userdata
    }).catch((error)=>{
        setMessage(handleApiError(error,setIsError));
    })
    
    }

    export default fetchUserData;