import React, { useState, useEffect, useRef } from 'react'
import { Menu, User, LogOut, Send, Sparkles, Sun, Moon, Brain, Cpu, Wifi, WifiOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

const ParticleBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    const particleCount = 150

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle, index) => {
        const distanceToCenter = Math.sqrt(
          Math.pow(particle.x - canvas.width / 2, 2) + Math.pow(particle.y - canvas.height / 2, 2)
        )
        const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))
        const opacity = 1 - distanceToCenter / maxDistance

        ctx.fillStyle = isDarkMode
          ? `rgba(255, 255, 255, ${0.2 * opacity + Math.sin(Date.now() * 0.001 + index) * 0.1})`
          : `rgba(0, 0, 0, ${0.15 * opacity + Math.sin(Date.now() * 0.001 + index) * 0.05})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isDarkMode])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

const TypingEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  const index = useRef(0)

  useEffect(() => {
    if (index.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + text[index.current])
        index.current += 1
      }, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [displayText, text])

  return <>{displayText}</>
}

export default function Component() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Esta es una respuesta de ejemplo del asistente IA. Puedo proporcionar información sobre diversos temas relacionados con la inteligencia artificial y el aprendizaje automático.' }])
        setIsTyping(false)
      }, 2000)
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-100 to-white'} flex items-center justify-center p-4 transition-colors duration-300`}>
      <ParticleBackground isDarkMode={isDarkMode} />
      <Card className={`w-full max-w-4xl mx-auto shadow-2xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-lg border border-gray-200 transition-all duration-300 hover:border-gray-300`}>
        <CardHeader className={`flex justify-between items-center ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} ${isDarkMode ? 'text-white' : 'text-gray-800'} p-4 rounded-t-xl`}>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={`${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-200/50'} transition-colors`}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-800'} border-gray-200`}>
                <DropdownMenuItem className={`${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>Manual</DropdownMenuItem>
                <DropdownMenuItem className={`${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>Productos</DropdownMenuItem>
                <DropdownMenuItem className={`${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>Soporte</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="font-bold text-xl tracking-wider">DAVOM IA</span>
            {isOnline ? (
              <Badge variant="secondary" className="bg-green-500/80 text-white">
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-500/80 text-white">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-gray-600"
              />
              <Moon className="h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className={`${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-200/50'} transition-colors`}>
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
            <Button variant="ghost" size="icon" className={`${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-200/50'} transition-colors`}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className={`flex flex-col items-center justify-center p-8 relative overflow-hidden ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <div className="relative z-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-xl animate-pulse">
            <div className={`w-36 h-36 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center shadow-inner`}>
              <div className="relative w-24 h-24">
                <Brain className="w-full h-full text-blue-300" />
                <Cpu className="w-1/2 h-1/2 text-blue-500 absolute top-1/4 left-1/4 animate-spin-slow" />
              </div>
            </div>
            <div className="absolute -inset-1 bg-blue-500 opacity-30 blur-xl rounded-full"></div>
          </div>
          <ScrollArea className="w-full h-64 mb-4 pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div 
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-200 text-gray-800'
                  } animate-fadeIn`}
                >
                  {message.role === 'assistant' ? <TypingEffect text={message.content} /> : message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <div className={`inline-block p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <span className="inline-block w-2 h-2 bg-current rounded-full mr-1 animate-bounce"></span>
                  <span className="inline-block w-2 h-2 bg-current rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </ScrollArea>
          <div className="w-full max-w-2xl relative">
            <Input
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} backdrop-blur-sm placeholder-gray-400 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-full py-6 pl-6 pr-12 transition-all duration-300`}
            />
            <Sparkles className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-4">
          <Button 
            onClick={handleSend} 
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            Generar respuesta
            <Send className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
