import AniMovieSuggestion from "./AniMovieSuggestion";
import AniSearchBar from "./AniSearchBar";

const AniSensei = () => {
    return (
        <div className='p-48 '>
            <AniSearchBar />
            <AniMovieSuggestion />
        </div>
    );
    }

export default AniSensei;