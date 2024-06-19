import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchResultsBySourceAndId } from '../utils';
import { db } from '../firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../components/auth/AuthContext.jsx'

export default function ArtworkDetailPage() {
    const { sourceId } = useParams();
    const { currentUser } = useAuth()
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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
            console.error("User not logged in");
            return;
        }

        const colName = "ArtworkCollection1"; // Name of Exhibit Collection
        const artworkData = data[0]; // Assuming you want to add the first item in the data array

        try {
            const docRef = doc(db, `ArtCollection/${currentUser.email}/${colName}/${artworkData.source}${artworkData.id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await updateDoc(docRef, artworkData);
                alert("Artwork updated in collection!");
            } else {
                await setDoc(docRef, artworkData);
                alert("Artwork added to collection!");
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
            <button onClick={addToCollection}>Add to collection</button>                
        </div>
    );
}
