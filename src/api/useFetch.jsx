// src/api/useFetch.js
import { useState, useEffect } from "react";
import { fetchData } from "./fetchData";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(url);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  
  return { data, loading, error };
};

export default useFetch;
