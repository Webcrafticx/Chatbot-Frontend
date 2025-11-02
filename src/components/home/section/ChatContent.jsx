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
                            <div className="flex flex-col items-start space-y-3 sm:space-y-4 mt-3 animate-fadeIn">
                                {faqs.slice(0, 5).map((faq, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFaqSelect(faq)}
                                        className="px-4 py-2 sm:px-5 sm:py-3 border border-blue-400/60 text-blue-300 hover:text-white hover:border-blue-500 transition-all duration-300 rounded-lg text-sm sm:text-base w-fit font-medium hover:bg-blue-500/10"
                                    >
                                        {faq.question}
                                    </button>
                                ))}

                                <button
                                    onClick={handleNotInScope}
                                    className="px-4 py-2 sm:px-5 sm:py-3 border border-gray-500/60 text-gray-300 hover:text-white hover:border-purple-500 transition-all duration-300 rounded-lg text-sm sm:text-base w-fit font-medium hover:bg-purple-600/10"
                                >
                                    My question is not listed
                                </button>
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
