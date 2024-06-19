import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import useAniSensei from "../hooks/useAniSensei";


const AniSearchBar = ()=>{
    const searchText = useRef(null);
    const langCode = useSelector((state) => state.config.lang);
    const handleSearch =  useAniSensei(searchText);
    
    return(
        <div className="w-screen pt-[10%] flex justify-center ">
            <form className=" w-full md:w-1/2 grid grid-cols-12 p-6" onSubmit={(e) => e.preventDefault()}>
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
        </div>
    )
}

export default AniSearchBar;