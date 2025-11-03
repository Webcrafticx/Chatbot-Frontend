import React, { useState, useRef, useEffect } from "react";
import {
    FaRobot,
    FaTimes,
    FaCommentDots,
    FaExpand,
    FaCompress,
    FaRedo,
} from "react-icons/fa";
import API_BASE_URL from "../../../config/api";
import ChatContent from "./ChatContent";

function Chatbot({ slugData, slug, isSidebar = false }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [mode, setMode] = useState("suggestions");
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [isOpen, setIsOpen] = useState(isSidebar);
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const welcome =
            slugData?.chatbot?.welcomeMessage ||
            (slugData?.chatbot?.companyName
                ? `Hello! I'm your virtual assistant from ${slugData.chatbot.companyName}. How can I help you today?`
                : "Hello! I'm your virtual assistant. How can I help you today?");
        setMessages([{ text: welcome, sender: "bot" }]);
    }, [slugData]);

    const generateDynamicFaqs = () => {
        if (!slugData?.list || !Array.isArray(slugData.list)) return [];
        return slugData.list.map((item) => ({
            question: item.question,
            answer: item.answer,
            keywords: item.keywords || [],
        }));
    };

    const [faqs, setFaqs] = useState(generateDynamicFaqs());
    useEffect(() => setFaqs(generateDynamicFaqs()), [slugData]);
    useEffect(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        [messages]
    );

    const sendMessageToAPI = async (message) => {
        if (!slug) return null;
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Token ${token}`;
            const res = await fetch(`${API_BASE_URL}/chat/${slug}/message`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    message,
                    "src-log": "chatbot-interface",
                }),
            });
            if (!res.ok) throw new Error("API Error");
            return await res.json();
        } catch (e) {
            console.error("Error:", e);
            return null;
        }
    };

    const submitQueryToAPI = async (data) => {
        if (!slug) return false;
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Token ${token}`;
            const res = await fetch(`${API_BASE_URL}/chat/${slug}/query`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message,
                    type: "contact_form",
                }),
            });
            if (!res.ok) throw new Error("API Error");
            return true;
        } catch {
            return false;
        }
    };

    const handleFaqSelect = async (faq) => {
        setSelectedFaq(faq);
        setMessages((p) => [
            ...p,
            { text: faq.question, sender: "user" },
            { text: faq.answer, sender: "bot" },
        ]);
        if (slug) await sendMessageToAPI(faq.question);
        setTimeout(() => setMode("suggestions"), 1000);
    };

    const handleNotInScope = () => {
        setMode("form");
        setMessages((p) => [
            ...p,
            { text: "My question is not listed.", sender: "user" },
            {
                text: slugData?.chatbot?.companyName
                    ? `I'd be happy to help! Please share your details below and the team at ${slugData.chatbot.companyName} will reach out soon.`
                    : "I'd be happy to help! Please share your details below.",
                sender: "bot",
            },
        ]);
    };

    const handleFormChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await submitQueryToAPI(formData);
        const companyName = slugData?.chatbot?.companyName || "We";
        setMessages((p) => [
            ...p,
            success
                ? {
                      text: `Thank you, ${formData.name}! ${companyName} will contact you at ${formData.email} or ${formData.phone} within 24 hours.`,
                      sender: "bot",
                  }
                : {
                      text: "Sorry, there was an issue submitting your form. Please try again later.",
                      sender: "bot",
                  },
        ]);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsLoading(false);
        setTimeout(() => setMode("suggestions"), 800);
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { text: input, sender: "user" };
        setMessages((p) => [...p, userMsg]);
        setInput("");
        setIsLoading(true);
        try {
            const res = await sendMessageToAPI(input);
            if (res?.chat?.answer) {
                setMessages((p) => [
                    ...p,
                    { text: res.chat.answer, sender: "bot" },
                ]);
                if (res.chat.type === "fallback")
                    setTimeout(() => setMode("form"), 1000);
            } else {
                setMessages((p) => [
                    ...p,
                    {
                        text: `Thanks! ${
                            slugData?.chatbot?.companyName || "our team"
                        } will contact you soon.`,
                        sender: "bot",
                    },
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleChat = () => {
        if (!isSidebar) {
            setIsOpen(!isOpen);
            if (isOpen) setIsExpanded(false);
        }
    };

    const resetChat = () => {
        const welcome =
            slugData?.chatbot?.welcomeMessage ||
            (slugData?.chatbot?.companyName
                ? `Hello! I'm your virtual assistant from ${slugData.chatbot.companyName}. How can I help you today?`
                : "Hello! I'm your virtual assistant. How can I help you today?");
        setMessages([]);
        setTimeout(() => {
            setMessages([{ text: welcome, sender: "bot" }]);
            setMode("suggestions");
            setInput("");
        }, 200);
    };

    // ⚡️ Typing + prompt rotation (icons removed)
    const companyName = slugData?.chatbot?.companyName || "AI";
    const prompts = [
        `Chat with ${companyName}`,
        "Ask your queries!",
        "Need help? Click me!",
        "Ready to chat?",
    ];
    const [typedText, setTypedText] = useState("");
    const [promptIndex, setPromptIndex] = useState(0);
    const [showMobilePrompt, setShowMobilePrompt] = useState(true);

    useEffect(() => {
        let i = 0;
        const text = prompts[promptIndex];
        setTypedText("");
        const typing = setInterval(() => {
            if (i < text.length) setTypedText((t) => t + text.charAt(i++));
            else clearInterval(typing);
        }, 50);
        return () => clearInterval(typing);
    }, [promptIndex]);

    useEffect(() => {
        const interval = setInterval(
            () => setPromptIndex((i) => (i + 1) % prompts.length),
            10000
        );
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const toggle = setInterval(() => setShowMobilePrompt((v) => !v), 8000);
        return () => clearInterval(toggle);
    }, []);

    const fadeInKeyframes = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(3px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    const fadeInStyle = { animation: "fadeIn 0.6s ease-in-out" };

    if (!isSidebar && !isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
                <style>{fadeInKeyframes}</style>

                {/* 🟣 Mobile (icon + prompt) */}
                <button
                    onClick={toggleChat}
                    className="relative flex sm:hidden items-center justify-center w-auto h-14 rounded-full 
                    bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg 
                    hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 
                    hover:scale-110 cursor-pointer px-4"
                    title={`Chat with ${companyName}`}
                >
                    <FaCommentDots size={22} className="mr-2" />
                    {showMobilePrompt && (
                        <span
                            className="text-sm font-medium whitespace-nowrap overflow-hidden"
                            style={fadeInStyle}
                        >
                            {typedText}
                        </span>
                    )}
                </button>

                {/* 🔵 Desktop (text + icon) */}
                <button
                    onClick={toggleChat}
                    className="hidden sm:flex items-center space-x-3 px-5 py-4 mb-8 
                    rounded-2xl bg-gray-900/80 backdrop-blur-md border border-gray-700 
                    text-gray-100 font-medium tracking-tight
                    shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] 
                    transition-all duration-300 hover:scale-[1.07] group cursor-pointer"
                >
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-inner">
                        <FaCommentDots size={22} className="animate-pulse" />
                    </div>
                    <span
                        className="font-semibold text-sm sm:text-base text-gray-200 group-hover:text-white transition-colors whitespace-nowrap"
                        style={fadeInStyle}
                    >
                        {typedText}
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div
            className={`fixed z-50 transition-all duration-300 ${
                isExpanded
                    ? "right-6 bottom-6 top-6 w-[32rem] max-w-[95vw] h-[calc(100vh-3rem)]"
                    : "bottom-6 right-6 w-96 m-1 max-w-[calc(100vw-3rem)]"
            } ${isSidebar ? "relative inset-auto w-full h-auto" : ""}`}
        >
            <div
                className={`bg-gray-900/70 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.2)] flex flex-col ${
                    isExpanded ? "h-full" : "h-[600px] max-h-[80vh]"
                } ${isSidebar ? "h-full rounded-2xl" : ""}`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white rounded-t-3xl">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            {slugData?.chatbot?.logoUrl ? (
                                <img
                                    src={slugData.chatbot.logoUrl}
                                    alt={
                                        slugData?.chatbot?.companyName ||
                                        "Company"
                                    }
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20 cursor-pointer"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
                                    <FaRobot size={20} />
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-lg">
                                    {slugData?.chatbot?.companyName ||
                                        "Company"}{" "}
                                    Assistant
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-blue-100 text-sm">
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
                                title={isExpanded ? "Minimize" : "Expand"}
                            >
                                {isExpanded ? (
                                    <FaCompress size={14} />
                                ) : (
                                    <FaExpand size={14} />
                                )}
                            </button>
                            <button
                                onClick={resetChat}
                                className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
                                title="Reset Chat"
                            >
                                <FaRedo size={14} />
                            </button>
                            {!isSidebar && (
                                <button
                                    onClick={toggleChat}
                                    className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
                                    title="Close"
                                >
                                    <FaTimes size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="flex flex-col flex-1 min-h-0 bg-gray-800/50 text-white">
                    <ChatContent
                        messages={messages}
                        mode={mode}
                        faqs={faqs}
                        formData={formData}
                        isLoading={isLoading}
                        input={input}
                        setInput={setInput}
                        handleKeyDown={handleKeyDown}
                        handleSend={handleSend}
                        handleFormChange={handleFormChange}
                        handleFormSubmit={handleFormSubmit}
                        handleFaqSelect={handleFaqSelect}
                        handleNotInScope={handleNotInScope}
                        setMode={setMode}
                        slugData={slugData}
                        messagesEndRef={messagesEndRef}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
