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
    FaUser,
} from "react-icons/fa";
import API_BASE_URL from "../../../config/api";
import ChatContent from "./ChatContent";

function Chatbot({ slugData, slug, isSidebar = false }) {
    // ===== STATE =====
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

    // ===== FAQ GENERATION =====
    const generateDynamicFaqs = () => {
        if (!slugData?.list || !Array.isArray(slugData.list)) {
            return [];
        }
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

    // ===== SCROLL TO BOTTOM =====
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ===== API CALL: SEND MESSAGE =====
    const sendMessageToAPI = async (message) => {
        if (!slug) return null;
        try {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
            };
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

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error:", errorText);
                throw new Error("API Error");
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error sending message:", err);
            return null;
        }
    };

    // ===== API CALL: SUBMIT FORM =====
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

    // ===== HANDLERS =====

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
            console.error(err);
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

                if (answerType === "fallback") {
                    setTimeout(() => {
                        setMode("form");
                    }, 1000);
                }

                setIsLoading(false);
                return;
            }

            const companyName =
                slugData?.chatbot?.companyName || "our support team";
            setMessages((prev) => [
                ...prev,
                {
                    text: `Thanks for your message! ${companyName} will contact you soon.`,
                    sender: "bot",
                },
            ]);
            setIsLoading(false);
        } catch (err) {
            console.error("Error in handleSend:", err);
            setIsLoading(false);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, something went wrong. Please try again.",
                    sender: "bot",
                },
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // ===== UI CONTROL =====
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

    // ===== CLOSED BUTTON VIEW =====
    if (!isSidebar && !isOpen) {
        const companyName = slugData?.chatbot?.companyName || "AI";
        const displayName =
            companyName.length > 10
                ? `${companyName.substring(0, 10)}...`
                : companyName;
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-5 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-4 group animate-bounce-subtle"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        <FaCommentDots size={32} className="relative z-10" />
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-lg tracking-tight">
                            Ask {displayName}
                        </div>
                        <div className="text-blue-100 text-sm font-medium">
                            Get instant help
                        </div>
                    </div>
                </button>
            </div>
        );
    }

    // ===== MAIN CHAT UI =====
    return (
        <div
            className={`fixed z-50 transition-all duration-300 ${
                isExpanded
                    ? "right-6 bottom-6 top-6 w-[32rem] max-w-[95vw] h-[calc(100vh-3rem)]"
                    : "bottom-6 right-6 w-96 m-1 max-w-[calc(100vw-3rem)]"
            } ${isSidebar ? "relative inset-auto w-full h-auto" : ""}`}
        >
            <div
                className={`bg-white rounded-3xl shadow-2xl  border border-gray-200/60 backdrop-blur-sm flex flex-col ${
                    isExpanded ? "h-full" : "h-[600px] max-h-[80vh]"
                } ${isSidebar ? "h-full rounded-2xl" : ""}`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r rounded-t-2xl from-blue-600 to-purple-600 p-5 text-white">
                    <div className="flex justify-between items-start mb-2">
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
                                <h3 className="font-bold text-lg leading-tight">
                                    {slugData?.chatbot?.companyName ||
                                        "Company"}{" "}
                                    Assistant
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <p className="text-blue-100 text-sm font-medium">
                                        Online
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-1">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
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
                                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                                title="Reset Chat"
                            >
                                <FaRedo size={14} />
                            </button>
                            {!isSidebar && (
                                <button
                                    onClick={toggleChat}
                                    className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                                    title="Close"
                                >
                                    <FaTimes size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Content */}
                <div className="flex-1 flex flex-col min-h-0">
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
