// ChatContent.jsx
import React, { useEffect, useState } from "react";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaQuestionCircle,
    FaEnvelope,
    FaArrowLeft,
    FaSpinner,
} from "react-icons/fa";
import { ReactTyped } from "react-typed";

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
    const [isTypingDone, setIsTypingDone] = useState(false);

    // Scroll to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages, isLoading, mode]);

    // Reset typing state when new message arrives
    useEffect(() => {
        setIsTypingDone(false);
    }, [messages]);

    return (
        <>
            {/* Chat Messages Section */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                    {/* Chat Messages */}
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
                                className={`flex max-w-[90%] md:max-w-[85%] rounded-3xl px-5 py-3 shadow-lg transition-all duration-300 ${
                                    msg.sender === "user"
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                                        : "bg-gray-800/70 backdrop-blur-md border border-gray-700/60 text-gray-200 rounded-bl-md"
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
                                                className="w-6 h-6 rounded-full object-cover border-2 border-purple-400/40"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <FaRobot className="text-white text-xs" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Message Text with typing effect */}
                                <div className="flex-1 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    {msg.sender === "bot" ? (
                                        <ReactTyped
                                            strings={[msg.text]}
                                            typeSpeed={25}
                                            backSpeed={0}
                                            showCursor={false}
                                            onComplete={() => {
                                                if (
                                                    index ===
                                                    messages.length - 1
                                                ) {
                                                    setTimeout(
                                                        () =>
                                                            setIsTypingDone(
                                                                true
                                                            ),
                                                        400
                                                    );
                                                }
                                            }}
                                        />
                                    ) : (
                                        msg.text
                                    )}
                                </div>

                                {/* User Avatar */}
                                {msg.sender === "user" && (
                                    <div className="flex-shrink-0 ml-3">
                                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
                            <div className="bg-gray-800/70 border border-gray-700/50 rounded-3xl p-4 shadow-md flex items-center space-x-3 text-gray-300">
                                <FaRobot className="text-purple-400" />
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.1s" }}
                                    />
                                    <div
                                        className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    />
                                </div>
                                <span className="text-sm ml-2">
                                    Thinking...
                                </span>
                            </div>
                        </div>
                    )}

                    {/* FAQ Suggestions */}
                    {isTypingDone &&
                        mode === "suggestions" &&
                        faqs.length > 0 && (
                            <div className="flex flex-col items-start space-y-3 sm:space-y-4 mt-2 animate-fadeIn">
                                {faqs.slice(0, 5).map((faq, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFaqSelect(faq)}
                                        className="cursor-pointer px-4 py-2 sm:px-5 sm:py-3 border border-blue-500/60 text-blue-400 hover:text-white hover:border-blue-500 transition-all duration-300 rounded-lg text-sm sm:text-base font-medium bg-transparent hover:bg-blue-500/10 w-fit"
                                    >
                                        {faq.question}
                                    </button>
                                ))}

                                <button
                                    onClick={handleNotInScope}
                                    className="cursor-pointer px-4 py-2 sm:px-5 sm:py-3 border border-gray-600/60 text-gray-300 hover:text-white hover:border-purple-500 transition-all duration-300 rounded-lg text-sm sm:text-base font-medium bg-transparent hover:bg-purple-600/10 w-fit"
                                >
                                    My question is not listed
                                </button>
                            </div>
                        )}

                    {/* Contact Form (Inline as Chat Bubble) */}
                    {mode === "form" && (
                        <div className="flex justify-start">
                            {/* Bot Avatar */}
                            <div className="flex-shrink-0 mr-3">
                                {slugData?.chatbot?.logoUrl ? (
                                    <img
                                        src={slugData.chatbot.logoUrl}
                                        alt={
                                            slugData?.chatbot?.companyName ||
                                            "Company"
                                        }
                                        className="w-7 h-7 rounded-full object-cover border-2 border-purple-400/40"
                                    />
                                ) : (
                                    <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <FaRobot className="text-white text-xs" />
                                    </div>
                                )}
                            </div>

                            {/* Form Bubble */}
                            <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700/60 text-white rounded-3xl rounded-tl-none p-5 shadow-lg max-w-[85%]">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <FaEnvelope className="text-purple-400 mr-2" />
                                        <h3 className="font-semibold text-white">
                                            Contact Form
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setMode("suggestions")}
                                        className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                                        title="Back"
                                    >
                                        <FaArrowLeft size={14} />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleFormSubmit}
                                    className="space-y-4 text-gray-200"
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Full Name *"
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        placeholder="Email Address *"
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleFormChange}
                                        placeholder="Phone Number *"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        placeholder="Please describe your question or concern..."
                                        rows="3"
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    />

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`cursor-pointer flex-1 px-5 py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 ${
                                                isLoading
                                                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
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
                                                    Submit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area */}
            {mode !== "form" && (
                <div className="p-4 rounded-b-2xl border-t border-gray-700 bg-gray-900/70 backdrop-blur-md">
                    <div className="flex items-end border border-gray-700 rounded-2xl bg-gray-800/60 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`cursor-pointer m-2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                input.trim() && !isLoading
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transform hover:scale-105"
                                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
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
