import { useRef, useEffect, useState } from 'react'
import MatchDemo from '../common/MatchDemo'
import BarChart from '../common/BarChart'

/* ── Small icon components (Remix Icons) ─────────────── */
const SearchIcon = () => <i className="ri-search-2-line text-xl" />
const ChartIcon  = () => <i className="ri-bar-chart-2-line text-xl" />
const ChatIcon   = () => <i className="ri-message-2-line text-xl" />
const ClockIcon  = () => <i className="ri-time-line text-xl" />

const AITools = () => {
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

  const fadeCard = (delay = 0) =>
    `transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <section ref={ref} id="AITool" className="py-20 sm:py-28 bg-gray-50 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center
                         gap-4 mb-14 ${fadeCard()}`}>
          <div>
            <div className="badge mb-4">
              <i className="ri-flashlight-line text-sm" />
              AI For Good
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Technology for Social Change
            </h2>
            <p className="text-sm text-gray-500 mt-3 max-w-sm leading-relaxed">
              Harnessing transparency and efficiency for real social impact.
            </p>
          </div>

          {/* Live badge */}
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shrink-0"
               style={{ background: '#1A1A2E' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 anim-pulse-dot" />
            100% On-Chain Tracking
          </div>
        </div>

        {/* Bento grid — stacks on mobile, 2-col on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Smart Matching */}
            <div className={`rounded-2xl p-6 sm:p-7 border ${fadeCard()} delay-100`}
                 style={{ background: '#FFF8F5', borderColor: 'rgba(232,93,4,0.18)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                  <SearchIcon />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Smart Matching</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connects volunteers and social resources with specific district needs in
                real-time, ensuring peak impact and minimum risk.
              </p>
              <MatchDemo />
            </div>

            {/* 24/7 Support */}
            <div className={`bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 ${fadeCard()} delay-300`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <ChatIcon />
                </div>
                <h3 className="text-base font-bold text-gray-900">24/7 Smart Support</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Localized AI response systems providing answers to volunteers and supporters
                in 22 regional languages.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Impact Analytics (dark) */}
            <div className={`rounded-2xl p-6 sm:p-7 ${fadeCard()} delay-200`}
                 style={{ background: '#1A1A2E' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-orange-500"
                     style={{ background: 'rgba(232,93,4,0.2)' }}>
                  <ChartIcon />
                </div>
                <h3 className="text-lg font-bold text-white">Impact Analytics</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Real-time data visualization of social progress across 48+ government districts.
              </p>
              <BarChart />
            </div>

            {/* Predictive Modeling */}
            <div className={`bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 flex items-start gap-4 ${fadeCard()} delay-400`}>
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <ClockIcon />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Predictive Modeling</h3>
                <span className="inline-block text-xs font-bold text-emerald-500 tracking-wide mb-2">
                  COMING SOON
                </span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Predicting social crises before they happen using big data and machine learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AITools