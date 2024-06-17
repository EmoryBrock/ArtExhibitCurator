import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getCLEArtDetailsGeneral, getCLEArtDetailsByArtist, getMETArtDetails, getMETArtIDGeneral, getMETArtIDbyArtist, getMETArtIDbyTitle } from "../../api";
import SearchResults from "./SearchResults";
import SearchFilter from "./SearchFilter";
import { combinedFetchedDataToRender, convertCLEData, convertMETData } from "../../utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("general")
  const [initialResults, setInitialResults] = useState([]);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    dates: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    type: "",
    date: "",
    sort: "title",
    order: "asc",
  });
  
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const queryString = query.split(" ").join("+");

      //API calls based on search type
  let configDataSet1 = []
  let configDataSet2 = []

  if (searchType === "general") {
    const queryArtIdsMET = await getMETArtIDGeneral(queryString);
    const detailsPromisesMET = queryArtIdsMET.objectIDs
      .slice(0, 5)
      .map((id) => getMETArtDetails(id));
    const detailsResponsesMET = await Promise.allSettled(detailsPromisesMET);
    const successfulDetailsMET = detailsResponsesMET
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => result.value);

    configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));
    const detailsResponseCLE = await getCLEArtDetailsGeneral(query);
    configDataSet2 = convertCLEData(detailsResponseCLE);

  } else if (searchType === "artist") {
    const queryArtIdsMET = await getMETArtIDbyArtist(queryString);
    const detailsPromisesMET = queryArtIdsMET.objectIDs
      .slice(0, 5)
      .map((id) => getMETArtDetails(id));
    const detailsResponsesMET = await Promise.allSettled(detailsPromisesMET);
    const successfulDetailsMET = detailsResponsesMET
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => result.value);
      

    configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));
    const detailsResponseCLE = await getCLEArtDetailsByArtist(query);
    configDataSet2 = convertCLEData(detailsResponseCLE);

  } else if (searchType === "title") {
    // error in fetching CLE API data
    console.log(query, "if then title searchbar")
    const queryArtIdsMET = await getMETArtIDbyTitle(queryString);
    const detailsPromisesMET = queryArtIdsMET.objectIDs
      .slice(0, 5)
      .map((id) => getMETArtDetails(id));
    const detailsResponsesMET = await Promise.allSettled(detailsPromisesMET);
    const successfulDetailsMET = detailsResponsesMET
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => result.value);
      

    configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));
    const detailsResponseCLE = await getCLEArtDetailsByTitle(query);
    configDataSet2 = convertCLEData(detailsResponseCLE);
  }

      let dataToRender = combinedFetchedDataToRender(
        configDataSet1,
        configDataSet2.slice(0, 10)
      );

      setInitialResults(dataToRender); // Save initial results
      setResults(dataToRender);
      setTotalResults(Object.keys(dataToRender).length);

      // Extract unique types and dates from results to populate filter dropdowns
      const allTypes = Array.from(new Set(dataToRender.map(item => item.type)));
      const allDates = Array.from(new Set(dataToRender.map(item => item.date)));

      setFilters({
        types: allTypes,
        dates: allDates,
      });

    } catch (error) {
      console.error("Error fetching data", error);
      console.error("Error details:", error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filteredData = initialResults.filter((item) => {
      const matchesType =
        !selectedFilters.type || item.type === selectedFilters.type;
      const matchesDate =
        !selectedFilters.date || item.date === selectedFilters.date;
      return matchesType && matchesDate;
    });

    if (selectedFilters.sort === "title") {
      filteredData.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return selectedFilters.order === "asc" ? comparison : -comparison;
      });
    } else if (selectedFilters.sort === "date") {
      filteredData.sort((a, b) => {
        const comparison = new Date(b.date) - new Date(a.date);
        return selectedFilters.order === "asc" ? -comparison : comparison;
      });
    }

    setResults(filteredData);
  };

  const clearFilters = () => {
    setSelectedFilters({
      type: "",
      date: "",
      sort: "title",
      order: "asc",
    });

    setResults(initialResults);
  };

  return (
    <div className="relative w-full text-gray-600">
      <FaSearch id="search-icon" />
      <input
        type="search"
        name="search"
        placeholder="Enter Search Text Here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="radio-buttons">
      <label>
          <input
            type="radio"
            value="general"
            checked={searchType === "general"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          General
        </label>
        <label>
          <input
            type="radio"
            value="artist"
            checked={searchType === "artist"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Artist
        </label>
        <label>
          <input
            type="radio"
            value="title"
            checked={searchType === "title"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Title
        </label>
      </div>
      <button
        type="submit"
        className="absolute right-0 top-0 mt-3 mr-4"
        onClick={handleSearch}
      >
        Search
      </button>

      {isLoading ? (
        <p>Retrieving data...</p>
      ) : results && results.length > 0 ? (
        <div>
          <SearchFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
          <SearchResults results={results} totalResults={totalResults} />
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
