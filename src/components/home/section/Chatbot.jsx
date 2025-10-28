// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaTimes,
    FaCommentDots,
} from "react-icons/fa";

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your virtual assistant. How can I help you today?",
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [mode, setMode] = useState("suggestions");
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Sample FAQs
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "You can return items within 30 days of purchase with original receipt.",
        },
        {
            question: "How do I track my order?",
            answer: "Use the tracking link sent to your email or check your account dashboard.",
        },
        {
            question: "What are your business hours?",
            answer: "We are open 9 AM to 5 PM, Monday to Friday. Weekend support available via email.",
        },
        {
            question: "How do I reset my password?",
            answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
        },
    ];

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleFaqSelect = (faq) => {
        setSelectedFaq(faq);
        setMessages([
            ...messages,
            { text: faq.question, sender: "user" },
            { text: faq.answer, sender: "bot" },
        ]);

        // Show suggestions again after a short delay
        setTimeout(() => {
            setMode("suggestions");
        }, 1000);
    };

    const handleNotInScope = () => {
        setMode("form");
        setMessages([
            ...messages,
            { text: "My question is not listed.", sender: "user" },
            {
                text: "I'd be happy to help with that! Please provide your details below and I'll make sure someone gets back to you.",
                sender: "bot",
            },
        ]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate email sending
        alert(
            `Thank you, ${formData.name}! We'll contact you at ${formData.email} within 24 hours.`
        );
        setFormData({ name: "", email: "", message: "" });

        // Add success message and show suggestions again
        setMessages([
            ...messages,
            {
                text: "Form submitted successfully! We'll be in touch soon. Is there anything else I can help you with?",
                sender: "bot",
            },
        ]);

        // Show suggestions after form submission
        setTimeout(() => {
            setMode("suggestions");
        }, 500);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSend = () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: "user" };
            setMessages([...messages, userMessage]);
            setInput("");

            // Simulate bot response after a short delay
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: "Thanks for your message! For complex inquiries, please use the form below so we can assist you properly.",
                        sender: "bot",
                    },
                ]);
                setMode("form");
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const resetChat = () => {
        setMessages([
            {
                text: "Hello! I'm your virtual assistant. How can I help you today?",
                sender: "bot",
            },
        ]);
        setMode("suggestions");
        setInput("");
    };

    // Function to show menu after any interaction
    const showMenuAfterResponse = () => {
        setTimeout(() => {
            setMode("suggestions");
        }, 800);
    };

    // Minimized Chat Button (like the example image)
    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                {/* Floating Chat Button */}
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 animate-pulse"
                >
                    <div className="relative">
                        <FaCommentDots size={28} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-lg">Ask AI</div>
                        <div className="text-blue-100 text-sm">
                            Get instant help
                        </div>
                    </div>
                </button>
            </div>
        );
    }

    // Expanded Chat Modal
    return (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw]">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
                    <div className="flex items-center">
                        <FaRobot className="mr-3" size={24} />
                        <div>
                            <h3 className="font-bold text-lg">
                                Virtual Assistant
                            </h3>
                            <p className="text-blue-100 text-sm">
                                Online • Ready to help
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={resetChat}
                            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
                            title="Reset chat"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={toggleChat}
                            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div
                    ref={chatContainerRef}
                    className="h-96 overflow-y-auto bg-gray-50 space-y-4 p-4"
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`flex max-w-[85%] rounded-2xl p-3 shadow-sm ${
                                    msg.sender === "user"
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                                }`}
                            >
                                {msg.sender === "bot" && (
                                    <FaRobot
                                        className="mr-2 text-blue-500 flex-shrink-0 mt-1"
                                        size={16}
                                    />
                                )}
                                <div>
                                    <span className="whitespace-pre-wrap text-sm">
                                        {msg.text}
                                    </span>
                                </div>
                                {msg.sender === "user" && (
                                    <FaUser
                                        className="ml-2 text-blue-100 flex-shrink-0 mt-1"
                                        size={16}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* FAQ Suggestions - Always show after bot messages */}
                    {mode === "suggestions" && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <p className="font-medium text-gray-700 mb-3 text-sm">
                                How else can I help you?
                            </p>
                            <div className="space-y-2">
                                {faqs.map((faq, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFaqSelect(faq)}
                                        className="block w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-100 hover:border-blue-200 text-gray-700 hover:text-blue-700 text-sm"
                                    >
                                        {faq.question}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNotInScope}
                                    className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 text-gray-700 text-sm mt-2"
                                >
                                    My question is not listed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Contact Form */}
                    {mode === "form" && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <p className="font-medium text-gray-700 mb-3 text-sm">
                                Please share your details:
                            </p>
                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-3"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="Your Email"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    placeholder="Your Message"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    rows="2"
                                />
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm"
                                    >
                                        Submit Request
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode("suggestions")}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm"
                                    >
                                        Back to Menu
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Only show if not in form mode */}
                {mode !== "form" && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                className="flex-1 p-3 rounded-l-lg focus:outline-none text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className={`px-4 rounded-r-lg transition-all duration-200 flex items-center justify-center ${
                                    input.trim()
                                        ? "bg-blue-500 text-white hover:bg-blue-600"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chatbot;
