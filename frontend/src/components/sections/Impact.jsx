import { useRef, useEffect, useState } from 'react'
import StatCard from '../common/StatCard'
import ProgressBar from '../common/ProgressBar'

const STATS = [
  { value: 5300, suffix: '+', label: 'Volunteers', color: 'text-orange-500' },
  { value: 48, suffix: '', label: 'Districts Covered', color: 'text-sky-500' },
  { value: 12000, suffix: '+', label: 'Lives Impacted', color: 'text-emerald-500' },
  { value: 95, suffix: '%', label: 'Success Rate', color: 'text-amber-500' },
]

const BARS = [
  { label: 'Education Reach', pct: 82, bar: 'bg-orange-500', txt: 'text-orange-500' },
  { label: 'Healthcare Access', pct: 68, bar: 'bg-sky-500', txt: 'text-sky-500' },
  { label: 'Skill Development', pct: 74, bar: 'bg-emerald-500', txt: 'text-emerald-500' },
  { label: 'Financial Literacy', pct: 55, bar: 'bg-amber-500', txt: 'text-amber-500' },
]

const Impact = () => {
  const ref = useRef()
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="Impact"
      className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-14 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <div className="badge mb-4">
              <i className="ri-bar-chart-fill text-sm" />
              Our Impact
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Measurable, Real Change
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed sm:text-right">
            Every number represents a life touched, a community strengthened.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {STATS.map((s, i) => (
            <div key={s.label}
              className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <StatCard stat={s} active={vis} />
            </div>
          ))}
        </div>

        {/* Progress Card */}
        <div className={`bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.45s' }}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-7">
            Program Reach Across Districts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-12">
            {BARS.map((b, i) => (
              <ProgressBar
                key={b.label}
                label={b.label}
                pct={b.pct}
                barClass={b.bar}
                txtClass={b.txt}
                active={vis}
                delay={`${0.55 + i * 0.15}s`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact