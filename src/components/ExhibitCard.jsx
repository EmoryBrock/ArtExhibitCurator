import React from "react";
import { Link } from "react-router-dom";
import ArtworkListCard from "./ArtworkListCard";

export default function ExhibitCard({
  collection,
  canEdit,
  handleRemoveArtwork,
  handleRemoveExhibit,
}) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex items-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {collection.exhibit_name}
          </h2>
          {canEdit && (
            <button
              className="group relative ml-6 w-42 overflow-hidden rounded-xl bg-red-500 text-sm font-bold text-white"
              onClick={() => handleRemoveExhibit(collection.id)}
            >
              Remove Exhibit
              <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          )}
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(collection.artworks) && collection.artworks.length > 0 ? (
            collection.artworks.map((artwork, artworkIndex) => (
              <li key={artworkIndex}>
                <Link to={`/artwork/${artwork.source}${artwork.id}`}>
                  <ArtworkListCard result={artwork} />
                </Link>
                {canEdit && (
                  <button
                    className="group relative mt-5 h-10 w-42 overflow-hidden rounded-xl bg-red-500 text-sm font-bold text-white"
                    onClick={() =>
                      handleRemoveArtwork(
                        collection.id,
                        `${artwork.source}${artwork.id}`
                      )
                    }
                  >
                    Remove from Exhibit
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                  </button>
                )}
              </li>
            ))
          ) : (
            <li>No artworks available</li>
          )}
        </ul>
      </div>
    </section>
  );
}
