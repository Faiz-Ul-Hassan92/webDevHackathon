"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface InterviewModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  jobId: number
}

interface Message {
  role: "user" | "assistant"
  content: string
  id: string
}

export default function InterviewModal({ isOpen, onClose, jobTitle, jobId }: InterviewModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize interview on first open
  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeInterview()
      setIsInitialized(true)
    }
  }, [isOpen])

  const initializeInterview = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, jobId }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages([
          {
            role: "assistant",
            content: data.initialMessage,
            id: "1",
          },
        ])
      }
    } catch (error) {
      console.error("Failed to initialize interview:", error)
      setMessages([
        {
          role: "assistant",
          content: "Sorry, I couldn't start the interview. Please try again.",
          id: "error",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const userMessageId = Date.now().toString()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage, id: userMessageId }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          jobTitle,
          jobId,
          conversationHistory: messages,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
            id: Date.now().toString(),
          },
        ])
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered an error. Please try again.",
          id: "error-" + Date.now(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle>Interview for {jobTitle}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden flex flex-col py-4">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Interviewer is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
