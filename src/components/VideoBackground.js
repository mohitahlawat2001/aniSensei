import React from 'react';
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";


const VideoBackground = ({ movie_id }) => {

  const videoTrailer = useSelector((state) => state.movies?.trailerVideo);
  useMovieTrailer(movie_id);
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video "
        src={"https://www.youtube.com/embed/" + videoTrailer?.key + "?autoplay=1&mute=1&loop=10"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share, fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default VideoBackground;
