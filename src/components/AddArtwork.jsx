// AddArtwork.jsx

import React, { useState } from 'react'

export default function AddArtwork({ addToCollection, handleNewCollection, collections, setSelectedCollection, onClose }) {
    const [selectedCollection, setSelectedCollectionLocal] = useState('')

    const handleSelectChange = (e) => {
        setSelectedCollectionLocal(e.target.value)
        setSelectedCollection(e.target.value)
    }

    return (
        <div className="overlay">
            <div className="popup">
                <h2>Add Artwork to Collection</h2>
                <select
                    value={selectedCollection}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select a collection</option>
                    {collections.map((collection) => (
                        <option key={collection} value={collection}>
                            {collection}
                        </option>
                    ))}
                </select>
                <button onClick={addToCollection}>To existing collection</button>
                <button onClick={handleNewCollection}>Create new collection</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
