import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaCommentDots,
} from "react-icons/fa";

const Details = ({ slugData }) => {
    if (!slugData || !slugData.chatbot) {
        return (
            <div className="w-full lg:w-7/12">
                <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to Our Platform
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Experience intelligent customer support with our
                        AI-powered chatbot solution.
                    </p>
                </div>
            </div>
        );
    }

    const { chatbot } = slugData;
    const { logoUrl, companyName, description, socialLinks } = chatbot;
    const hasSocialLinks =
        socialLinks &&
        (socialLinks.facebook || socialLinks.instagram || socialLinks.youtube);

    return (
        <div className="w-full bg-gradient-to-b from-gray-50 to-white py-10 px-6 md:px-10 ">
            {/* Company Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                {logoUrl && (
                    <div className="flex-shrink-0">
                        <img
                            src={logoUrl}
                            alt={companyName}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                        />
                    </div>
                )}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {companyName}
                    </h1>
                    <p className="text-gray-500 text-base">
                        Innovative solutions powered by AI.
                    </p>
                </div>
            </div>

            {/* About Section */}
            {description && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10 transition-transform hover:scale-[1.01]">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaCommentDots className="text-blue-600" /> About Us
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
            )}

            {/* Social Links */}
            {hasSocialLinks && (
                <div className="text-center border-t border-gray-200 pt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Connect With Us
                    </h3>
                    <div className="flex justify-center gap-8">
                        {socialLinks.facebook && (
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                            >
                                <div className="bg-blue-100 p-4 rounded-full mb-2 shadow-sm">
                                    <FaFacebookF className="text-2xl" />
                                </div>
                                <span className="text-sm font-medium">
                                    Facebook
                                </span>
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition-transform hover:scale-110"
                            >
                                <div className="bg-pink-100 p-4 rounded-full mb-2 shadow-sm">
                                    <FaInstagram className="text-2xl" />
                                </div>
                                <span className="text-sm font-medium">
                                    Instagram
                                </span>
                            </a>
                        )}
                        {socialLinks.youtube && (
                            <a
                                href={socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                            >
                                <div className="bg-red-100 p-4 rounded-full mb-2 shadow-sm">
                                    <FaYoutube className="text-2xl" />
                                </div>
                                <span className="text-sm font-medium">
                                    YouTube
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Chat Section */}
            <div className="mt-10 border-t border-gray-200 pt-6 text-center">
                <p className="text-gray-600 mb-2">
                    Need assistance? Our virtual assistant is here to help!
                </p>
                <div className="flex items-center justify-center gap-2 text-blue-600">
                    <FaCommentDots className="text-lg" />
                    <span className="text-sm font-medium">
                        Chat with us anytime
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Details;
