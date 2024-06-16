import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getCLEArtDetailsGeneral, getMETArtDetails, getMETArtID } from "../../api";
import SearchResults from "./SearchResults";
import SearchFilter from "./SearchFilter";
import { combinedFetchedDataToRender, convertCLEData, convertMETData } from "../../utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [initialResults, setInitialResults] = useState([]); // Store initial results
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
      const queryArtIdsMET = await getMETArtID(queryString);
      const detailsPromisesMET = queryArtIdsMET.objectIDs
        .slice(0, 5)
        .map((id) => getMETArtDetails(id));
      const detailsResponsesMET = await Promise.allSettled(detailsPromisesMET);
      const successfulDetailsMET = detailsResponsesMET
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => result.value);

      let configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));

      const detailsResponseCLE = await getCLEArtDetailsGeneral(query);
      let configDataSet2 = convertCLEData(detailsResponseCLE);

      let dataToRender = combinedFetchedDataToRender(
        configDataSet1,
        configDataSet2.slice(0, 10)
      );

      setInitialResults(dataToRender); // Save initial results
      setResults(dataToRender);
      setTotalResults(Object.keys(dataToRender).length);

      // Extract unique types and dates from results
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
      <button
        type="submit"
        className="absolute right-0 top-0 mt-3 mr-4"
        onClick={handleSearch}
      >
        Search
      </button>

      <SearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <p>Retrieving data...</p>
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
