import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchResultsBySourceAndId } from '../utils';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../components/auth/AuthContext.jsx';
import AddArtwork from './AddArtwork';
import useUserCollections from '../hooks/useUserCollections';

export default function ArtworkDetailPage() {
    const { sourceId } = useParams();
    const { currentUser } = useAuth();
    const collections = useUserCollections(); 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState('');

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

    const addToCollection = async () => {
        if (!currentUser) {
            alert("You need to be logged in in order to add this artwork");
            return;
        }
    
        if (!selectedCollection) {
            alert("Please select a collection first");
            return;
        }
    
        const artworkID = `${sourceId}`;
    
        try {
            const collectionDocRef = doc(db, `ArtExhibit/${selectedCollection}`);
            const collectionDocSnap = await getDoc(collectionDocRef);
    
            if (collectionDocSnap.exists()) {
                const existingArtworkIDs = collectionDocSnap.data().artworkIDs || [];
    
                if (existingArtworkIDs.includes(artworkID)) {
                    alert(`Artwork already exists in the collection`);
                } else {
                    const updatedArtworkIDs = [...existingArtworkIDs, artworkID];
                    await setDoc(collectionDocRef, { artworkIDs: updatedArtworkIDs }, { merge: true });
                    alert(`Artwork added to collection`);
                }
            } else {
                alert("Collection does not exist. Please create it first.");
            }
        } catch (error) {
            console.error("Error adding/updating artwork to/in collection:", error);
            alert("Failed to add/update artwork in collection.");
        }
    };

    const handleNewCollection = async () => {
        const newCollection = prompt("Enter new collection name:");
        if (newCollection) {
            try {
                const collectionRef = doc(db, `ArtExhibit/${newCollection}`);
                await setDoc(collectionRef, {
                    createdAt: new Date(),
                    exhibit_name: newCollection,
                    owner: currentUser.email,
                    artworkIDs: [sourceId],
                });

                setSelectedCollection(newCollection);
                setShowOverlay(false);
                alert(`New collection '${newCollection}' created and artwork added`);
            } catch (error) {
                console.error("Error creating new collection:", error);
                alert("Failed to create new collection.");
            }
        }
    };

    const openOverlay = () => {
        setShowOverlay(true);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

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
            <button onClick={openOverlay}>Add to collection</button>
            
            {/* Render the AddArtwork overlay conditionally */}
            {showOverlay && (
                <AddArtwork
                    addToCollection={addToCollection}
                    handleNewCollection={handleNewCollection}
                    collections={collections.map(col => col.id)} // Adjust if collections need different formatting
                    setSelectedCollection={setSelectedCollection}
                    onClose={closeOverlay}
                />
            )}
        </div>
    );
}
