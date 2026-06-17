import { useRef, useEffect, useState } from 'react'

const INITIAL_CHAT = [
  { from: 'ai', text: "Namaste! I am Panah-AI, your digital assistant for NayePankh Foundation. How can I help you today? 🙏" },
  { from: 'ai', text: "You can ask me about:\n• How to volunteer 🙋‍♂️\n• Active programs & campaigns 📚\n• How to donate 🤝\n• Contact details 📞" }
]

const SUGGESTIONS = [
  "How to volunteer? 🙋‍♂️",
  "Active projects? 📚",
  "How to donate? 🤝",
  "How to contact? 📞"
]

const getAIResponse = (text) => {
  const t = text.toLowerCase();
  if (t.includes('volunteer') || t.includes('join') || t.includes('changemaker')) {
    return "To volunteer, you can fill out the 'Become a Changemaker' form right next to this chat! Select your area of interest (like Digital Literacy or Rural Education) and click 'Send Application'. Our team will reach out within 24-48 hours. 🎉";
  }
  if (t.includes('donate') || t.includes('money') || t.includes('support') || t.includes('contribution')) {
    return "Thank you for your generosity! You can support us by donating through our secure portal (link in the header) or scanning the QR code in our campaigns. Every contribution goes toward positive social change. 🤝";
  }
  if (t.includes('project') || t.includes('program') || t.includes('work') || t.includes('campaign')) {
    return "Our active projects include:\n• Rural Education: Supporting primary schools.\n• Digital Literacy: Building computer labs.\n• Skill Development: Job training for youth.\n• Healthcare & Environment campaigns.";
  }
  if (t.includes('contact') || t.includes('email') || t.includes('phone') || t.includes('where') || t.includes('address')) {
    return "You can contact NayePankh Foundation at support@nayepankh.org, or call us at +91-XXXXXXXXXX. Our main office is located in Noida, UP, India. We'd love to connect! 📞";
  }
  return "That's interesting! NayePankh Foundation is dedicated to bringing positive social change through technology. You can join our 5,300+ volunteers by filling out the form on the right, or ask me something else! 🌟";
}

const Chatbot = () => {
  const chatContainerRef = useRef()
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState(INITIAL_CHAT)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isTyping])

  const handleSend = (textToSend) => {
    const trimmed = textToSend.trim()
    if (!trimmed) return

    // Add user message
    const userMsg = { from: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setMsg('')

    // Trigger AI typing
    setIsTyping(true)

    setTimeout(() => {
      const aiReplyText = getAIResponse(trimmed)
      const aiReply = { from: 'ai', text: aiReplyText }
      setMessages(prev => [...prev, aiReply])
      setIsTyping(false)
    }, 850)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(msg)
    }
  }

  return (
    <div className="flex flex-col h-[520px] rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 shrink-0" style={{ background: '#1A1A2E' }}>
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
            <i className="ri-flashlight-fill text-white text-base leading-none" />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-900" />
        </div>
        <div>
          <p className="font-bold text-white text-sm">Talk to Panah-AI</p>
          <p className="text-xs text-gray-400">
            <span className="text-emerald-400">●</span> Online & Ready to Assist
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-gray-50 p-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {m.from === 'ai' && (
              <div className="w-7 h-7 rounded-lg shrink-0 mt-0.5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
                <i className="ri-flashlight-fill text-white" style={{ fontSize: '11px' }} />
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl shadow-sm whitespace-pre-line
              ${m.from === 'user'
                ? 'bg-orange-500 text-white rounded-tr-sm'
                : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start gap-2">
            <div className="w-7 h-7 rounded-lg shrink-0 mt-0.5 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
              <i className="ri-flashlight-fill text-white" style={{ fontSize: '11px' }} />
            </div>
            <div className="bg-white border border-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div className="bg-gray-50 px-5 py-2 border-x border-gray-200 flex flex-wrap gap-2 shrink-0">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="text-xs bg-white text-gray-600 hover:text-orange-500 hover:border-orange-500 px-3 py-1.5 rounded-full border border-gray-200 transition-all cursor-pointer shadow-sm"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 border-t px-4 py-3 shrink-0">
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question…"
          className="flex-1 text-sm outline-none text-gray-700 bg-transparent placeholder-gray-400"
        />
        <button
          onClick={() => handleSend(msg)}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white transition-all hover:-translate-y-0.5 cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}
        >
          <i className="ri-send-plane-fill text-sm" />
        </button>
      </div>
    </div>
  )
}

export default Chatbot
