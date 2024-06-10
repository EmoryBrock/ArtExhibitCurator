import React from 'react'

export default function SearchResults({ results = [], totalResults = 0 }) { // Destructure props
  console.log(totalResults, "search results length");
  console.log(results, "search results imported data");

  return (
    <div>
      {results.length > 0 ? (
        <div>
          <p>Your search returned {totalResults} artworks</p>
          <ul>
            {results.map(result => (
              <li key={result.objectID}>
                {result.objectID}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
