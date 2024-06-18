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
          className=""
        />
      </div>
            <AniSearchBar />
            <AniMovieSuggestion />
        </div>
    );
    }

export default AniSensei;