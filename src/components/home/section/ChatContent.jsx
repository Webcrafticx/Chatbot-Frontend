// ChatContent.jsx
import React, { useEffect } from "react";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaQuestionCircle,
    FaEnvelope,
    FaArrowLeft,
    FaSpinner,
} from "react-icons/fa";

const ChatContent = ({
    messages,
    mode,
    faqs,
    formData,
    isLoading,
    input,
    setInput,
    handleKeyDown,
    handleSend,
    handleFormChange,
    handleFormSubmit,
    handleFaqSelect,
    handleNotInScope,
    setMode,
    slugData,
    messagesEndRef,
}) => {
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages, isLoading, mode, messagesEndRef]);

    return (
        <>
            {/* Chat Messages Section */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Messages Area (between header and input) */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
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
                                className={`flex max-w-[90%] md:max-w-[85%] rounded-3xl p-4 shadow-sm transition-all duration-300 ${
                                    msg.sender === "user"
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-md"
                                }`}
                            >
                                {/* Bot Avatar */}
                                {msg.sender === "bot" && (
                                    <div className="flex-shrink-0 mr-3">
                                        {slugData?.chatbot?.logoUrl ? (
                                            <img
                                                src={slugData.chatbot.logoUrl}
                                                alt={
                                                    slugData?.chatbot
                                                        ?.companyName ||
                                                    "Company"
                                                }
                                                className="w-6 h-6 rounded-full object-cover border-2 border-blue-100"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <FaRobot className="text-white text-xs" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Message Content */}
                                <div className="flex-1">
                                    <span className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                                        {msg.text}
                                    </span>
                                </div>

                                {/* User Avatar */}
                                {msg.sender === "user" && (
                                    <div className="flex-shrink-0 ml-3">
                                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                            <FaUser className="text-white text-xs" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-md p-4 shadow-md">
                                <div className="flex items-center space-x-3">
                                    {slugData?.chatbot?.logoUrl ? (
                                        <img
                                            src={slugData.chatbot.logoUrl}
                                            alt={
                                                slugData?.chatbot
                                                    ?.companyName || "Company"
                                            }
                                            className="w-6 h-6 rounded-full object-cover border-2 border-blue-100"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <FaRobot className="text-white text-xs" />
                                        </div>
                                    )}
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div
                                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        />
                                    </div>
                                    <span className="text-gray-500 text-sm ml-2">
                                        Thinking...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQ Suggestions */}
                    {mode === "suggestions" && faqs.length > 0 && (
                        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                                    <FaQuestionCircle className="text-white text-sm" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-base">
                                        Frequently Asked Questions
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Choose a question or type your own
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {faqs.slice(0, 5).map((faq, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFaqSelect(faq)}
                                        className="block w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-md group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 group-hover:text-blue-700 text-sm font-medium flex-1">
                                                {faq.question}
                                            </span>
                                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center ml-3 group-hover:bg-blue-500 transition-colors">
                                                <svg
                                                    className="w-3 h-3 text-gray-400 group-hover:text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={handleNotInScope}
                                    className="block w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-md group mt-4"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 group-hover:bg-gray-300 transition-colors">
                                            <FaEnvelope className="text-gray-600 text-sm" />
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm">
                                            My question is not listed
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Contact Form */}
                    {mode === "form" && (
                        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                                        <FaEnvelope className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-base">
                                            Contact Form
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            We'll get back to you soon
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setMode("suggestions")}
                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                                    title="Back to menu"
                                >
                                    <FaArrowLeft className="text-gray-600 text-xs" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            placeholder="your.email@example.com"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleFormChange}
                                        placeholder="Your 10-digit phone number"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        placeholder="Please describe your question or concern..."
                                        required
                                        rows="3"
                                        className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`flex-1 px-6 py-3 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center ${
                                            isLoading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <FaSpinner className="animate-spin mr-2" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane
                                                    className="mr-2"
                                                    size={14}
                                                />
                                                Submit Request
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode("suggestions")}
                                        className="px-6 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Back to FAQs
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Scroll anchor */}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area */}
            {mode !== "form" && (
                <div className="p-4 rounded-b-2xl border-t border-gray-200 bg-white">
                    <div className="flex items-end rounded-2xl border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all shadow-sm">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            className="flex-1 p-4 rounded-2xl focus:outline-none text-base"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`m-2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                input.trim() && !isLoading
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin" size={16} />
                            ) : (
                                <FaPaperPlane size={16} />
                            )}
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-2 text-center">
                        Press Enter to send • Shift+Enter for new line
                    </p>
                </div>
            )}
        </>
    );
};

export default ChatContent;
