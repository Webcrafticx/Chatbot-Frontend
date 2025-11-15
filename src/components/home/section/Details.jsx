import React, { useState, useEffect } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
    FaGlobe,
    FaMapMarkerAlt,
} from "react-icons/fa";
import {
    FaPaperPlane,
    FaSpinner,
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import API_BASE_URL from "../../../config/api";

const Details = ({ slugData }) => {
    const { chatbot } = slugData;
    const { logoUrl, companyName, description, socialLinks } = chatbot;

    const hasSocialLinks =
        socialLinks &&
        (socialLinks.facebook || socialLinks.instagram || socialLinks.youtube);

    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // Toast notification function
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 4000);
    };

    const submitQueryToAPI = async (data) => {
        if (!slugData?.chatbot?.slug) return false;
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Token ${token}`;

            const res = await fetch(
                `${API_BASE_URL}/chat/${slugData.chatbot.slug}/query`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        message: data.message,
                        type: "contact_form",
                    }),
                }
            );

            return res.ok;
        } catch (error) {
            console.error("Error submitting form:", error);
            return false;
        }
    };

    const handleFormChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const success = await submitQueryToAPI(formData);

        if (success) {
            showToast("Thank you! Our team will contact you soon.", "success");
            setIsModalOpen(false);
            setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
            showToast("Something went wrong. Please try again later.", "error");
        }

        setIsLoading(false);
    };

    // Smooth fade-in effect
    const { scrollY } = useScroll();
    useScroll();
    const scale = useTransform(scrollY, [0, 200], [1, 0.45]);
    const yPos = useTransform(scrollY, [0, 200], [0, -30]);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative md:py-20 overflow-hidden">
            {/* Floating Background Gradients */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 min-w-screen md:px-10 text-center text-white">
                <div className="flex flex-col items-center mb-10">
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt={companyName}
                            className="w-full h-full p-2 mb-4 md:w-64 md:h-64 object-cover rounded-[2rem] md:border-2 md:border-purple-500/40 shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-700"
                        />
                    )}

                    <h1 className="text-5xl md:text-6xl font-bold lg:mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {companyName}
                        </span>
                    </h1>

                    {/* CTA Buttons */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer px-3 py-1 md:px-6 md:py-3 my-6 rounded-full font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        Inquiry Now
                    </button>

                    <p
                        style={{ wordSpacing: "-1px", hyphens: "auto" }}
                        className={`text-lg md:text-xl text-justify tracking-normal px-6 md:px-3 text-gray-300 max-w-7xl mx-auto leading-relaxed transition-all duration-700 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                    >
                        {description}
                    </p>
                </div>

                {/* Social Icons */}
                {hasSocialLinks && (
                    <div className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Connect With Us
                        </h2>

                        <div className="flex flex-wrap justify-center gap-10">
                            {socialLinks.website && (
                                <a
                                    href={socialLinks.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl mb-3 group-hover:border-cyan-500/40 transition-all">
                                        <FaGlobe className="text-2xl text-cyan-400" />
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-cyan-400">
                                        Website
                                    </span>
                                </a>
                            )}
                            {socialLinks.location && (
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        socialLinks.location
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl mb-3 group-hover:border-green-500/40 transition-all">
                                        <FaMapMarkerAlt className="text-2xl text-green-400 group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-green-400">
                                        Location
                                    </span>
                                </a>
                            )}

                            {socialLinks.whatsapp && (
                                <a
                                    href={`https://wa.me/${socialLinks.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl mb-3 group-hover:border-green-500/40 transition-all">
                                        <FaWhatsapp className="text-2xl text-green-400 group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-green-400">
                                        WhatsApp
                                    </span>
                                </a>
                            )}

                            {socialLinks.facebook && (
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
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
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
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
                                    className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer px-3 py-1 md:px-6 md:py-3 my-6 rounded-full font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Reach Us
                        </button>
                    </div>
                )}
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-[1000] animate-slideIn">
                    <div
                        className={`flex items-center p-4 rounded-2xl border backdrop-blur-sm shadow-2xl transition-all duration-300 ${
                            toast.type === "success"
                                ? "bg-gray-900/90 border-green-500/40 text-green-400"
                                : "bg-gray-900/90 border-red-500/40 text-red-400"
                        }`}
                    >
                        <div className="mr-3">
                            {toast.type === "success" ? (
                                <FaCheckCircle className="text-xl" />
                            ) : (
                                <FaExclamationTriangle className="text-xl" />
                            )}
                        </div>
                        <span className="text-white font-medium">
                            {toast.message}
                        </span>
                        <button
                            onClick={() =>
                                setToast({ show: false, message: "", type: "" })
                            }
                            className="ml-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
                    <div className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative animate-scaleIn">
                        <button
                            className="absolute top-3 right-3 text-gray-300 hover:text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Inquiry Form
                        </h2>

                        <form
                            onSubmit={handleFormSubmit}
                            className="space-y-4 text-gray-200"
                        >
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Full Name *"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                placeholder="Email Address *"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                name="phone"
                                maxLength={10}
                                value={formData.phone}
                                onChange={handleFormChange}
                                placeholder="Phone Number *"
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500"
                            />
                            <textarea
                                name="message"
                                rows="3"
                                value={formData.message}
                                onChange={handleFormChange}
                                placeholder="Write your message..."
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500"
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`cursor-pointer w-full px-6 py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 ${
                                    isLoading
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />{" "}
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="mr-2" /> Submit
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Details;
