import { useEffect, useState } from 'react'

function useCount(target, active, dur = 1800) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step = Math.ceil(target / (dur / 16))
    const t = setInterval(() => {
      v += step
      if (v >= target) { setN(target); clearInterval(t) }
      else setN(v)
    }, 16)
    return () => clearInterval(t)
  }, [active, target, dur])
  return n
}

const StatCard = ({ stat, active }) => {
  const n = useCount(stat.value, active)
  return (
    <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 card-hover">
      <p className={`text-4xl sm:text-5xl font-black leading-none mb-2 ${stat.color}`}
        style={{ fontFamily: 'Outfit, sans-serif' }}>
        {n.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
    </div>
  )
}

export default StatCard
