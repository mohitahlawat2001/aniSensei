import gemini from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addResultMovie } from "../utils/aniSenseiSlice";
import { useDispatch } from "react-redux";

const useAniSensei = (searchText) => {
  const dispatch = useDispatch();

  const searchMovieTMDB = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`, API_OPTIONS)
    const data = await response.json();
    return data.results;
  }


  const handleSearch = async () => {
    // console.log(searchText.current.value);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "you are anime recommendation engine , give a single line of 10 anime seperated by comma , of this topic" + searchText.current.value;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);

    const arr = text.split(", ").map((item) => item.trim());
    console.log(arr);
    const promiseArray = arr.map((item) => searchMovieTMDB(item));
    const results = await Promise.all(promiseArray);
    dispatch(addResultMovie({ resultName: arr, resultMovie: results }));

  };
  return handleSearch;
}


export default useAniSensei;