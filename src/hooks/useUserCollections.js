import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/auth/AuthContext';
import { fetchResultsBySourceAndId } from '../utils';

export default function useUserCollections() {
  const { currentUser } = useAuth();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const ref = collection(db, 'ArtExhibit');
        const q = query(ref, where('owner', '==', currentUser.email));
        const querySnapshot = await getDocs(q);

        const userCollections = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();

          const artworks = await Promise.all(data.artworkIDs.map(async (artworkID) => {

            // Parsing out sourceID for proper API call routing
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

            // console.log(`Fetching details for source: ${source}, id: ${id}`);
            const artworkDetails = await fetchResultsBySourceAndId(source, id);
            return artworkDetails[0]; 
          }));

          return {
            id: doc.id,
            ...data,
            artworks: artworks.filter(artwork => artwork !== null),
          };
        }));

        setCollections(userCollections);
      } catch (error) {
        console.error("Error fetching collections: ", error);
      }
    };

    if (currentUser && currentUser.email) {
      getCollections();
    }
  }, [currentUser]);

  return collections;
}
