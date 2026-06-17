import { useState } from 'react'

const AREAS = ['Digital Literacy', 'Healthcare', 'Skill Development', 'Rural Education', 'Environment']

const VolunteerForm = () => {
  const [form, setForm] = useState({ name: '', email: '', area: AREAS[0] })
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email) setDone(true)
  }

  const inputCls = `w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100`

  return (
    <div>
      <div className="badge mb-5">
        <i className="ri-group-line text-sm" />
        Join the Movement
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
        Become a Changemaker
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        Join a community of 5,300+ volunteers dedicated to creating equitable
        solutions for age-old problems.
      </p>

      {done ? (
        <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100">
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome aboard! 🎉</h3>
          <p className="text-sm text-gray-500">
            We'll reach out to <strong>{form.email}</strong> shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Arjun Kumar"
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="arjun@impact.org"
                required
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Area of Interest</label>
            <select
              value={form.area}
              onChange={e => setForm({ ...form, area: e.target.value })}
              className={`${inputCls} cursor-pointer appearance-none`}
            >
              {AREAS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-primary w-full justify-center !py-4 !text-sm cursor-pointer">
            Send Application
            <i className="ri-send-plane-fill text-sm" />
          </button>

          <p className="text-xs text-gray-400 text-center">
            By clicking, you agree to our{' '}
            <a href="#" className="text-orange-500 hover:underline">privacy policy</a>.
          </p>
        </form>
      )}
    </div>
  )
}

export default VolunteerForm
