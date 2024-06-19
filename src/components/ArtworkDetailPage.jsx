import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchResultsBySourceAndId } from '../utils';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { useAuth } from '../components/auth/AuthContext.jsx';

export default function ArtworkDetailPage() {
    const { sourceId } = useParams();
    const { currentUser } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [collections, setCollections] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState('');

    const fetchCollections = async (userEmail) => {
        const docRef = doc(db, "ArtCollection", userEmail);
        const collections = await docRef.listCollections();
        const collectionNames = collections.map(col => col.id);
   
        console.log(collectionNames, "collections returned from Firestore");
        return collectionNames;
    };

    useEffect(() => {
        if (!sourceId) {
            console.error("sourceId is undefined");
            return;
        }

        const fetchData = async () => {
            try {
                const source = sourceId.match(/[a-zA-Z]+/)[0];
                const id = sourceId.match(/\d+/)[0];
                const result = await fetchResultsBySourceAndId(source, id);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            }
        };

        fetchData();
    }, [sourceId]);

    useEffect(() => {
        if (currentUser) {
            fetchCollections(currentUser.email).then(setCollections);
        }
    }, [currentUser]);

    const addToCollection = async () => {
        if (!currentUser) {
            alert("You need to be logged in in order to add this artwork");
            return;
        }

        if (!selectedCollection) {
            alert("Please select a collection first");
            return;
        }

        const artworkData = data[0]; // Assuming you want to add the first item in the data array

        try {
            const docRef = doc(db, `ArtCollection/${currentUser.email}/${selectedCollection}/${artworkData.source}${artworkData.id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                alert(`Artwork already exists in the collection ${selectedCollection}`);
            } else {
                await setDoc(docRef, artworkData);
                alert(`Artwork added to collection ${selectedCollection}`);
            }
        } catch (error) {
            console.error("Error adding/updating artwork to/in collection:", error);
            alert("Failed to add/update artwork in collection.");
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleNewCollection = () => {
        const newCollection = prompt("Enter new collection name:");
        if (newCollection) {
            setCollections([...collections, newCollection]);
            setSelectedCollection(newCollection);
            setShowPopup(false);
        }
    };

    return (
        <div>
            <h1>{data[0].title}</h1>
            <img
                src={data[0].imageSmall}
                alt={data[0].title}
                className='w-full h-[200px] object-cover rounded-t lg'
            />
            <p>{data[0].artName}</p>
            <p>{data[0].type}</p>
            <p>{data[0].medium}</p>
            <p>{data[0].date}</p>
            <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
            >
                <option value="" disabled>Select a collection</option>
                {collections.map((collection) => (
                    <option key={collection} value={collection}>
                        {collection}
                    </option>
                ))}
            </select>
            <button onClick={addToCollection}>Add to existing collection</button>
            <button onClick={handleNewCollection}>Add a new collection</button>
        </div>
    );
}
