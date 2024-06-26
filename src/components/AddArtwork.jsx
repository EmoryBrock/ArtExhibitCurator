import React, { useState } from "react";
import useUserCollections from "../hooks/useUserCollections";
import { handleNewCollection } from "../utils";

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
  const collections = useUserCollections();

  const sortedCollections = collections
    .slice()
    .sort((a, b) => a.exhibit_name.localeCompare(b.exhibit_name));

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
  };

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
            <div
              id="newCollection"
              className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:order-last sm:px-8 lg:p-12 flex flex-col justify-center items-center"
            >
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Create a New Collection
                </h2>
                <p className="text-sm text-gray-800">
                  Enter the collection name below
                </p>
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="newCollectionName" className="sr-only">
                    New Collection Name
                  </label>
                  <input
                    type="text"
                    id="newCollectionName"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Enter new collection name"
                    className="w-full rounded-md border-gray-600 pe-10 shadow-sm sm:text-sm py-4"
                  />
                </div>
              </div>
              <button
                className="inline-block rounded border border-indigo-600 px-12 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 mt-4"
                onClick={handleNewCollectionClick}
              >
                Create Collection
              </button>
            </div>

            <div
              id="currentCollection"
              className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12 flex flex-col justify-center items-center"
            >
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Add to Existing Collection
                </h2>
              </div>
              <select
                value={selectedCollectionLocal}
                onChange={handleSelectChange}
                className="w-full rounded-md border-gray-600 shadow-sm sm:text-sm py-4 mt-4"
              >
                <option value="" disabled>
                  Select a collection
                </option>
                {sortedCollections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.exhibit_name}
                  </option>
                ))}
              </select>
              <button
                className="inline-block rounded border border-indigo-600 px-12 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 mt-4"
                onClick={addToCollection}
              >
                Add Artwork
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}