import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  getCLEArtDetailsGeneral,
  getCLEArtDetailsByArtist,
  getCLEArtDetailsByTitle,
  getMETArtDetails,
  getMETArtIDGeneral,
  getMETArtIDbyArtist,
  getMETArtIDbyTitle,
} from "../../api";
import SearchResults from "./SearchResults";
import SearchFilter from "./SearchFilter";
import {
  combinedFetchedDataToRender,
  convertCLEData,
  convertMETData,
} from "../../utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("general");
  const [initialResults, setInitialResults] = useState([]);
  const [results, setResults] = useState([]);
  const [searchUsed, setSearchUsed] = useState(false);
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
      let configDataSet1 = [];
      let configDataSet2 = [];

      if (searchType === "general") {
        const queryArtIdsMET = await getMETArtIDGeneral(queryString);
        if (queryArtIdsMET.objectIDs === null) {
          configDataSet1 = {};
        } else {
          const detailsPromisesMET = queryArtIdsMET.objectIDs
            .slice(0, 20)
            .map((id) => getMETArtDetails(id));
          const detailsResponsesMET = await Promise.allSettled(
            detailsPromisesMET
          );
          const successfulDetailsMET = detailsResponsesMET
            .filter((result) => result.status === "fulfilled" && result.value)
            .map((result) => result.value);

          configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));
        }
        const detailsResponseCLE = await getCLEArtDetailsGeneral(query);
        configDataSet2 = convertCLEData(detailsResponseCLE);
      } else if (searchType === "artist") {
        const queryArtIdsMET = await getMETArtIDbyArtist(queryString);
        if (queryArtIdsMET.objectIDs === null) {
          configDataSet1 = {};
        } else {
          const detailsPromisesMET = queryArtIdsMET.objectIDs
            .slice(0, 20)
            .map((id) => getMETArtDetails(id));
          const detailsResponsesMET = await Promise.allSettled(
            detailsPromisesMET
          );
          const successfulDetailsMET = detailsResponsesMET
            .filter((result) => result.status === "fulfilled" && result.value)
            .map((result) => result.value);

          configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));
        }
        const detailsResponseCLE = await getCLEArtDetailsByArtist(query);
        configDataSet2 = convertCLEData(detailsResponseCLE);
      } else if (searchType === "title") {
        const queryArtIdsMET = await getMETArtIDbyTitle(queryString);
        if (queryArtIdsMET.objectIDs === null) {
          configDataSet1 = {};
        } else {
          const detailsPromisesMET = queryArtIdsMET.objectIDs
            .slice(0, 20)
            .map((id) => getMETArtDetails(id));
          const detailsResponsesMET = await Promise.allSettled(
            detailsPromisesMET
          );
          const successfulDetailsMET = detailsResponsesMET
            .filter((result) => result.status === "fulfilled" && result.value)
            .map((result) => result.value);

          configDataSet1 = convertMETData(successfulDetailsMET.filter(Boolean));
        }
        const detailsResponseCLE = await getCLEArtDetailsByTitle(query);
        configDataSet2 = convertCLEData(detailsResponseCLE);
      }

      let dataToRender = combinedFetchedDataToRender(
        configDataSet1,
        configDataSet2.slice(0, 20)
      );

      setInitialResults(dataToRender); // Save initial results
      setResults(dataToRender);
      setSearchUsed(true);
      setTotalResults(Object.keys(dataToRender).length);

      // Extract unique types and dates from results to populate filter dropdowns
      console.log(dataToRender, "data to render");
      const allTypes = Array.from(
        new Set(dataToRender.map((item) => item.type))
      );
      const allDates = Array.from(
        new Set(dataToRender.map((item) => item.date))
      );

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
      setSearchUsed(!searchUsed)
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
    <div className="relative bg-indigo-100 text-gray-600 pt-6">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center">
          <input
            type="text"
            name="search"
            placeholder="Search for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-md border-gray-200 py-2.5 pl-4 pr-10 shadow-sm text-lg"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-2.5 mr-2"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
        <fieldset className="grid grid-cols-3 gap-4 py-3">
          <legend className="sr-only">Search Type</legend>
          <div>
            <label
              htmlFor="general"
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700">Search Any Fields</p>
              </div>
              <input
                type="radio"
                name="searchType"
                value="general"
                id="general"
                checked={searchType === "general"}
                onChange={(e) => setSearchType(e.target.value)}
                className="size-5 border-gray-300 text-blue-500"
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="artist"
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700">Search by Artist</p>
              </div>
              <input
                type="radio"
                name="searchType"
                value="artist"
                id="artist"
                checked={searchType === "artist"}
                onChange={(e) => setSearchType(e.target.value)}
                className="size-5 border-gray-300 text-blue-500"
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="title"
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700">Search by Title</p>
              </div>
              <input
                type="radio"
                name="searchType"
                value="title"
                id="title"
                checked={searchType === "title"}
                onChange={(e) => setSearchType(e.target.value)}
                className="size-5 border-gray-300 text-blue-500"
              />
            </label>
          </div>
        </fieldset>
      </div>
      <SearchResults
        searchUsed={searchUsed}
        results={results}
        totalResults={totalResults}
        isLoading={isLoading}
        filters={filters}
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />
    </div>
  );
}
