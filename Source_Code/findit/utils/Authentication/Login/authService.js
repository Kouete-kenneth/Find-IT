
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import backendBaseURL from '../../backendBaseURL';

const login = async (formData, setMessage, handleApiError, setIsError, setIsLoggedIn, redirectTo) => {
  const navigation = useNavigation();
  try {
    const response = await backendBaseURL.post('/auth/login', formData);
    const { tokens, user } = response.data;
    alert(tokens);

    // Check if the user's email is verified
    if (!user.isEmailVerified) {
      const errorMessage = 'Email is not verified. Please verify your email before logging in. You will receive a verification email shortly.';
      setMessage(errorMessage);
      setIsError(true);

      // Send verification email to the user
      await backendBaseURL.post('/auth/send-verification-email', {}, {
        headers: {
          'Authorization': `Bearer ${tokens.access.token}`
        }
      }).catch(error => {
        setMessage(handleApiError(error, setIsError));
        console.error('Error sending verification email:', error);
      });

      return Promise.reject('Email is not verified');
    }

    // Store tokens in AsyncStorage
    await AsyncStorage.setItem('accessToken', tokens.access.token);
    await AsyncStorage.setItem('refreshToken', tokens.refresh.token);

    setMessage('Login successfully');
    setIsLoggedIn(true);
    setIsError(false);

    // Redirect to the specified screen
    navigation.navigate(redirectTo);

    return Promise.resolve('Login successful');
  } catch (error) {
    setMessage(handleApiError(error, setIsError));
    setIsError(true);
    console.error('Login failed:', error);
    return Promise.reject('Login failed');
  }
};

export default login;
