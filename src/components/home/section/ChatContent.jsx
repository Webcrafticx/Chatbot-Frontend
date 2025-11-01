import React, { useEffect, useState } from "react";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaQuestionCircle,
    FaEnvelope,
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

    // scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages, isLoading, mode, messagesEndRef]);

    // reset typing state whenever new messages arrive
    useEffect(() => {
        setIsTypingDone(false);
    }, [messages]);

    return (
        <>
            {/* Messages area */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-5 md:p-6 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-end gap-2 mb-4 ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {/* Bot Side */}
                            {msg.sender === "bot" && (
                                <>
                                    {/* Avatar on Left */}
                                    <div className="flex-shrink-0 self-end">
                                        {slugData?.chatbot?.logoUrl ? (
                                            <img
                                                src={slugData.chatbot.logoUrl}
                                                alt={
                                                    slugData?.chatbot
                                                        ?.companyName || "Bot"
                                                }
                                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-purple-500/50 shadow-md"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border border-purple-500/50 shadow-md">
                                                <FaRobot className="text-white text-sm" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/60 text-gray-200 rounded-2xl rounded-tl-none px-4 sm:px-5 py-3 shadow-md max-w-[80%] sm:max-w-[75%]">
                                        <div className="text-sm sm:text-base leading-relaxed text-justify">
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
                                                        // show FAQs after last message typed
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
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* User Side */}
                            {msg.sender === "user" && (
                                <>
                                    {/* Message Bubble */}
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-none px-4 sm:px-5 py-3 shadow-md max-w-[80%] sm:max-w-[75%]">
                                        <div className="text-sm sm:text-base leading-relaxed text-justify">
                                            {msg.text}
                                        </div>
                                    </div>

                                    {/* Avatar on Right */}
                                    <div className="flex-shrink-0 self-end">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border border-purple-500/50 shadow-md">
                                            <FaUser className="text-white text-sm" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {/* loading state */}
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

                    {/* FAQ section (only after typing completes) */}
                    {isTypingDone &&
                        mode === "suggestions" &&
                        faqs.length > 0 && (
                            <div className="bg-gray-800/70 border border-gray-700/50 rounded-3xl p-4 sm:p-5 shadow-xl backdrop-blur-md transition-all duration-700 animate-fadeIn">
                                <div className="flex items-center mb-3 sm:mb-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                        <FaQuestionCircle className="text-white text-xs sm:text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm sm:text-base">
                                            Frequently Asked Questions
                                        </p>
                                        <p className="text-gray-400 text-xs sm:text-sm">
                                            Choose a question or type your own
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    {faqs.slice(0, 5).map((faq, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleFaqSelect(faq)}
                                            className="block w-full text-left p-3 sm:p-4 bg-gray-900/60 hover:bg-gray-800 rounded-2xl transition-all duration-300 border border-gray-700 hover:border-purple-500/40 group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300 group-hover:text-white text-xs sm:text-sm font-medium flex-1">
                                                    {faq.question}
                                                </span>
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-700 rounded-full flex items-center justify-center ml-3 group-hover:bg-purple-600 transition-colors">
                                                    <svg
                                                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 group-hover:text-white"
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
                                        className="block w-full text-left p-3 sm:p-4 bg-gray-900/60 hover:bg-gray-800 rounded-2xl transition-all duration-300 border border-gray-700 hover:border-purple-500/40 group mt-3 sm:mt-4"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-600 transition-colors">
                                                <FaEnvelope className="text-gray-300 group-hover:text-white text-xs sm:text-sm" />
                                            </div>
                                            <span className="text-gray-300 font-medium text-xs sm:text-sm">
                                                My question is not listed
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input area */}
            {mode !== "form" && (
                <div className="p-3 sm:p-4 rounded-b-2xl border-t border-gray-700 bg-gray-900/70 backdrop-blur-md">
                    <div className="flex items-end border border-gray-700 rounded-2xl bg-gray-800/60 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 p-3 sm:p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`m-2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
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
                    <p className="text-gray-400 text-[11px] sm:text-xs mt-2 text-center">
                        Press Enter to send • Shift+Enter for new line
                    </p>
                </div>
            )}
        </>
    );
};

export default ChatContent;
