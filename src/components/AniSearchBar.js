import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import useAniSensei from "../hooks/useAniSensei";


const AniSearchBar = () => {
    const searchText = useRef(null);
    const langCode = useSelector((state) => state.config.lang);
    const handleSearch = useAniSensei(searchText);

    const preBuiltQueries = lang[langCode].preBuiltQueries;

    const handlePreBuiltQueryClick = (query) => {
        searchText.current.value = query;
        handleSearch();
    };

    return (
        <div className="w-screen pt-[10%] flex flex-col items-center ">
            <form className=" w-full md:w-3/4 grid grid-cols-12 p-6" onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text" placeholder={lang[langCode].AniSearchPlaceholder}
                    className=" py-2 col-span-9 border-2 border-blue-300 rounded-md mx-2 text-center focus:bg-blue-100 " />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  col-span-3 rounded">{
                        lang[langCode].search
                    }</button>
            </form>
            <div className="w-full md:w-1/2 mt-4 grid grid-cols-2 gap-4">
                {preBuiltQueries.map((query) => (
                    <button
                        key={query.query}
                        onClick={() => handlePreBuiltQueryClick(query.query)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded shadow text-center"
                    >
                        {query.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AniSearchBar;
