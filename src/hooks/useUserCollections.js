import { useState, useEffect, useCallback } from 'react';
import { db } from '../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fetchResultsBySourceAndId } from '../utils/utils.js';

export default function useUserCollections(currentUser) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArtworkDetails = useCallback(async (artworkID) => {
    let source, id;
    if (artworkID.startsWith('MET')) {
      source = 'MET';
      id = artworkID.substring(3);
    } else if (artworkID.startsWith('CLE')) {
      source = 'CLE';
      id = artworkID.substring(3);
    } else {
      console.error(`Invalid artworkID format: ${artworkID}`);
      return null;
    }

    const artworkDetails = await fetchResultsBySourceAndId(source, id);
    return artworkDetails[0];
  }, []);

  const fetchCollections = useCallback(async () => {
    if (!currentUser) return;

    console.log("Fetching collections...");
    setLoading(true);
    setError(null);

    try {
      const ref = collection(db, 'ArtExhibit');
      const q = query(ref, where('owner', '==', currentUser.displayName));
      const querySnapshot = await getDocs(q);

      const userCollections = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        console.log(`Processing collection ${doc.id}`);

        const artworks = await Promise.all(data.artworkIDs.map(async (artworkID) => {
          console.log(`Fetching artwork details for ${artworkID}`);
          const artworkDetail = await fetchArtworkDetails(artworkID);
          return artworkDetail;
        }));

        console.log(`Artworks for ${doc.id}:`, artworks);

        return {
          id: doc.id,
          ...data,
          artworks: artworks.filter(artwork => artwork !== null),
        };
      }));

      console.log("User collections fetched:", userCollections);

      setCollections(userCollections);
    } catch (error) {
      setError("Error fetching collections: " + error.message);
      console.error("Error fetching collections: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser, fetchArtworkDetails]);

  useEffect(() => {
    const debounceFetchCollections = setTimeout(() => {
      fetchCollections();
    }, 300);

    return () => clearTimeout(debounceFetchCollections);
  }, [fetchCollections]);

  useEffect(() => {
    console.log("Collections state updated:", collections);
  }, [collections]);

  return { collections, loading, error };
}
