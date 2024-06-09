import React from 'react'

export default function SearchResults(results) {
  console.log(results.totalResults, "searchresults length")
  console.log(results, "searchresults imported data")

  return (
    <div>
      {results.length > 0 ? (
        <div>
          <p>Your search returned {results.totalResults} artworks</p>
          <ul>
            {results.map(result => (
              <li key={result.objectID}>
                {result.objectID} </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
