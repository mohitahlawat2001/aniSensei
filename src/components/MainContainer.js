import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies =  useSelector((state) => state.movies?.nowPlayingMovies)
    if(!movies) return ;
    // console.log(movies[0]);
    const mainMovie = movies[0];
    const {original_title, overview ,id } = mainMovie;
    // console.log(original_title, overview);

    return (
        <div className="bg-black pt-[30%] md:pt-0 ">
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movie_id={id}/>
        </div>
    );
    }

export default MainContainer;