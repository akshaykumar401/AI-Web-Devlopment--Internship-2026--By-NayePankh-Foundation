import { useRef, useEffect, useState } from 'react'
import Chatbot from '../common/Chatbot'
import VolunteerForm from '../common/VolunteerForm'

const Join = () => {
  const ref = useRef()
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="Join" className="py-20 sm:py-28 bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* ── Left: Panah-AI Chat ── */}
        <div className={`transition-all duration-700 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <Chatbot />
        </div>

        {/* ── Right: Form ── */}
        <div className={`transition-all duration-700 delay-200 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <VolunteerForm />
        </div>

      </div>
    </section>
  )
}

export default Join