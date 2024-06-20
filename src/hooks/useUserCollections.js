import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/auth/AuthContext';

export default function useUserCollections () {
    const { currentUser } = useAuth();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const getCollections = async () => {
            try {
                const ref = collection(db, 'ArtExhibit');
                const q = query(ref, where('owner', '==', currentUser.email));
                const querySnapshot = await getDocs(q);
                
                const userCollections = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
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
};

