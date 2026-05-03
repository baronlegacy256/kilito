"use client";

import React, { useState, useRef, useEffect } from "react";
import { Drawer, Button, Input, Spin } from "antd";
import {
  MessageOutlined,
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Jambo! Welcome to Kili to Savanna. How can I help you plan your Tanzanian adventure today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const playPing = () => {
    try {
      if (typeof window === "undefined") return;
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(293.66, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.6);
      osc2.stop(ctx.currentTime + 0.6);
    } catch (err) {
      console.log("Web Audio playback skipped/blocked by browser policy", err);
    }
  };

  useEffect(() => {
    // Play a subtle ping when component mounts
    const timeout = setTimeout(() => {
      playPing();
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
      playPing(); // Notification sound when AI replies
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Toggle Button & Initial Notification Popup */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {showPopup && !isOpen && (
          <div
            style={{
              backgroundColor: "white",
              color: "#333",
              padding: "12px 18px",
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              border: "1px solid #ffd591",
              marginBottom: "14px",
              fontSize: "14px",
              maxWidth: "240px",
              position: "relative",
              animation: "bounce 2s infinite ease-in-out",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                color: "#ffae3b",
                marginRight: "4px",
              }}
            >
              Jambo!
            </span>
            <span>Have any questions? 👋</span>
            <CloseCircleOutlined
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(false);
              }}
              style={{
                color: "#ffae3b",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "2px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                right: "22px",
                width: "16px",
                height: "16px",
                backgroundColor: "white",
                borderRight: "1px solid #ffd591",
                borderBottom: "1px solid #ffd591",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        )}

        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined style={{ fontSize: "24px" }} />}
          size="large"
          onClick={toggleChat}
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffae3b",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            border: "none",
          }}
        />
      </div>

      {/* Ant Design Drawer for Chat */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/favicon.png"
              alt="Logo"
              style={{ width: "24px", height: "24px" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span style={{ color: "#ffae3b", fontWeight: "bold" }}>
              Kili to Savanna AI Assistant
            </span>
          </div>
        }
        placement="right"
        onClose={toggleChat}
        open={isOpen}
        width={400}
        styles={{
          body: { display: "flex", flexDirection: "column", padding: 0 },
          header: { borderBottom: "1px solid #f0f0f0" },
        }}
        zIndex={10000}
      >
        {/* Messages Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f9fafb",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: "8px",
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      backgroundColor: "#ffae3b",
                      borderRadius: "50%",
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RobotOutlined
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  </div>
                )}

                <div
                  style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius: "16px",
                    borderBottomRightRadius:
                      msg.role === "user" ? "4px" : "16px",
                    borderBottomLeftRadius:
                      msg.role === "assistant" ? "4px" : "16px",
                    backgroundColor:
                      msg.role === "user" ? "#ffae3b" : "#ffffff",
                    color: msg.role === "user" ? "#ffffff" : "#333333",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    border:
                      msg.role === "assistant" ? "1px solid #e8e8e8" : "none",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <div
                    style={{
                      backgroundColor: "#fff7e6",
                      border: "1px solid #ffd591",
                      borderRadius: "50%",
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UserOutlined
                      style={{ color: "#ffae3b", fontSize: "14px" }}
                    />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffae3b",
                    borderRadius: "50%",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RobotOutlined style={{ color: "white", fontSize: "14px" }} />
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "16px",
                    borderBottomLeftRadius: "4px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e8e8e8",
                  }}
                >
                  <Spin size="small" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #f0f0f0",
            backgroundColor: "#ffffff",
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSubmit}
            placeholder="Type your question..."
            disabled={isLoading}
            size="large"
            suffix={
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                style={{ backgroundColor: "#ffae3b" }}
              />
            }
            style={{ borderRadius: "20px" }}
          />
        </div>
      </Drawer>

      {/* Bounce animation styles for attention grabbing popup */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </>
  );
}
