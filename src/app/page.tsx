'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, User, LogOut, Send, Sparkles, Sun, Moon, Brain, Cpu, Wifi, WifiOff, ChevronLeft, Search, Edit, Trash2, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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

const ProfileInterface = ({ isDarkMode, onClose }: { isDarkMode: boolean; onClose: () => void }) => {
  const [fallas, setFallas] = useState<{ id: number; descripcion: string; solucion: string }[]>([
    { id: 1, descripcion: "MEDIDA CORRECTA DEL RESORTE", solucion: "Para obtener la medida del resorte deberás utilizar la siguiente fórmula: medida del colchón en centímetros(cm) entre pockets. Ejemplo: Si el colchón mide 177cm de ancho por 27 pockets a lo ancho quedaría así: 177/27=6.5cm. Toma encuenta que esta solo es una referencia de donde podrás partir ya que requerirá algunos ajustes para que quede como se espera. - Para obtener la medida del resorte deberás utilizar la siguiente fórmula: (Tomar como base la ficha técnica) Dividir el ancho del colchón entre el número de resortes a lo ancho y te dará la medida del diámetro del resorte." },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newFalla, setNewFalla] = useState({ descripcion: "", solucion: "" });

  const filteredFallas = fallas.filter(falla => 
    falla.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    falla.solucion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageSize = 5;
  const pageCount = Math.ceil(filteredFallas.length / pageSize);
  const currentFallas = filteredFallas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleAddFalla = () => {
    if (newFalla.descripcion && newFalla.solucion) {
      setFallas([...fallas, { ...newFalla, id: fallas.length + 1 }]);
      setNewFalla({ descripcion: "", solucion: "" });
    }
  };

  const handleDeleteFalla = (id: number) => {
    setFallas(fallas.filter(falla => falla.id !== id));
  };

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} overflow-y-auto`}>
      <div className="container mx-auto p-4">
        <Button 
          onClick={onClose}
          className={`mb-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-primary`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver al chat
        </Button>
        <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>DAVOM IA</h1>
        <h2 className={`text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bienvenido, felix</h2>
        
        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Agregar Falla</h3>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Descripción de la falla"
              value={newFalla.descripcion}
              onChange={(e) => setNewFalla({...newFalla, descripcion: e.target.value})}
              className="mb-4"
            />
            <Textarea
              placeholder="Solución"
              value={newFalla.solucion}
              onChange={(e) => setNewFalla({...newFalla, solucion: e.target.value})}
              className="mb-4"
            />
            <Button onClick={handleAddFalla}>Guardar Falla</Button>
          </CardContent>
        </Card>
        
        <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardHeader>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Lista de Fallas</h3>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <Input
                placeholder="Buscar falla..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {currentFallas.map((falla) => (
              <div key={falla.id} className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{falla.descripcion}</h4>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{falla.solucion}</p>
                <div className="flex justify-end">
                  <Button variant="ghost" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDeleteFalla(falla.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center">
            {Array.from({ length: pageCount }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="mx-1"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const LoginPage = ({ isDarkMode, onLogin }: { isDarkMode: boolean; onLogin: () => void }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log('Login attempted with:', username, password)
    onLogin() // For now, we'll just call onLogin to simulate a successful login
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'} flex items-center justify-center p-4`}>
      <ParticleBackground isDarkMode={isDarkMode} />
      <Card className={`w-full max-w-md mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl backdrop-blur-lg border border-gray-200`}>
        <CardHeader className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gradient-to-br from-pink-500 to-orange-400'} animate-pulse`}></div>
            <div className={`absolute inset-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center`}>
              <Lock className={`w-12 h-12 ${isDarkMode ? 'text-purple-400' : 'text-pink-500'}`} />
            </div>
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Bienvenido a DAVOM IA</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Inicia sesión para continuar</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Usuario</label>
              <Input
                id="username"
                type="text"
                placeholder="Tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Contraseña</label>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
                required
              />
            </div>
            <Button 
              type="submit"
              className={`w-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500'} text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ¿Olvidaste tu contraseña? Contacta al administrador
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function Component() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Set to false initially in a real app
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

  if (!isLoggedIn) {
    return <LoginPage isDarkMode={isDarkMode} onLogin={() => setIsLoggedIn(true)} />;
  }

  if (showProfile) {
    return <ProfileInterface isDarkMode={isDarkMode} onClose={() => setShowProfile(false)} />;
  }

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
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-200/50'} transition-colors`}
              onClick={() => setShowProfile(true)}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-200/50'} transition-colors`}
              onClick={() => setIsLoggedIn(false)}
            >
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