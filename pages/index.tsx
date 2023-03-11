import styles from "@/styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);

  const fetchSearchData = async () => {
    setLoading("LOADING");
    try {
      const url = `http://hn.algolia.com/api/v1/search?query=${query}`;
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
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query){
      console.log("valid search")
      fetchSearchData();
    }
  };
  console.log("query", query);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-500 my-5">
        Hacker Home Screen
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-5 max-w-3xl w-full flex flex-row justify-between text-xl font-medium"
      >
        <input
          className="h-16 px-4 mr-2 w-2/3"
          type="text"
          placeholder="Search any articles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-opacity-80 w-1/3 h-16 flex justify-center items-center text-gray-200"
        >
          Submit
        </button>
      </form>
      <div className="max-w-3xl w-full">
        {results?.length > 0 &&
          results.map((result, index) => (
            <div
              key={result["objectID"]}
              className="w-full flex justify-start "
            >
              <Link
                href={`/post/${result["objectID"]}`}
                className="hover:text-green-500"
              >
                <span>{index + 1} .</span> <span>{result["title"]}</span>
              </Link>
            </div>
          ))}
      </div>
      {loading === "LOADING" && <div>Loading your result...</div>}
      {loading === "NO_DATA" && <div>No data found for your search</div>}
      {error && <div>An error occurred while fetching the data.</div>}
    </div>
  );
}
