import backendBaseURL from "../utils/backendBaseURL";
import handleApiError from "../utils/handleApiError";


/**
 * Creates a new item via API.
 * @param {Object} newItem - The item data to be created.
 * @returns {Promise<Object>} - The created item data.
 */

const createNewItem = async (newItem, setMessage, setIsError) => {
    try {
        const response = await backendBaseURL.post('/items', newItem);
        
        try {
            const data = response.data;
            if (!data) {
                throw new Error('No data returned from API');
            }
            setMessage('Item saved successfully!');
            setIsError(false);
            return data;
        } catch (responseDataError) {
            console.error('Error processing response data:', responseDataError.message);
            setMessage('Error processing response data');
            setIsError(true);
        }

    } catch (apiError) {
            setMessage(handleApiError(apiError,setIsError));
    }
};

export {
    createNewItem
};
