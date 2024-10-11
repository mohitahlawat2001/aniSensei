import { database } from "../utils/firebase";
import { onValue,ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MovieList from "./MovieList";
import HomePageWallpaper from "../assets/wall4.png";

// import { addStarredMovies } from "../utils/starredSlice";

const StarredMovies = () => {
    const starredMovies = useSelector((state) => state.starred.starredMovies);
    const [starredMovie, setStarredMovie] = useState(Object.values(starredMovies));
    // const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    useEffect(() => {
        const dbRef = ref(database,'users/'+user?.uid);
        onValue(dbRef,(snapshot)=>{
            const data = snapshot.val();
            if(data){
                const movies = Object.values(data);
                console.log(movies);
                // dispatch(addStarredMovies(movies));
        
            setStarredMovie(movies);
                
            }else{
            
                setStarredMovie([]);}
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
        <Header/>
    <div className="fixed w-full h-full -z-10">
    <img
      src={HomePageWallpaper}
      alt="background"
      className="w-full h-screen object-cover"
    />
  </div>
        <div className=" w-2/3 bg-white py-[30%] md:p-[2%] mt-[45%] md:my-[20%] mx-[10%] md:mx-[15%] flex justify-center flex-col absolute bg-opacity-70 ">

        <h2 className="text-5xl  font-bold text-center">Starred Movies</h2>
        <MovieList title="" movieList={starredMovie} />
        </div>
        </div>
    );
    };

export default StarredMovies;