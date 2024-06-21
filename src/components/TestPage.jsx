import React, { useState, useEffect } from "react";
import useUserCollections from "../hooks/useUserCollections";
import { removeArtworkFromCollection } from '../utils'; 

export default function TestPage() {
  const initialCollections = useUserCollections();
  const [collections, setCollections] = useState(initialCollections);

  useEffect(() => {
    setCollections(initialCollections);
  }, [initialCollections]);

  const handleRemoveArtwork = async (collectionId, artworkID) => {
    try {
      await removeArtworkFromCollection(collectionId, artworkID);
      console.log(`Artwork ${artworkID} successfully removed from collection ${collectionId}`);
      
      // Update the state to trigger a re-render
      setCollections(prevCollections => 
        prevCollections.map(collection => 
          collection.id === collectionId 
            ? { ...collection, artworks: collection.artworks.filter(artwork => `${artwork.source}${artwork.id}` !== artworkID) }
            : collection
        )
      );
    } catch (error) {
      console.error("Failed to remove artwork:", error);
    }
  };

  return (
    <div>
      <h1>Test Page My Collection draft</h1>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <strong>Exhibit Name:</strong> {collection.exhibit_name}
            <br />
            <ul>
              {Array.isArray(collection.artworks) ? (
                collection.artworks.map((artwork, artworkIndex) => (
                  <li key={artworkIndex}>
                    <strong>Title:</strong> {artwork.title}
                    <br />
                    <strong>Artist:</strong> {artwork.artistName || "Unknown Artist"}
                    <br />
                    <img src={artwork.imageSmall} alt={artwork.title} />
                    <button onClick={() => handleRemoveArtwork(collection.id, `${artwork.source}${artwork.id}`)}>Remove</button>
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
