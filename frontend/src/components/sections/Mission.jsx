import { useRef, useEffect, useState } from 'react'
import MissionCard from '../common/MissionCard'

const CARDS = [
  {
    title: 'Digital Education',
    desc: 'Providing quality educational resources and digital literacy programs to remote communities using Panah AI tutor.',
    iconBg: 'bg-orange-50',
    icon: <i className="ri-book-open-line text-2xl text-orange-500" />,
  },
  {
    title: 'Universal Health',
    desc: 'Connecting AI to remote health diagnostics and connecting patients with unique specialist referrals.',
    iconBg: 'bg-sky-50',
    icon: <i className="ri-hospital-line text-2xl text-sky-500" />,
  },
  {
    title: 'Skill Empowerment',
    desc: 'Equipping local youth with future-proof skills to foster micro-entrepreneurs and financial independence.',
    iconBg: 'bg-emerald-50',
    icon: <i className="ri-line-chart-line text-2xl text-emerald-500" />,
  },
]

const Mission = () => {
  const ref = useRef()
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="Mission" className="py-20 sm:py-28 bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700
          ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Our Core Mission
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Rooted in the belief of social equity — every individual has the opportunity
            to thrive through technology-enabled grassroots initiatives.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((c, i) => (
            <MissionCard
              key={c.title}
              title={c.title}
              desc={c.desc}
              iconBg={c.iconBg}
              icon={c.icon}
              vis={vis}
              delay={vis ? `${0.15 + i * 0.12}s` : '0s'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mission