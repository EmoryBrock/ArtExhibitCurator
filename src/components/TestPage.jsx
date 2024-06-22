import React, { useState, useEffect } from "react";
import useUserCollections from "../hooks/useUserCollections";
import { removeArtworkFromCollection } from '../utils'; 
import { Link, useParams } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../components/auth/AuthContext';

export default function TestPage() {
  const { collectionOwner } = useParams();
  const initialCollections = useUserCollections(collectionOwner);
  const [collections, setCollections] = useState(initialCollections);
  const { currentUser } = useAuth();

  useEffect(() => {
    const sortedCollections = [...initialCollections].sort((a, b) => 
      a.exhibit_name.localeCompare(b.exhibit_name)
    );
    setCollections(sortedCollections);
  }, [initialCollections]);

  const handleRemoveExhibit = async (id) => {
    const exhibitDoc = doc(db, "ArtExhibit", id);
    await deleteDoc(exhibitDoc);

    // Update the state to trigger a re-render
    setCollections(prevCollections => 
      prevCollections.filter(collection => collection.id !== id)
    );
  };

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

  const canEdit = currentUser?.displayName === collectionOwner;
  const isCollectionOwner = currentUser?.displayName === collectionOwner
  const pageTitle = isCollectionOwner ? "My Art Exhibits" : <span>Art Exhibits curated by <strong>{collectionOwner}</strong></span>

  return (
    <div>
      <h1>{pageTitle}</h1>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <strong>Exhibit Name:</strong> {collection.exhibit_name} 
            {canEdit && <button onClick={() => handleRemoveExhibit(collection.id)}>Remove Exhibit</button>}
            <br />
            <ul>
              {Array.isArray(collection.artworks) && collection.artworks.length > 0 ? (
                collection.artworks.map((artwork, artworkIndex) => (
                  <li key={artworkIndex}>
                    <strong>Title:</strong> {artwork.title}
                    <br />
                    <strong>Artist:</strong> {artwork.artistName || "Unknown Artist"}
                    <br />
                    <Link to={`/artwork/${artwork.source}${artwork.id}`}>
                      <img src={artwork.imageSmall} alt={artwork.title} />
                    </Link>
                    {canEdit && <button onClick={() => handleRemoveArtwork(collection.id, `${artwork.source}${artwork.id}`)}>Remove</button>}
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
