import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter'; // Import if needed
import LoadingSpinner from '../LoadingSpinner';

export default function SearchResults({
  searchUsed,
  results = [],
  totalResults,
  isLoading,
  filters,
  handleFilterChange,
  applyFilters,
  clearFilters,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="bg-white">
        <LoadingSpinner />
      </div>)
  }

  if (searchUsed && results.length === 0) {
    return (
      <div className="bg-white pt-8 w-full text-center font-medium text-lg">
    <p>No results found</p>
    </div>)
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
                <div key={index}>
                  <img
                    src={result.imageSmall}
                    alt={result.title}
                    className="w-full h-[200px] object-cover rounded-t lg"
                  />
                  <div className="flex justify-between px-2 py-4">
                    <p className="font-bold">{result.title}</p>
                    <p>
                      <span className="bg-[#000300] text-white p-1 rounded-full">
                        {result.artistName}
                      </span>
                    </p>
                    <Link to={`/artwork/${result.source}${result.id}`} className="button-link">
                      View more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-controls">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleClick(index + 1)}
                  disabled={currentPage === index + 1}
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
