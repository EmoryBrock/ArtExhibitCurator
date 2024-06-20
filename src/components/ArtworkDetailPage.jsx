// ArtworkDetailPage.jsx

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchResultsBySourceAndId } from '../utils'
import { db } from '../firebase'
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../components/auth/AuthContext.jsx'
import AddArtwork from './AddArtwork'

export default function ArtworkDetailPage() {
    const { sourceId } = useParams()
    const { currentUser } = useAuth()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [collections, setCollections] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)
    const [selectedCollection, setSelectedCollection] = useState('')

    useEffect(() => {
        if (!sourceId) {
            console.error("sourceId is undefined")
            return
        }

        const fetchData = async () => {
            try {
                const source = sourceId.match(/[a-zA-Z]+/)[0]
                const id = sourceId.match(/\d+/)[0]
                const result = await fetchResultsBySourceAndId(source, id)
                setData(result)
            } catch (error) {
                console.error("Error fetching data:", error)
                setError(error)
            }
        }

        fetchData()
    }, [sourceId])

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                if (!currentUser) return

                const userCollectionsRef = collection(db, "ArtCollection", currentUser.email)
                const querySnapshot = await getDocs(userCollectionsRef)

                const collectionNames = querySnapshot.docs.map(doc => doc.id)

                setCollections(collectionNames)
            } catch (error) {
                console.error("Error fetching collections:", error)
                setCollections([])
            }
        }

        fetchCollections()
    }, [currentUser])

    const addToCollection = async () => {
        if (!currentUser) {
            alert("You need to be logged in in order to add this artwork")
            return
        }

        if (!selectedCollection) {
            alert("Please select a collection first")
            return
        }

        const artworkData = data[0] // Assuming you want to add the first item in the data array

        try {
            const artworkRef = doc(db, `ArtCollection/${currentUser.email}/${selectedCollection}/${artworkData.source}${sourceId}`)
            const artworkSnap = await getDoc(artworkRef)

            if (artworkSnap.exists()) {
                alert(`Artwork already exists in the collection ${selectedCollection}`)
            } else {
                await setDoc(artworkRef, artworkData)
                alert(`Artwork added to collection ${selectedCollection}`)
            }
        } catch (error) {
            console.error("Error adding/updating artwork to/in collection:", error)
            alert("Failed to add/update artwork in collection.")
        }
    }

    const handleNewCollection = async () => {
        const newCollection = prompt("Enter new collection name:")
        if (newCollection) {
            try {
                const collectionRef = doc(db, `ArtCollection/${currentUser.email}/${newCollection}`)
                await setDoc(collectionRef, { createdAt: new Date() })

                setCollections([...collections, newCollection])
                setSelectedCollection(newCollection)
                setShowOverlay(false)
            } catch (error) {
                console.error("Error creating new collection:", error)
                alert("Failed to create new collection.")
            }
        }
    }

    const openOverlay = () => {
        setShowOverlay(true)
    }

    const closeOverlay = () => {
        setShowOverlay(false)
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!data) {
        return <div>Loading...</div>
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
            {/* <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
            >
                <option value="" disabled>Select a collection</option>
                {collections.map((collection) => (
                    <option key={collection} value={collection}>
                        {collection}
                    </option>
                ))}
            </select> */}
            <button onClick={openOverlay}>Add to collection</button>
            
            {/* Render the AddArtwork overlay conditionally */}
            {showOverlay && (
                <AddArtwork
                    addToCollection={addToCollection}
                    handleNewCollection={handleNewCollection}
                    collections={collections}
                    setSelectedCollection={setSelectedCollection}
                    onClose={closeOverlay}
                />
            )}
        </div>
    )
}
