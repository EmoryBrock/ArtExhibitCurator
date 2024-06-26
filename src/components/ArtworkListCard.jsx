import React from "react";

// CSS code by Kouakou Marius - https://tailwindcomponents.com/component/airbnb-card

export default function ArtworkListCard({ result }) {
  return (
    <article className="block rounded-lg bg-white shadow-lg">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img
          className="rounded-t-lg w-full h-64 object-cover"
          src={result.imageSmall}
          alt={result.title}
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
      </div>

      <div className="p-4">
        <h2 className="mb-2 text-lg font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          {result.title}
        </h2>
        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
          by {result.artistName}
        </p>
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-200">
          {result.date}
        </p>
        <p className="text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          click to view more info
        </p>
      </div>
    </article>
  );
}

