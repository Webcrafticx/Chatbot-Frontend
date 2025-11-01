import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaCommentDots,
    FaShieldAlt,
} from "react-icons/fa";

const Details = ({ slugData }) => {
    const { chatbot } = slugData;
    const { logoUrl, companyName, description, socialLinks } = chatbot;
    const hasSocialLinks =
        socialLinks &&
        (socialLinks.facebook || socialLinks.instagram || socialLinks.youtube);

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Floating light gradients like Banner */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 text-center text-white">
                {/* Badge + Logo + Heading */}
                <div className="flex flex-col items-center mb-10">
                    {logoUrl && (
                        <div className="relative mb-6">
                            <img
                                src={logoUrl}
                                alt={companyName}
                                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl border-2 border-purple-500/40 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                            />
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 shadow-lg animate-pulse"></div>
                        </div>
                    )}

                    <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 mb-6">
                        <FaShieldAlt className="text-purple-400" />
                        <span className="text-sm text-gray-300 font-semibold">
                            Verified Company
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        Welcome to{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {companyName}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {description ||
                            "We specialize in providing intelligent chatbot solutions that engage customers, save time, and improve satisfaction — all powered by AI."}
                    </p>
                </div>

                {/* Social Links */}
                {hasSocialLinks && (
                    <div className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Connect With Us
                        </h2>
                        <div className="flex flex-wrap justify-center gap-10">
                            {socialLinks.facebook && (
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110"
                                >
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl mb-3 group-hover:border-blue-500/40 transition-all">
                                        <FaFacebookF className="text-2xl text-blue-400 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400">
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
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl mb-3 group-hover:border-pink-500/40 transition-all">
                                        <FaInstagram className="text-2xl text-pink-400 group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-pink-400">
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
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl mb-3 group-hover:border-red-500/40 transition-all">
                                        <FaYoutube className="text-2xl text-red-400 group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-red-400">
                                        YouTube
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-20">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-10 py-5 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300">
                        <div className="flex items-center justify-center gap-3">
                            <FaCommentDots className="text-xl" />
                            <span>Start Chatting Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
