import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './Search/SearchFilter';
import LoadingSpinner from './LoadingSpinner';
import ArtworkListCard from './ArtworkListCard';

export default function SearchResults({
  searchUsed,
  initialResults, // Assume initialResults is fetched elsewhere, possibly from props or context
  totalResults,
  isLoading,
  filters,
  handleFilterChange,
  applyFilters,
  clearFilters,
}) {
  const [results, setResults] = useState(initialResults); // Initialize results from props
  const [currentPage, setCurrentPage] = useState(1);
  const [currentResults, setCurrentResults] = useState([]);

  const itemsPerPage = 20;

  useEffect(() => {
    if (searchUsed) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentResults(results.slice(startIndex, endIndex));
    }
  }, [searchUsed, currentPage, results, itemsPerPage]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (searchUsed && results.length === 0) {
    return (
      <div className="bg-white pt-8 w-full text-center font-medium text-lg">
        <p>No results found</p>
      </div>
    );
  }

  return (
    searchUsed && results.length > 0 && (
      <div className="bg-white flex pt-5 w-full">
        <div id="searchfilter" className="pl-5 pr-3">
          <SearchFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
        </div>
        <div className="flex-auto">
          <div>
            <p className="text-center font-semibold">Your search returned {totalResults} artworks</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pr-6">
              {currentResults.map((result, index) => (
                <Link key={index} to={`/artwork/${result.source}${result.id}`}>
                  <ArtworkListCard result={result} />
                </Link>
              ))}
            </div>
            <div className="pagination-controls">
              {Array.from({ length: Math.ceil(totalResults / itemsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleClick(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}