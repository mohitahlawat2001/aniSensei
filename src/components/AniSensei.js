import React from "react";
import AniMovieSuggestion from "./AniMovieSuggestion";
import AniSearchBar from "./AniSearchBar";
import HomePageWallpaper from '../assets/wall4.png'

const AniSensei = () => {
  return (
    <div >
      <div className="fixed -z-10 ">
        <img
          src={HomePageWallpaper}
          alt="background"
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="pt-[30%] md:pt-[10%] ">
        <AniSearchBar />
        <AniMovieSuggestion />
      </div>
    </div>
  );
}

export default AniSensei;