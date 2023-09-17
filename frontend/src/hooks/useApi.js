import { useState, useEffect, useCallback } from 'react';
import axios from '../apis/axios';

// Custom hook for making API requests
function useApi(apiUrl) {
  // State variables to manage data, loading state, and errors
  const [data, setData] = useState(null); // Holds the fetched data
  const [loading, setLoading] = useState(true); // Indicates if the request is in progress
  const [error, setError] = useState(null); // Holds any errors encountered during the request

  // Function to fetch data from the specified API URL
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl); // Make a GET request to the API
      setData(response.data); // Update the data state with the response
      setError(null); // Reset the error state on success
    } catch (error) {
      // Handle errors, including extracting error messages from the response if available
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }, [apiUrl]);

  // Effect to trigger data fetching when the apiUrl or fetchData function changes
  useEffect(() => {
    fetchData();
  }, [apiUrl, fetchData]);

  // Function to manually trigger a data fetch (useful for re-fetching)
  const refetch = () => {
    setLoading(true); // Set loading to true to indicate a new request
    fetchData(); // Call the fetchData function to fetch data again
  };

  // Return the data, loading state, refetch function, and error state as an object
  return { data, loading, refetch, error };
}

export default useApi;
