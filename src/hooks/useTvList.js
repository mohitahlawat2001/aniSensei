import { useSelector, useDispatch } from 'react-redux';
import { API_OPTIONS, TV_LIST } from '../utils/constants';
import { addPopularTv, addTopRatedTv, addAiringTodayTv, addOnTheAirTv } from '../utils/tvSlice';
import { useEffect } from 'react';

const useTvList = (type) => {
    const tv = useSelector((state) => state.tv);
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'popular' && tv.popularTv) {
            return;
        } else if (type === 'top_rated' && tv.topRatedTv) {
            return;
        } else if (type === 'airing_today' && tv.airingTodayTv) {
            return;
        } else if (type === 'on_the_air' && tv.onTheAirTv) {
            return;
        }
        getTvList();
    }, []);

    const getTvList = async () => {
        try {
            const response = await fetch(TV_LIST(type), API_OPTIONS);
            const data = await response.json();
            if (type === 'popular') {
                dispatch(addPopularTv(data.results));
            } else if (type === 'top_rated') {
                dispatch(addTopRatedTv(data.results));
            } else if (type === 'airing_today') {
                dispatch(addAiringTodayTv(data.results));
            } else if (type === 'on_the_air') {
                dispatch(addOnTheAirTv(data.results));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default useTvList;