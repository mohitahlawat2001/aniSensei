import React from 'react';
export const MovieShimmer = () => {
    return (
        <div className="container mx-auto px-4 pt-[6%]">
            <div className="shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row animate-pulse">
                    <div className="md:w-1/3 w-full h-80 bg-gray-300 rounded-lg"></div>
                    <div className="px-4 md:w-2/3">
                        <div className="bg-blue-300 p-4 text-white rounded-lg mb-4">
                            <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-4"></div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                            </div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                            <div className="inline-block mt-4 h-10 bg-gray-300 rounded-lg w-1/4"></div>
                        </div>
                        <div className="bg-blue-300 px-4 text-white rounded-lg my-2 h-40"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

