// ChatContent.jsx
import React from "react";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaQuestionCircle,
    FaEnvelope,
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
    return (
        <>
            {/* Chat Messages Section */}
            <div className="overflow-y-auto bg-gray-50 space-y-4 p-4 h-96">
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
                            {msg.sender === "bot" &&
                                !slugData?.chatbot?.logoUrl && (
                                    <FaRobot
                                        className="mr-2 text-blue-500 flex-shrink-0 mt-1"
                                        size={16}
                                    />
                                )}
                            {msg.sender === "bot" &&
                                slugData?.chatbot?.logoUrl && (
                                    <img
                                        src={slugData.chatbot.logoUrl}
                                        alt={
                                            slugData?.chatbot?.companyName ||
                                            "Company"
                                        }
                                        className="w-4 h-4 rounded-full mr-2 mt-1 object-cover flex-shrink-0"
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

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                            <div className="flex items-center">
                                {slugData?.chatbot?.logoUrl ? (
                                    <img
                                        src={slugData.chatbot.logoUrl}
                                        alt={
                                            slugData?.chatbot?.companyName ||
                                            "Company"
                                        }
                                        className="w-4 h-4 rounded-full mr-2 object-cover"
                                    />
                                ) : (
                                    <FaRobot
                                        className="mr-2 text-blue-500"
                                        size={16}
                                    />
                                )}
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Suggestions */}
                {mode === "suggestions" && faqs.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                            <FaQuestionCircle className="text-blue-500 mr-2" />
                            <p className="font-medium text-gray-700 text-sm">
                                How else can I help you?
                            </p>
                        </div>
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
                                className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 text-gray-700 text-sm mt-2 flex items-center"
                            >
                                <FaEnvelope className="mr-2" size={12} />
                                My question is not listed
                            </button>
                        </div>
                    </div>
                )}

                {/* Contact Form */}
                {mode === "form" && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                            <FaEnvelope className="text-blue-500 mr-2" />
                            <p className="font-medium text-gray-700 text-sm">
                                Please share your details:
                            </p>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Your Name"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                placeholder="Your Email"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {/* 🔹 Phone Number */}
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleFormChange}
                                placeholder="Your Phone Number"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleFormChange}
                                placeholder="Your Message"
                                required
                                rows="2"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium ${
                                        isLoading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                    }`}
                                >
                                    {isLoading ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            <FaPaperPlane
                                                className="mr-2 inline"
                                                size={12}
                                            />
                                            Submit Request
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode("suggestions")}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
                                >
                                    Back to Menu
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
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
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`px-4 rounded-r-lg flex items-center justify-center transition-all ${
                                input.trim() && !isLoading
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            <FaPaperPlane size={14} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatContent;
