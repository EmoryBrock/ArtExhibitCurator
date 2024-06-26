import React, { useState, useEffect } from "react";
import useUserCollections from "../hooks/useUserCollections";
import { removeArtworkFromCollection } from '../utils'; 
import { Link, useParams } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../components/auth/AuthContext';
import ExhibitCard from "./ExhibitCard";

export default function Collection() {
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

    setCollections(prevCollections => 
      prevCollections.filter(collection => collection.id !== id)
    );
  };

  const handleRemoveArtwork = async (collectionId, artworkID) => {
    try {
      await removeArtworkFromCollection(collectionId, artworkID);
      console.log(`Artwork ${artworkID} successfully removed from collection ${collectionId}`);
      
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
  const isCollectionOwner = currentUser?.displayName === collectionOwner;
  const pageTitle = isCollectionOwner ? "My Art Exhibits" : <span>Art Exhibits curated by <strong className="text-indigo">{collectionOwner}</strong></span>;

  return (
    <div>
      <p className="mt-8 text-center font-semibold text-3xl">{pageTitle}</p>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <ExhibitCard 
              collection={collection} 
              canEdit={canEdit}
              handleRemoveArtwork={handleRemoveArtwork}
              handleRemoveExhibit={handleRemoveExhibit}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}