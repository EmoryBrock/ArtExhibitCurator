// ArtworkDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchResultsBySourceAndId } from "../utils.js";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/auth/AuthContext.jsx";
import AddArtwork from "./AddArtwork";
import useUserCollections from "../hooks/useUserCollections";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function ArtworkDetailPage() {
  const { sourceId } = useParams();
  const { currentUser } = useAuth();

  // Use destructuring to get collections, loading, and error from useUserCollections
  const { collections, loading, error: collectionsError } = useUserCollections();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");

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
          await setDoc(
            collectionDocRef,
            { artworkIDs: updatedArtworkIDs },
            { merge: true }
          );
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

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  if (error || collectionsError) {
    return <div>Error: {error?.message || collectionsError?.message}</div>;
  }

  if (!data || loading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-first lg:h-full">
            <img
              alt={data[0].title}
              src={data[0].imageSmall}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="lg:py-24 lg:order-last">
            <h2 className="text-3xl font-bold sm:text-4xl">{data[0].title}</h2>
            <p className="mt-4 text-gray-600 text-xl">
              by {data[0].artistName}
            </p>
            <p className="pt-8 text-gray-600 text-xl">
              This <span className="font-bold">{data[0].type}</span> was created
              in <span className="font-bold">{data[0].date} </span>using{" "}
              <span className="font-bold">{data[0].medium}</span>.
            </p>
            <button
              onClick={openOverlay}
              className='mt-8 inline-block rounded bg-indigo-600 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400'
            >
              Add to collection
            </button>

            {/* Render the AddArtwork overlay conditionally */}
            {showOverlay && (
              <AddArtwork
                addToCollection={addToCollection}
                collections={collections.map((col) => col.id)}
                setSelectedCollection={setSelectedCollection}
                onClose={closeOverlay}
                currentUser={currentUser}
                sourceId={sourceId}
                setShowOverlay={setShowOverlay}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
