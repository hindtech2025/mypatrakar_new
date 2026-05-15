import { useEffect, useState } from "react";
import { getLanguages } from "../api";

export default function useRecommendedLanguage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getLanguages();
        // console.log("API Response:", res);

        if (isMounted) {
          setData(res.data ?? res);   // safe handle
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
