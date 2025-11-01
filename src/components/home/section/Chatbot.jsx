// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import {
    FaRobot,
    FaTimes,
    FaCommentDots,
    FaExpand,
    FaCompress,
    FaRedo,
    FaPaperPlane,
} from "react-icons/fa";
import API_BASE_URL from "../../../config/api";
import ChatContent from "./ChatContent";

function Chatbot({ slugData, slug, isSidebar = false }) {
    const [messages, setMessages] = useState([
        {
            text:
                slugData?.chatbot?.welcomeMessage ||
                (slugData?.chatbot?.companyName
                    ? `Hello! I'm your virtual assistant from ${slugData.chatbot.companyName}. How can I help you today?`
                    : "Hello! I'm your virtual assistant. How can I help you today?"),
            sender: "bot",
        },
    ]);
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

    const generateDynamicFaqs = () => {
        if (!slugData?.list || !Array.isArray(slugData.list)) return [];
        return slugData.list.map((item) => ({
            question: item.question,
            answer: item.answer,
            keywords: item.keywords || [],
        }));
    };
    const [faqs, setFaqs] = useState(generateDynamicFaqs());

    useEffect(() => {
        setFaqs(generateDynamicFaqs());
    }, [slugData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessageToAPI = async (message) => {
        if (!slug) return null;
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Token ${token}`;
            const response = await fetch(
                `${API_BASE_URL}/chat/${slug}/message`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        message,
                        "src-log": "chatbot-interface",
                    }),
                }
            );
            if (!response.ok) throw new Error("API Error");
            return await response.json();
        } catch (err) {
            console.error("Error sending message:", err);
            return null;
        }
    };

    const submitQueryToAPI = async (queryData) => {
        if (!slug) return false;
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Token ${token}`;
            const response = await fetch(`${API_BASE_URL}/chat/${slug}/query`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: queryData.name,
                    email: queryData.email,
                    phone: queryData.phone,
                    message: queryData.message,
                    type: "contact_form",
                }),
            });
            if (!response.ok) throw new Error("API response not ok");
            return true;
        } catch (err) {
            console.error("Error submitting form:", err);
            return false;
        }
    };

    const handleFaqSelect = async (faq) => {
        setSelectedFaq(faq);
        setMessages((prev) => [
            ...prev,
            { text: faq.question, sender: "user" },
            { text: faq.answer, sender: "bot" },
        ]);
        if (slug) await sendMessageToAPI(faq.question);
        setTimeout(() => setMode("suggestions"), 1000);
    };

    const handleNotInScope = () => {
        setMode("form");
        setMessages((prev) => [
            ...prev,
            { text: "My question is not listed.", sender: "user" },
            {
                text: slugData?.chatbot?.companyName
                    ? `I'd be happy to help! Please share your details below and the team at ${slugData.chatbot.companyName} will reach out soon.`
                    : "I'd be happy to help! Please share your details below.",
                sender: "bot",
            },
        ]);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await submitQueryToAPI(formData);
            const companyName = slugData?.chatbot?.companyName || "We";
            if (success) {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: `Thank you, ${formData.name}! ${companyName} will contact you at ${formData.email} or ${formData.phone} within 24 hours.`,
                        sender: "bot",
                    },
                    {
                        text: "Your query has been submitted successfully. Is there anything else I can help you with?",
                        sender: "bot",
                    },
                ]);
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: "Sorry, there was an issue submitting your form. Please try again later.",
                        sender: "bot",
                    },
                ]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    text: "Something went wrong while submitting your form. Please try again later.",
                    sender: "bot",
                },
            ]);
        } finally {
            setIsLoading(false);
            setTimeout(() => setMode("suggestions"), 800);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        try {
            const apiResponse = await sendMessageToAPI(input);
            if (apiResponse?.chat?.answer) {
                const answerType = apiResponse.chat.type;
                setMessages((prev) => [
                    ...prev,
                    { text: apiResponse.chat.answer, sender: "bot" },
                ]);
                if (answerType === "fallback")
                    setTimeout(() => setMode("form"), 1000);
            } else {
                const companyName =
                    slugData?.chatbot?.companyName || "our support team";
                setMessages((prev) => [
                    ...prev,
                    {
                        text: `Thanks for your message! ${companyName} will contact you soon.`,
                        sender: "bot",
                    },
                ]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, something went wrong. Please try again.",
                    sender: "bot",
                },
            ]);
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
        setMessages([{ text: welcome, sender: "bot" }]);
        setMode("suggestions");
        setInput("");
    };

    if (!isSidebar && !isOpen) {
        const companyName = slugData?.chatbot?.companyName || "AI";
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-5 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
                >
                    <FaCommentDots
                        size={28}
                        className="animate-bounce-subtle"
                    />
                    <span className="font-semibold tracking-tight">
                        Chat with {companyName}
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
                className={`bg-gray-900/70 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.2)] flex flex-col  ${
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
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                                className="p-2 rounded-xl hover:bg-white/10 transition"
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
                                className="p-2 rounded-xl hover:bg-white/10 transition"
                                title="Reset Chat"
                            >
                                <FaRedo size={14} />
                            </button>
                            {!isSidebar && (
                                <button
                                    onClick={toggleChat}
                                    className="p-2 rounded-xl hover:bg-white/10 transition"
                                    title="Close"
                                >
                                    <FaTimes size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Content */}
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
