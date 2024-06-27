import React, { useState, useEffect } from "react";
import useUserCollections from "../hooks/useUserCollections";
import { handleNewCollection } from "../utils";
import CollectionForm from "./CollectionForm";

export default function AddArtwork({
  addToCollection,
  setSelectedCollection,
  onClose,
  currentUser,
  sourceId,
  setShowOverlay
}) {
  const [selectedCollectionLocal, setSelectedCollectionLocal] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const { collections } = useUserCollections(currentUser);

  useEffect(() => {
    if (collections.length > 0 && !selectedCollectionLocal) {
      setSelectedCollectionLocal(collections[0].id);
      setSelectedCollection(collections[0].id);
    }
  }, [collections, selectedCollectionLocal, setSelectedCollection]);

  const handleSelectChange = (e) => {
    setSelectedCollectionLocal(e.target.value);
    setSelectedCollection(e.target.value);
  };

  const handleNewCollectionClick = async () => {
    await handleNewCollection(
      newCollectionName,
      setSelectedCollection,
      setShowOverlay,
      currentUser,
      sourceId
    );
    setNewCollectionName("");
  };

  const selectOptions = collections.map((col, index) => ({
    key: index,
    value: col.id,
    label: col.exhibit_name, // Adjust this according to your collection object structure
  }));

  return (
    <div className="overlay">
      <div className="popup relative rounded-lg bg-white p-8 shadow-xl">
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="m-2 pb-4 text-lg text-gray-800 text-center">
          Add Artwork to Collection
        </h2>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            <CollectionForm
              id="newCollection"
              title="Create a New Collection"
              description="Enter the collection name below"
              inputId="newCollectionName"
              inputValue={newCollectionName}
              onInputChange={(e) => setNewCollectionName(e.target.value)}
              inputPlaceholder="Enter new collection name"
              buttonText="Create Collection"
              onButtonClick={handleNewCollectionClick}
            />

            {collections.length > 0 && (
              <CollectionForm
                id="currentCollection"
                title="Add to Existing Collection"
                selectValue={selectedCollectionLocal}
                onSelectChange={handleSelectChange}
                selectOptions={selectOptions}
                buttonText="Add Artwork"
                onButtonClick={addToCollection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
