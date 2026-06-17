const ProgressBar = ({ label, pct, barClass, txtClass, active, delay }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${txtClass}`}>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full prog-bar ${barClass}`}
          style={{
            width: active ? `${pct}%` : '0%',
            transitionDelay: delay
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
