const BarChart = () => (
  <div className="flex items-end gap-2 h-20 mt-4">
    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
      <div key={i} className="flex-1 rounded-t-sm"
           style={{
             height: `${h}%`,
             background: i === 5 ? '#E85D04' : i === 6 ? 'rgba(232,93,4,0.4)' : 'rgba(255,255,255,0.12)',
           }} />
    ))}
  </div>
)

export default BarChart
