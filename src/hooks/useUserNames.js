import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function useUserNames() {
    const [userIds, setUserIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchUserIds = async () => {
            try {
              const querySnapshot = await getDocs(collection(db, 'users'));
              console.log(querySnapshot)
              const ids = querySnapshot.docs.map(doc => doc.id);
              setUserIds(ids);
              console.log("User IDs fetched:", ids); // Add this console log to verify fetched IDs
            } catch (err) {
              setError(err.message);
              console.error("Error fetching user IDs:", err); // Log the error for debugging
            } finally {
              setLoading(false);
            }
          };
  
      fetchUserIds();
    }, []);
  
    return { userIds, loading, error };
  };
