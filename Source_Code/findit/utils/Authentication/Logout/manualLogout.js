import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backendBaseURL from '../../backendBaseURL';

// Function to log out the user by clearing tokens from AsyncStorage and handling messages
const logout = async (setMessage, setIsError, navigation) => {
  try {
    // Get refreshToken from AsyncStorage
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    
    // Make a request to the backend to logout using the refreshToken
    await backendBaseURL.post('/auth/logout', { refreshToken });
    
    // Remove tokens from AsyncStorage
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    
    // Set success message
    setMessage('Logout successfully');
    setIsError(false);
    
    // Redirect to the login page
    navigation.navigate('Login'); // Assuming you are using a navigation library like React Navigation
  } catch (error) {
    // Set error message
    setMessage('Unable to logout, please try again');
    setIsError(true);
    console.error('Logout failed:', error);
  }
};

export default logout;
