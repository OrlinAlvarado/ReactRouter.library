"use client"

import { useState, type FormEvent } from "react"
import { useParams } from "react-router"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getClientMessages, sendMessage } from "@/fake/fake-data"
import type { Message } from "../interfaces/chat.interface"

export default function ChatPage() {
  const { clientId } = useParams()
  const queryClient = useQueryClient()
  const [input, setInput] = useState("")
  
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', clientId],
    queryFn: () =>  getClientMessages(clientId ?? ''),
    enabled: !!clientId
  })

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData(['messages', clientId], (oldMessages: Message[]) => [...oldMessages, newMessage])
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')

    sendMessageMutation({
      clientId: clientId ?? '',
      content: input,
      createdAt: new Date(),
      sender: 'agent'
    })
    setInput('')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-gray-500 text-lg">Cargando mensajes...</span>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">

      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="h-10 w-10 text-gray-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" />
          </svg>
          <span className="text-gray-500 text-base">No hay mensajes para mostrar.</span>
        </div>
      )}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "client" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">{message.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">{message.createdAt.toLocaleDateString() }</span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2" type="submit">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

