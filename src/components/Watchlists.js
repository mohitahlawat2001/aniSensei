import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createCustomWatchlist, deleteCustomWatchlist, loadWatchlistsFromFirebase } from '../utils/watchlistsSlice';
import { database } from '../utils/firebase';
import { onValue, ref, set, remove } from 'firebase/database';
import Header from './Header';
import MovieList from './MovieList';
import HomePageWallpaper from '../assets/wall4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Watchlists = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { watchlists, customWatchlists } = useSelector((state) => state.watchlists);
    const [newWatchlistName, setNewWatchlistName] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        if (!user?.uid) return;

        const dbRef = ref(database, 'watchlists/' + user.uid);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                dispatch(loadWatchlistsFromFirebase(data));
            }
        });
    }, [user?.uid, dispatch]);

    const handleCreateWatchlist = async () => {
        if (!newWatchlistName.trim() || !user?.uid) return;

        const id = Date.now().toString();
        const newWatchlist = {
            id,
            name: newWatchlistName.trim(),
            movies: {}
        };

        dispatch(createCustomWatchlist(newWatchlist));

        // Save to Firebase
        try {
            const dbRef = ref(database, `watchlists/${user.uid}/customWatchlists/${id}`);
            await set(dbRef, newWatchlist);
        } catch (error) {
            console.error('Error creating watchlist:', error);
        }

        setNewWatchlistName('');
        setShowCreateForm(false);
    };

    const handleDeleteWatchlist = async (watchlistId) => {
        if (!user?.uid) return;

        dispatch(deleteCustomWatchlist({ watchlistId }));

        // Remove from Firebase
        try {
            const dbRef = ref(database, `watchlists/${user.uid}/customWatchlists/${watchlistId}`);
            await remove(dbRef);
        } catch (error) {
            console.error('Error deleting watchlist:', error);
        }
    };

    const allWatchlists = { ...watchlists, ...customWatchlists };

    return (
        <div>
            <Header />
            <div className="fixed w-full h-full -z-10">
                <img
                    src={HomePageWallpaper}
                    alt="background"
                    className="w-full h-screen object-cover"
                />
            </div>
            
            <div className="w-4/5 bg-white py-8 md:p-8 mt-32 md:mt-24 mx-auto bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">My Watchlists</h1>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Create New List
                    </button>
                </div>

                {showCreateForm && (
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter watchlist name..."
                                value={newWatchlistName}
                                onChange={(e) => setNewWatchlistName(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleCreateWatchlist()}
                            />
                            <button
                                onClick={handleCreateWatchlist}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewWatchlistName('');
                                }}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-8">
                    {Object.values(allWatchlists).map((watchlist) => (
                        <div key={watchlist.id} className="border-b border-gray-200 pb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    {watchlist.name}
                                </h2>
                                {customWatchlists[watchlist.id] && (
                                    <button
                                        onClick={() => handleDeleteWatchlist(watchlist.id)}
                                        className="text-red-600 hover:text-red-700 p-2 transition-colors"
                                        title="Delete watchlist"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </div>
                            
                            {watchlist.movies && Object.keys(watchlist.movies).length > 0 ? (
                                <MovieList 
                                    title="" 
                                    movieList={Object.values(watchlist.movies)} 
                                />
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    No movies in this watchlist yet. Add movies from the browse page!
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Watchlists;