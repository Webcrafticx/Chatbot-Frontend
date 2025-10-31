import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaCommentDots,
    FaGlobeAmericas,
    FaRocket,
    FaShieldAlt,
} from "react-icons/fa";

const Details = ({ slugData }) => {
    if (!slugData || !slugData.chatbot) {
        return (
            <div className="w-full">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-12 border border-gray-200 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FaRocket className="text-white text-3xl" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Welcome to Our Platform
                        </h2>
                        <p className="text-gray-600 text-xl leading-relaxed mb-8">
                            Experience intelligent customer support with our
                            AI-powered chatbot solution designed for modern
                            businesses.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-blue-50 rounded-2xl px-6 py-3 border border-blue-200">
                                <span className="text-blue-700 font-semibold">
                                    24/7 Support
                                </span>
                            </div>
                            <div className="bg-purple-50 rounded-2xl px-6 py-3 border border-purple-200">
                                <span className="text-purple-700 font-semibold">
                                    AI Powered
                                </span>
                            </div>
                            <div className="bg-green-50 rounded-2xl px-6 py-3 border border-green-200">
                                <span className="text-green-700 font-semibold">
                                    Instant Responses
                                </span>
                            </div>
                        </div>
                    </div>
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
        <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12 px-6 md:px-12 lg:px-16">
            {/* Company Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12">
                {logoUrl && (
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <img
                                src={logoUrl}
                                alt={companyName}
                                className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl object-cover border-4 border-white shadow-2xl"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                        </div>
                    </div>
                )}
                <div className="text-center lg:text-left flex-1">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <FaShieldAlt className="text-blue-600" />
                        Verified Company
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                        {companyName}
                    </h1>
                </div>
            </div>

            {/* About Section */}
            {description && (
                <div className="p-8 mb-12 ">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Our Story
                        </h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
            )}

            {/* Social Links */}
            {hasSocialLinks && (
                <div className="text-center border-t border-gray-200 pt-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">
                        Connect With Us
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {socialLinks.facebook && (
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center transition-all duration-300 hover:scale-110"
                            >
                                <div className="bg-blue-100 p-5 rounded-2xl mb-3 shadow-lg group-hover:shadow-xl group-hover:bg-blue-200 transition-all duration-300">
                                    <FaFacebookF className="text-2xl text-blue-600" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                                    Facebook
                                </span>
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center transition-all duration-300 hover:scale-110"
                            >
                                <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-5 rounded-2xl mb-3 shadow-lg group-hover:shadow-xl group-hover:from-pink-200 group-hover:to-purple-200 transition-all duration-300">
                                    <FaInstagram className="text-2xl text-gradient-to-r from-pink-600 to-purple-600" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-600">
                                    Instagram
                                </span>
                            </a>
                        )}
                        {socialLinks.youtube && (
                            <a
                                href={socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center transition-all duration-300 hover:scale-110"
                            >
                                <div className="bg-red-100 p-5 rounded-2xl mb-3 shadow-lg group-hover:shadow-xl group-hover:bg-red-200 transition-all duration-300">
                                    <FaYoutube className="text-2xl text-red-600" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600">
                                    YouTube
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Chat CTA */}
            <div className="mt-12 border-t border-gray-200 pt-12 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-blue-100 text-lg mb-6">
                            Our AI assistant is here to help you 24/7 with any
                            questions or support you need.
                        </p>
                        <div className="flex items-center justify-center gap-3 text-blue-100">
                            <FaCommentDots className="text-xl" />
                            <span className="text-lg font-semibold">
                                Click the chat button to start conversation
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
