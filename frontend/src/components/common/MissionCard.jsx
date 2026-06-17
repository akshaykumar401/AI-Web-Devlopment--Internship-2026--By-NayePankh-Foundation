const MissionCard = ({ title, desc, iconBg, icon, vis, delay }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-7 border border-gray-100
                  card-hover cursor-default transition-all duration-700
                  ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: delay }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

export default MissionCard
