import React, { useState } from 'react';
import useUserCollections from '../hooks/useUserCollections';

export default function AddArtwork({ addToCollection, handleNewCollection, setSelectedCollection, onClose }) {
    const [selectedCollectionLocal, setSelectedCollectionLocal] = useState('');
    const collections = useUserCollections();

    const handleSelectChange = (e) => {
        setSelectedCollectionLocal(e.target.value);
        setSelectedCollection(e.target.value);
    };

    return (
        <div className="overlay">
            <div className="popup">
                <h2>Add Artwork to Collection</h2>
                <select
                    value={selectedCollectionLocal}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select a collection</option>
                    {collections.map((collection) => (
                        <option key={collection.id} value={collection.id}>
                            {collection.exhibit_name}
                        </option>
                    ))}
                </select>
                <button onClick={addToCollection}>To existing collection</button>
                <button onClick={handleNewCollection}>Create new collection</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
