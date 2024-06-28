import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import ArtworkListCard from '../../components/ArtworkListCard.jsx';

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
  const [currentResults, setCurrentResults] = useState([]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentResults(results.slice(startIndex, startIndex + itemsPerPage));
  }, [searchUsed]);

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
        <aside id="searchfilter" className="pl-5 pr-3" aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">Search Filters</h2>
          <SearchFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
        </aside>
        <main className="flex-auto">
          <div>
            <p className="text-center font-semibold">
              Your search returned {totalResults} artworks
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pr-6">
              {currentResults.map((result, index) => (
                <Link key={index} to={`/artwork/${result.source}${result.id}`} aria-label={`View details of ${result.title}`}>
                  <ArtworkListCard result={result} />
                </Link>
              ))}
            </div>
            <nav aria-label="Pagination" className="pagination-controls text-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleClick(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                  aria-label={`Go to page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        </main>
      </div>
    )
  );
}