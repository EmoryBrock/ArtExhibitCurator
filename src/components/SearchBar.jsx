import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getCLEArtDetailsGeneral, getMETArtDetails, getMETArtID } from "../api";
import SearchResults from "./SearchResults";
import { combinedFetchedDataToRender, convertCLEData, convertMETData } from "../utils";
import { ClevelandDataTest } from "../data/testClevelandData.js";

export default function SearchBar() {
  const [query, setQuery] = useState("vincent");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // API1 call
      const queryString = query.split(' ').join('+')
      const queryArtIdsMET = await getMETArtID(queryString);
      const detailsPromisesMET = queryArtIdsMET.objectIDs
        .slice(0, 5)
        .map((id) => getMETArtDetails(id)); //shorten response for development
      const detailsResponsesMET = await Promise.allSettled(detailsPromisesMET);
      const successfulDetailsMET = detailsResponsesMET
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => result.value);

      let configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));


      //API2 call

      const detailsResponseCLE = await getCLEArtDetailsGeneral(query)
      let configDataSet2 = convertCLEData(detailsResponseCLE);

      // console.log(configDataSet2, "converted dataset2")
      
      //Combined returned data from API calls
      let dataToRender = combinedFetchedDataToRender(
        configDataSet1,
        configDataSet2.slice(0,10) //limiter for development
      );

      setResults(dataToRender);
      setTotalResults(Object.keys(dataToRender).length);
    } catch (error) {
      console.error("Error fetching data", error);
      console.error("Error details:", error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="realative w-full text-gray-600">
      <FaSearch id="search-icon" />
      <input
        type="search"
        name="search"
        placeholder="Enter Search Text Here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button 
        type="submit" 
        className="absolute right-0 top-0 mt-3 mr-4" 
        onClick={handleSearch}>Search</button>

      {isLoading ? (
        <p>Retrieving data...</p> // Display loading message
      ) : results && results.length > 0 ? (
        <div>
          <SearchResults results={results} totalResults={totalResults} />
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
