// Home.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";

import HomeLayout from "../../layout/HomeLayout";
import Chatbot from "../../components/home/section/Chatbot";
import API_BASE_URL from "../../config/api";
import Details from "../../components/home/section/Details";
import ParticleBackground from "../../pages/landingpage/particelBackground";
import MagneticElements from "../../pages/landingpage/magneticElement";

const Home = () => {
    const { slug } = useParams();
    const [slugData, setSlugData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSlugData = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/chat/${slug}/display`
            );
            if (!response.ok)
                throw new Error(`Network error: ${response.status}`);
            const data = await response.json();
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                <ParticleBackground />
                <MagneticElements />

                <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
                    <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 p-8 space-y-6 animate-pulse">
                        {/* Header skeleton */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                                <div>
                                    <div className="w-32 h-4 bg-gray-700 rounded mb-2"></div>
                                    <div className="w-20 h-3 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        </div>

                        {/* Chat bubbles skeleton */}
                        <div className="space-y-4 mt-8">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-3/4 h-3 bg-gray-700 rounded"></div>
                                    <div className="w-1/2 h-3 bg-gray-700 rounded"></div>
                                </div>
                            </div>

                            <div className="flex items-start justify-end space-x-3">
                                <div className="flex-1 space-y-2 text-right">
                                    <div className="ml-auto w-2/3 h-3 bg-gray-700 rounded"></div>
                                    <div className="ml-auto w-1/3 h-3 bg-gray-700 rounded"></div>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-2/3 h-3 bg-gray-700 rounded"></div>
                                    <div className="w-1/3 h-3 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Input skeleton */}
                        <div className="mt-6 h-12 bg-gray-700/70 rounded-2xl"></div>
                    </div>

                    {/* Subtext shimmer */}
                    <p className="text-gray-500 text-center mt-6 animate-pulse">
                        Preparing your chatbot experience...
                    </p>
                </div>
            </div>
        );
    }

    // 🌟 Main Content
    return (
        <HomeLayout>
            <div className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <ParticleBackground />
                <MagneticElements />

                {/* Centered Details */}
                <div className="relative z-10 flex flex-1 items-center justify-center w-full">
                    <div className="max-w-screen w-full md:px-8">
                        <Details slugData={slugData} />
                    </div>
                </div>

                {/* Floating Chatbot */}
                <Chatbot slugData={slugData} slug={slug} />

                {/* 🌌 Footer */}
                <footer className="relative z-20 w-full border-t border-gray-800/50 bg-gray-900/40 backdrop-blur-md">
                    <div className="relative max-w-7xl mx-auto px-4 py-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col md:flex-row justify-between items-center text-center gap-3 sm:gap-4"
                        >
                            {/* Left side - Developer Credit */}
                            <div className="text-gray-300 text-sm sm:text-base font-medium">
                                Developed by{" "}
                                <a
                                    href="https://webcrafticx.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                                >
                                    WebCrafticX
                                </a>
                            </div>

                            {/* Right side - Copyright */}
                            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-right">
                                © {new Date().getFullYear()}{" "}
                                <span className="font-medium text-gray-200">
                                    ChatNova
                                </span>{" "}
                                | All Rights Reserved.
                            </div>
                        </motion.div>
                    </div>
                </footer>
            </div>
        </HomeLayout>
    );
};

export default Home;
