import React, {useState} from 'react'

export default function SearchResults({ results = [], totalResults = 0 }) { // Destructure props
  // console.log(totalResults, "search results length");
  // console.log(results, "search results imported data");

  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;  // Adjust as needed

    const totalPages = Math.ceil(totalResults / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div>
          {totalResults > 0 ? (
              <div>
                  <p>Your search returned {totalResults} artworks</p>
                  <ul>
                      {currentResults.map(result => (
                          <li key={result.objectID}>
                              {result.objectID}
                          </li>
                      ))}
                  </ul>
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
          ) : (
              <></>
          )}
      </div>
  );
}

