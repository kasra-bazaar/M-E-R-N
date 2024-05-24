import { useCallback,useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
//   const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
    //   const abortCtrl = new AbortController();
    //   activeHttpRequest.current.push(abortCtrl);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        //   signal: abortCtrl.signal,
        });

        const requestedData = await response.json();
        // activeHttpRequest.current = activeHttpRequest.current.filter(
        //   (reqCtrl) => reqCtrl !== abortCtrl
        // );
        if (!response.ok) {
          throw new Error(requestedData.message);
        }
        setIsLoading(false);
        return requestedData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
//   useEffect(() => {
//     return () => {
//       activeHttpRequest.current.forEach((abrtCtrl) => abrtCtrl.abort());
//     };
//   }, []);
  return { sendRequest, isLoading, error, clearError };
};

export default useHttp;
