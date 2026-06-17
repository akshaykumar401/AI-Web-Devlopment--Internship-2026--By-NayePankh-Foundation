const FloatingBadge = ({ count, label, iconClass, className }) => {
  return (
    <div className={`absolute flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/60 ${className}`}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
        <i className={`${iconClass} text-white text-base leading-none`} />
      </div>
      <div>
        <p className="text-base font-black text-gray-900 leading-none"
           style={{ fontFamily: 'Outfit, sans-serif' }}>{count}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  )
}

export default FloatingBadge
