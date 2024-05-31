import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const searchApi = async (searchTerm) => {
    try {
      const resp = await yelp.get("/search", {
        params: {
          term: searchTerm,
          limit: 50,
          location: "san jose",
        },
      });

      console.log(resp.data.businesses);
      setResults(resp.data.businesses);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Something Went Wrong");
    }
  };

  useEffect(() => {
    searchApi("pizza");
  }, []);

  return [searchApi, results, error];
};
