import React, { useState, useEffect } from "react"
import useUserCollections from "../hooks/useUserCollections"
import { removeArtworkFromCollection } from '../utils' 
import { Link } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from '../components/auth/AuthContext'

export default function TestPage() {
  const initialCollections = useUserCollections()
  const [collections, setCollections] = useState(initialCollections)
  const { currentUser } = useAuth()
  console.log(currentUser.email, "current email" )
  console.log(currentUser.displayName, "current user info from Auth");

  useEffect(() => {
    const sortedCollections = [...initialCollections].sort((a, b) => 
      a.exhibit_name.localeCompare(b.exhibit_name)
    );
    setCollections(sortedCollections);
  }, [initialCollections]);

  const handleRemoveExhibit = async (id) => {
    console.log(id, "input arg collection id")
    const exhibitDoc = doc(db, "ArtExhibit", id)
    await deleteDoc(exhibitDoc)

     // Update the state to trigger a re-render
    setCollections(prevCollections => 
      prevCollections.filter(collection => collection.id !== id)
    )
  }
  


  const handleRemoveArtwork = async (collectionId, artworkID) => {
    try {
      await removeArtworkFromCollection(collectionId, artworkID)
      console.log(`Artwork ${artworkID} successfully removed from collection ${collectionId}`)
      
      // Update the state to trigger a re-render
      setCollections(prevCollections => 
        prevCollections.map(collection => 
          collection.id === collectionId 
            ? { ...collection, artworks: collection.artworks.filter(artwork => `${artwork.source}${artwork.id}` !== artworkID) }
            : collection
        )
      )
    } catch (error) {
      console.error("Failed to remove artwork:", error)
    }
  }

  return (
    <div>
      <p> this is my {currentUser.displayName}</p>
      <h1>Test Page My Collection draft</h1>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <strong>Exhibit Name:</strong> {collection.exhibit_name} <button onClick={() => handleRemoveExhibit(collection.id)}>Remove Exhibit</button>
            <br />
            <ul>
              {Array.isArray(collection.artworks) && collection.artworks.length > 0 ? (
                collection.artworks.map((artwork, artworkIndex) => (
                  <li key={artworkIndex}>
                    <strong>Title:</strong> {artwork.title}
                    <br />
                    <strong>Artist:</strong> {artwork.artistName || "Unknown Artist"}
                    <br />
                    <Link to={`/artwork/${artwork.source}${artwork.id}`}>
                    
                    <img src={artwork.imageSmall} alt={artwork.title} />
                  </Link>
                    <button onClick={() => handleRemoveArtwork(collection.id, `${artwork.source}${artwork.id}`)}>Remove</button>
                  </li>
                ))
              ) : (
                <li>No artworks available</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
