import React, { useEffect, useRef } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
    FaGlobe,
    FaMapMarkerAlt,
    FaShieldAlt,
} from "react-icons/fa";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Details = ({ slugData }) => {
    const { chatbot } = slugData;
    const { logoUrl, companyName, description, socialLinks } = chatbot;

    const hasSocialLinks =
        socialLinks &&
        (socialLinks.facebook ||
            socialLinks.instagram ||
            socialLinks.youtube ||
            socialLinks.website ||
            socialLinks.whatsapp ||
            socialLinks.location);

    // Refs for each section
    const heroRef = useRef(null);
    const descRef = useRef(null);
    const socialRef = useRef(null);

    // Scroll animation for each section
    const heroScroll = useScroll({
        target: heroRef,
        offset: ["start end", "end start"],
    });
    const descScroll = useScroll({
        target: descRef,
        offset: ["start end", "end start"],
    });
    const socialScroll = useScroll({
        target: socialRef,
        offset: ["start end", "end start"],
    });

    // Section transforms
    const heroScale = useTransform(
        heroScroll.scrollYProgress,
        [0, 1],
        [1, 0.7]
    );
    const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], [0, -150]);
    const heroOpacity = useTransform(
        heroScroll.scrollYProgress,
        [0, 1],
        [1, 0.4]
    );

    const descScale = useTransform(
        descScroll.scrollYProgress,
        [0, 1],
        [1, 0.85]
    );
    const descY = useTransform(descScroll.scrollYProgress, [0, 1], [0, -80]);
    const descOpacity = useTransform(
        descScroll.scrollYProgress,
        [0, 1],
        [1, 0.5]
    );

    const socialScale = useTransform(
        socialScroll.scrollYProgress,
        [0, 1],
        [1, 0.85]
    );
    const socialY = useTransform(
        socialScroll.scrollYProgress,
        [0, 1],
        [0, -80]
    );
    const socialOpacity = useTransform(
        socialScroll.scrollYProgress,
        [0, 1],
        [1, 0.5]
    );

    const descInView = useInView(descRef, { once: true });
    const socialInView = useInView(socialRef, { once: true });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden text-white">
            {/* Background glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* HERO SECTION */}
            <motion.div
                ref={heroRef}
                style={{
                    scale: heroScale,
                    y: useTransform(
                        heroScroll.scrollYProgress,
                        [0, 1],
                        [0, 20]
                    ), // 👈 moves downward instead of up
                    opacity: heroOpacity,
                }}
                className="relative z-10 flex flex-col items-center justify-center h-screen text-center"
            >
                {logoUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative flex flex-col justify-center items-center"
                    >
                        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/40 via-pink-400/30 to-orange-300/30 rounded-full blur-3xl -z-10"></div>

                        <motion.img
                            src={logoUrl}
                            alt={companyName}
                            className="w-96 h-96 object-cover rounded-[2rem] border-2 border-purple-500/40 shadow-[0_0_35px_rgba(139,92,246,0.4)] cursor-pointer"
                        />
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 shadow-lg animate-pulse"></div>
                    </motion.div>
                )}

                <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-5 py-3 mt-8 mb-4">
                    <FaShieldAlt className="text-purple-400 text-lg md:text-xl" />
                    <span className="text-base md:text-lg text-gray-300 font-semibold">
                        Verified Company
                    </span>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {companyName}
                    </span>
                </h1>
            </motion.div>

            {/* DESCRIPTION SECTION */}
            <motion.div
                ref={descRef}
                style={{ scale: descScale, y: descY, opacity: descOpacity }}
                className="relative z-10 max-w-3xl mx-auto text-center min-h-screen flex items-center justify-center px-6 md:px-0"
            >
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                        descInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 50 }
                    }
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-300 leading-relaxed text-justify font-light"
                >
                    {description ||
                        "We create intelligent chatbot experiences to connect your business with your customers effortlessly."}
                </motion.p>
            </motion.div>

            {/* SOCIAL LINKS SECTION */}
            {hasSocialLinks && (
                <motion.div
                    ref={socialRef}
                    style={{
                        scale: socialScale,
                        y: socialY,
                        opacity: socialOpacity,
                    }}
                    className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 60 }}
                        animate={
                            socialInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 60 }
                        }
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    >
                        Connect With Us
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={
                            socialInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 60 }
                        }
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-12"
                    >
                        {/* All social links preserved exactly */}
                        {socialLinks.website && (
                            <motion.a
                                href={socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                            >
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl mb-3 group-hover:border-cyan-500/40 transition-all">
                                    <FaGlobe className="text-3xl text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                </div>
                                <span className="text-base font-medium text-gray-400 group-hover:text-cyan-400">
                                    Website
                                </span>
                            </motion.a>
                        )}

                        {socialLinks.location && (
                            <motion.a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    socialLinks.location
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                            >
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl mb-3 group-hover:border-green-500/40 transition-all">
                                    <FaMapMarkerAlt className="text-3xl text-green-400 group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                                </div>
                                <span className="text-base font-medium text-gray-400 group-hover:text-green-400">
                                    Location
                                </span>
                            </motion.a>
                        )}

                        {socialLinks.whatsapp && (
                            <motion.a
                                href={`https://wa.me/${socialLinks.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                            >
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl mb-3 group-hover:border-green-500/40 transition-all">
                                    <FaWhatsapp className="text-3xl text-green-400 group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                                </div>
                                <span className="text-base font-medium text-gray-400 group-hover:text-green-400">
                                    WhatsApp
                                </span>
                            </motion.a>
                        )}

                        {socialLinks.facebook && (
                            <motion.a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                            >
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl mb-3 group-hover:border-blue-500/40 transition-all">
                                    <FaFacebookF className="text-3xl text-blue-400 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                </div>
                                <span className="text-base font-medium text-gray-400 group-hover:text-blue-400">
                                    Facebook
                                </span>
                            </motion.a>
                        )}

                        {socialLinks.instagram && (
                            <motion.a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                            >
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl mb-3 group-hover:border-pink-500/40 transition-all">
                                    <FaInstagram className="text-3xl text-pink-400 group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                                </div>
                                <span className="text-base font-medium text-gray-400 group-hover:text-pink-400">
                                    Instagram
                                </span>
                            </motion.a>
                        )}

                        {socialLinks.youtube && (
                            <motion.a
                                href={socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                            >
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl mb-3 group-hover:border-red-500/40 transition-all">
                                    <FaYoutube className="text-3xl text-red-400 group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                                </div>
                                <span className="text-base font-medium text-gray-400 group-hover:text-red-400">
                                    YouTube
                                </span>
                            </motion.a>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default Details;
