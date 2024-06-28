import React, { useState, useEffect, useMemo, useCallback } from "react";
import useUserCollections from "../../hooks/useUserCollections.js";
import { removeArtworkFromCollection } from '../../utils/utils.js'; 
import { useParams } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useAuth } from '../../context/AuthContext.jsx';
import ExhibitCard from "../../components/ExhibitCard.jsx";
import useUserNames from "../../hooks/useUserNames";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

export default function Collection() {
  const { collectionOwner } = useParams();
  const { userIds, loading: userNamesLoading, error: userNamesError } = useUserNames();
  const normalizedCollectionOwner = useMemo(() => ({ displayName: collectionOwner }), [collectionOwner]);
  const { currentUser } = useAuth();

  const [collections, setCollections] = useState([]);
  const { collections: initialCollections, loading: collectionsLoading, error: collectionsError } = useUserCollections(normalizedCollectionOwner);

  useEffect(() => {
    console.log("Component mounted");
    if (initialCollections && initialCollections.length > 0) {
      console.log("Initial collections loaded:", initialCollections);
      const sortedCollections = [...initialCollections].sort((a, b) => 
        a.exhibit_name.localeCompare(b.exhibit_name)
      );
      setCollections(sortedCollections);
    }
  }, [initialCollections]);

  const handleRemoveExhibit = useCallback(async (id) => {
    const exhibitDoc = doc(db, "ArtExhibit", id);
    await deleteDoc(exhibitDoc);

    setCollections(prevCollections => 
      prevCollections.filter(collection => collection.id !== id)
    );
  }, []);

  const handleRemoveArtwork = useCallback(async (collectionId, artworkID) => {
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
  }, []);

  useEffect(() => {
    console.log("Collections state updated:", collections);
  }, [collections]);

  if (userNamesLoading || collectionsLoading) {
    return <div><LoadingSpinner /></div>;
  }

  if (userNamesError) {
    return <div>Error: {userNamesError}</div>;
  }

  if (!userIds.includes(collectionOwner)) {
    console.log(`User ${collectionOwner} not found in userIds:`, userIds);
    return <div>Unable to locate a user with the username: {collectionOwner}</div>;
  }

  if (collectionsError) {
    console.error("Error fetching collections:", collectionsError);
    return <div>Error: {collectionsError}</div>;
  }

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
