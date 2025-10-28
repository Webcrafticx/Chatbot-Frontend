// Home.jsx
import React from "react";
import HomeLayout from "../../layout/HomeLayout";
import Details from "../../components/home/section/Details";
import Chatbot from "../../components/home/section/Chatbot"; // Import the Chatbot

const Home = () => {
    return (
        <HomeLayout>
            <div className="min-h-screen py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Welcome to <span className="text-blue-600">TechSolutions</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the future of customer support with our intelligent chatbot solutions
                        </p>
                    </div> */}

                    {/* Details Section Only - Chatbot is now floating */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <Details />
                        </div>
                    </div>

                    {/* Bottom Spacing */}
                    <div className="h-8"></div>
                </div>

                {/* Floating Chatbot Widget - This will appear in bottom-right corner */}
                <Chatbot />
            </div>
        </HomeLayout>
    );
};

export default Home;
