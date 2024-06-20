import React from "react";
import useUserCollections from "../hooks/useUserCollections";

export default function TestPage() {
  const collections = useUserCollections();
  console.log(collections, "fetched data");

  return (
    <div>
      <h1>Test Page My Collection draft</h1>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <strong>Exhibit Name:</strong> {collection.exhibit_name}
            <br />
            {/* <strong>Artworks:</strong> {collection.artworkIDs ? collection.artworkIDs.join(", ") : "No artworks available"}
            <br /> */}
            <ul>
              {Array.isArray(collection.artworks) ? (
                collection.artworks.map((artwork, artworkIndex) => (
                  <li key={artworkIndex}>
                    <strong>Title:</strong> {artwork.title}
                    <br />
                    <strong>Artist:</strong> {artwork.artistName || "Unknown Artist"}
                    <br />
                    <img src={artwork.imageSmall} alt={artwork.title} />
                  </li>
                ))
              ) : (
                <li>No artworks available</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
