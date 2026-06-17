const MatchDemo = () => (
  <div className="mt-4">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-11 h-6 rounded-full flex items-center justify-end pr-1"
           style={{ background: '#E85D04' }}>
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
      <div className="w-11 h-6 bg-gray-200 rounded-full flex items-center pl-1">
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
      <span className="text-xs text-gray-400">1 / 124</span>
    </div>
    {['Match Score: 94%', 'Location: Bihar', 'Skills: Teaching'].map(t => (
      <div key={t} className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2 mb-1.5 text-xs text-gray-700">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
        {t}
      </div>
    ))}
  </div>
)

export default MatchDemo
