import React from "react";
import useUserCollections from "../hooks/useUserCollections";

export default function TestPage() {
  const collections = useUserCollections();
  console.log(collections, "fetched data")

  return (
    <div>
      <h1>Test Page My Collection draft</h1>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <strong>Exhibit Name:</strong> {collection.exhibit_name}
            <br />
            <strong>Artworks:</strong> {collection.artworkIDs}
          </li>
        ))}
      </ul>
    </div>
  );
}
