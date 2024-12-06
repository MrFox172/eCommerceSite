import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://www.thelowerorbit.com:8080/api";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(baseUrl + url);
        if (!response.status) throw new Error(response.statusText);
        const json = await response.data;
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    if (url !== "") {
      fetchData();
    }
  }, [url]);
  return { data, isPending, error };
};
