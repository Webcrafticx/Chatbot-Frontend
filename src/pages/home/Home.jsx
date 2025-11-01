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

    // ⏳ Skeleton loader
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                <ParticleBackground />
                <MagneticElements />
                <div className="relative z-10 animate-pulse space-y-6 text-center">
                    <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto"></div>
                    <div className="w-48 h-5 bg-gray-700 rounded mx-auto"></div>
                    <div className="w-64 h-3 bg-gray-700 rounded mx-auto"></div>
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
                    <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
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
                                    MockPeriod
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
