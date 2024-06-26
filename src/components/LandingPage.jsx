import React from "react";
import bgImage from "../assets/img/museum-show-painting-pictures-art-gallery-727235-pxherecom.jpg"

export default function LandingPage() {
    return (
        <div className="flex bg-white h-[600px]">
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                Welcome to <span className="text-indigo-600">ArtiQuest</span>
              </h2>
              <p className="mt-20 text-lg text-gray-500 md:text-base">
                ArtiQuest is an art exhibit curator that aids you in your quest to
                explore the vast world of art. Here you will be able to view artworks
                across different disciplines, eras and cultures. ArtiQuest allows to you create your own exhibit by saving artworks
                your exhibit collection. To get started on your journey, click on the "search" text above.
              </p>
              {/* <div className="flex justify-center lg:justify-start mt-6">
                <a className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" href="#">Get Started</a>
                <a className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">Learn More</a>
              </div> */}
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-1/2 clip-path-[polygon(50%_0,_100%_0%,_100%_100%,_0_100%)]"
          >
            <div
              className="h-full object-cover bg-[url('https://c.pxhere.com/photos/81/0f/pictures_gallery_show_art-727235.jpg!d')]"
            >
              <div className="h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
      );
    }