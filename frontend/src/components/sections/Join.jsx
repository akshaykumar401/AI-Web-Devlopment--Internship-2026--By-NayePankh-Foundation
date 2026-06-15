import { useRef, useEffect, useState } from 'react'

const AREAS = ['Digital Literacy', 'Healthcare', 'Skill Development', 'Rural Education', 'Environment']

const CHAT = [
  { from: 'ai', text: "Namaste! I am Panah-AI. How can I help you? I'm here to support you today!" },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
  { from: 'user', text: "I want to know how I can volunteer." },
  { from: 'ai', text: "That's great! You can register as a changemaker right here on the page, or learn about specific projects near you." },
]

const Join = () => {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', area: AREAS[0] })
  const [done, setDone] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email) setDone(true)
  }

  const inputCls = `w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100`

  return (
    <section ref={ref} id="Join" className="py-20 sm:py-28 bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* ── Left: Panah-AI Chat ── */}
        <div className={`transition-all duration-700
          ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 rounded-t-2xl"
            style={{ background: '#1A1A2E' }}>
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
          <div className="bg-gray-50 border-x border-gray-200 p-5 min-h-56 space-y-3">
            {CHAT.map((m, i) => (
              <div key={i}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {m.from === 'ai' && (
                  <div className="w-7 h-7 rounded-lg shrink-0 mt-0.5 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
                    <i className="ri-flashlight-fill text-white" style={{ fontSize: '11px' }} />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl shadow-sm
                  ${m.from === 'user'
                    ? 'bg-orange-500 text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 border-t-0
                           rounded-b-2xl px-4 py-3">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 text-sm outline-none text-gray-700 bg-transparent
                         placeholder-gray-400"
            />
            <button
              onClick={() => setMsg('')}
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                         text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}
            >
              <i className="ri-send-plane-fill text-sm" />
            </button>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className={`transition-all duration-700 delay-200
          ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>

          <div className="badge mb-5">
            <i className="ri-group-line text-sm" />
            Join the Movement
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            Become a Changemaker
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Join a community of 5,300+ volunteers dedicated to creating equitable
            solutions for age-old problems.
          </p>

          {done ? (
            <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center
                              justify-center mx-auto mb-4">
                <i className="ri-check-line text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome aboard! 🎉</h3>
              <p className="text-sm text-gray-500">
                We'll reach out to <strong>{form.email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Arjun Kumar"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="arjun@impact.org"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Area of Interest</label>
                <select
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                  className={`${inputCls} cursor-pointer appearance-none`}
                >
                  {AREAS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <button type="submit" className="btn-primary w-full justify-center !py-4 !text-sm">
                Send Application
                <i className="ri-send-plane-fill text-sm" />
              </button>

              <p className="text-xs text-gray-400 text-center">
                By clicking, you agree to our{' '}
                <a href="#" className="text-orange-500 hover:underline">privacy policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Join