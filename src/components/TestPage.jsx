import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './auth/AuthContext'; // Adjust the import path as needed

function TestPage() {
    const { currentUser } = useAuth(); // Access currentUser from AuthContext
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const getLists = async () => {
            try {
                const ref = collection(db, 'ArtExhibit');
                const q = query(ref, where('owner', '==', currentUser.email));
                const querySnapshot = await getDocs(q);
                
                const userExhibitsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log(userExhibitsList, "returned from Firebase");
                setLists(userExhibitsList);
            } catch (error) {
                console.error("Error fetching lists: ", error);
            }
        };

        if (currentUser && currentUser.email) {
            getLists();
        }
    }, [currentUser]);

    return (
        <div>
            <h1>Test Page</h1>
            <ul>
                {lists.map((list, index) => (
                    <li key={index}>
                        <strong>Exhibit Name:</strong> {list.exhibit_name}
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestPage;

