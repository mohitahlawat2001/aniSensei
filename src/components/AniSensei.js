import AniMovieSuggestion from "./AniMovieSuggestion";
import AniSearchBar from "./AniSearchBar";
import HomePageWallpaper from '../assets/wall4.png'

const AniSensei = () => {
    return (
        <div >
           <div className="absolute -z-10 ">
        <img
          src={HomePageWallpaper}
          alt="background"
          className=""
        />
      </div>
            <AniSearchBar />
            <AniMovieSuggestion />
        </div>
    );
    }

export default AniSensei;