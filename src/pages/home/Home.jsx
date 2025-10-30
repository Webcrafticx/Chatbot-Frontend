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

    // Show loading state
    if (loading) {
        return (
            <HomeLayout>
                <div className="min-h-screen py-8 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    // Show error state
    if (error && !slugData) {
        return (
            <HomeLayout>
                <div className="min-h-screen py-8 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center text-red-600">
                                <p>Error loading data: {error}</p>
                                <button
                                    onClick={fetchSlugData}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Retry
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
            <div className="min-h-screen">
                <div className="max-w-screen mx-auto">
                    {/* Main Content Layout */}
                    <div className="flex flex-col lg:flex-row ">
                        {/* Left Side - Company Details (70%) */}
                        <div className="w-full lg:w-7/10">
                            <Details slugData={slugData} />
                        </div>

                        {/* Right Side - Chatbot (30%) */}
                        <div className="w-full lg:w-3/10">
                            <div className="sticky top-8">
                                {/* Same Chatbot component used for both desktop and mobile */}
                                <Chatbot slugData={slugData} slug={slug} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Floating Chatbot - Hidden on desktop */}
                <div className="block lg:hidden">
                    <Chatbot slugData={slugData} slug={slug} />
                </div>
            </div>
        </HomeLayout>
    );
};

export default Home;
