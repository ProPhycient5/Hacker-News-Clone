import styles from "@/styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import debounce from "lodash/debounce";
import { FaSearch } from "react-icons/fa";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);

  const debouncedSearch = debounce(async (searchQuery) => {
    setLoading("LOADING");
    try {
      const url = `https://hn.algolia.com/api/v1/search?query=${searchQuery}`;
      const response = await axios.get(url);
      console.log("respomse", response);
      if (response.data.hits?.length > 0) {
        setLoading("LOADED");
        console.log("fetched data", response.data.hits);
        setResults(response.data.hits);
      } else setLoading("NO_DATA");
    } catch (err) {
      setError(true);
      console.log("Error has occurred while fetching the searched result", err);
    }
  }, 500);

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  };

  console.log("query", query);

  return (
    <div className="w-screen flex flex-col justify-center items-center text-gray-300">
      <h1 className="text-3xl font-bold text-green-500 my-5">
        Hacker News Home
      </h1>

      <div className="mb-5 max-w-3xl w-full flex flex-row justify-between text-xl font-medium relative">
        <input
          className="h-16 pl-12 mr-2 w-full border border-gray-300 focus:border-green-500 focus:outline-none"
          type="text"
          placeholder="Search any articles..."
          value={query}
          onChange={handleSearch}
        />
        <div className="absolute left-4 top-5 mr-4">
          <FaSearch className="text-green-500" />
        </div>
      </div>
      <div className="max-w-3xl w-full">
        {results?.length > 0 &&
          results.map(
            (result) =>
              result["title"] && (
                <div
                  key={result["objectID"]}
                  className="w-full flex justify-start mb-2.5"
                >
                  <Link
                    href={`/post/${result["objectID"]}`}
                    className="hover:text-green-500"
                  >
                    <span>&#x2022; {result["title"]}</span>
                  </Link>
                </div>
              )
          )}
      </div>
      {loading === "LOADING" && <div>Loading your searched result...</div>}
      {loading === "NO_DATA" && <div>No data found for your search</div>}
      {error && <div>An error occurred while fetching the data.</div>}
    </div>
  );
}
