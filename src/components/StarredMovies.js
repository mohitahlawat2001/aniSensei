import { database } from "../utils/firebase";
import { onValue,ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MovieList from "./MovieList";
// import { addStarredMovies } from "../utils/starredSlice";

const StarredMovies = () => {
    const starredMovies = useSelector((state) => state.starred.starredMovies);
    const [starredMovie, setStarredMovie] = useState(starredMovies);
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
            }
        });

    }, []);
    return (
        <div>
        <Header/>
        <h2 className="text-5xl pt-[10%] font-bold text-center">Starred Movies</h2>
        <MovieList title="Starred Movies" movieList={starredMovie} />
        </div>
    );
    };

export default StarredMovies;