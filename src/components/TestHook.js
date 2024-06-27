import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function useUserCollections(currentUser) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      if (!currentUser || !currentUser.displayName) {
        console.log('No currentUser or displayName');
        return;
      }

      try {
        console.log(`Fetching collections for: ${currentUser.displayName}`);
        const ref = collection(db, 'ArtExhibit');
        const q = query(ref, where('owner', '==', currentUser.displayName));
        const querySnapshot = await getDocs(q);

        const userCollections = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Fetched collections:', userCollections);
        setCollections(userCollections);
      } catch (error) {
        console.error("Error fetching collections: ", error);
      }
    };

    getCollections();
  }, [currentUser]);

  return collections;
}
