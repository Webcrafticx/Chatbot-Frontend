// Home.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout";
import Chatbot from "../../components/home/section/Chatbot";
import API_BASE_URL from "../../config/api";
import Details from "../../components/home/section/Details";

const Home = () => {
    const { slug } = useParams();
    const [slugData, setSlugData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch slug data from API
    const fetchSlugData = async () => {
        if (!slug) {
            console.log("No slug detected - using default behavior");
            setLoading(false);
            return;
        }

        console.log("Slug detected:", slug);

        try {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
            };

            // Add authorization header if token exists
            if (token) {
                headers["Authorization"] = `Token ${token}`;
            }

            const response = await fetch(
                `${API_BASE_URL}/chat/${slug}/display`,
                {
                    headers: headers,
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.status}`
                );
            }

            const data = await response.json();
            console.log("Slug API Response:", data);
            setSlugData(data);
        } catch (error) {
            console.error("Error fetching slug data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlugData();
    }, [slug]);

    // Modern loading skeleton
    if (loading) {
        return (
            <HomeLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header skeleton */}
                        <div className="mb-8">
                            <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-4 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8">
                            {/* Left content skeleton */}
                            <div className="flex-1 space-y-6">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                                    >
                                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right chatbot skeleton */}
                            <div className="xl:w-96">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="flex gap-3">
                                                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    // Modern error state
    if (error && !slugData) {
        return (
            <HomeLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                            <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full border border-gray-200">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-10 h-10 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Unable to Load
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    We encountered an error while loading the
                                    data:
                                </p>
                                <p className="text-red-500 font-medium mb-6 bg-red-50 py-2 px-4 rounded-lg">
                                    {error}
                                </p>
                                <button
                                    onClick={fetchSlugData}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Responsive Grid Layout */}
                    <div className="flex flex-col xl:flex-row gap-8">
                        {/* Left Content - Company Details */}
                        <div className="flex-1">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <Details slugData={slugData} />
                            </div>
                        </div>

                        {/* Right Sidebar - Chatbot */}

                        <div className="sticky top-8">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                                <Chatbot slugData={slugData} slug={slug} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Home;
