import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import ArtworkListCard from '../ArtworkListCard';

export default function SearchResults({ results = [], totalResults = 0 }) { 
  console.log('SearchResults props:', { results, totalResults });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {totalResults > 0 ? (
        <>
          <p>Your search returned {totalResults} artworks</p>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
            {currentResults.map((result, index) => (
              <div
                key={index}
                className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'
              >
                <img
                  src={result.imageSmall}
                  alt={result.title}
                  className='w-full h-[200px] object-cover rounded-t lg'
                />
                <div className='flex justify-between px-2 py-4'>
                  <p className='font-bold'>{result.title}</p>
                  <p>
                    <span className='bg-[#000300] text-white p-1 rounded-full'>
                      {result.artistName}
                    </span>
                  </p>
                  <Link to={`/artwork/${result.source}${result.id}`} className='button-link'>
                    View more
                  </Link>
                  <button>Add to Collection</button>
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
