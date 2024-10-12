import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const VideoTitle = ({ title, overview, movie_id }) => {
    return <div className='px-6 md:px-24 absolute pt-[15%]  aspect-video bg-gradient-to-r from-black text-white '>
        <h1 className="font-bold text-2xl md:text-3xl py-2 " >{title}</h1>
        <p className=" hidden md:inline-block text-lg w-1/3 py-2" >{overview}</p>
        <div>
            <Link to={`/movie/${movie_id}`}>
                <button className='m-2 py-2 md:py-4 text-center px-6 md:px-12  w-auto text-lg bg-blue-500 text-white  hover:opacity-80 hover:text-black rounded-xl'>
                    <FontAwesomeIcon icon={faPlay} className="mx-2" />
                    Play
                </button>
            </Link>
            <Link to={`/movie/${movie_id}`}>
                <button className=' hidden md:inline-block m-2 p-4 text-center px-12 w-auto text-lg bg-blue-200 text-black opacity-75 hover:bg-blue-500 hover:text-white rounded-xl'>
                    <FontAwesomeIcon icon={faCircleInfo} className="mx-2" />
                    More Info
                </button>
            </Link>
        </div>
    </div>
}

export default VideoTitle;