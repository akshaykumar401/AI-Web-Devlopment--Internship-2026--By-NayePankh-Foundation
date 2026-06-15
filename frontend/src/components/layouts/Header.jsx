import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', href: '#Hero' },
  { label: 'Mission', href: '#Mission' },
  { label: 'Impact', href: '#Impact' },
  { label: 'AI Tools', href: '#AITool' },
  { label: 'Join', href: '#Join' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/90 backdrop-blur-sm'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
               style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
            <i className="ri-sparkling-2-fill text-white text-base leading-none" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
            Naye<span style={{ color: '#E85D04' }}>Pankh</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
               className="px-4 py-2 text-sm font-medium text-gray-500 rounded-lg
                          transition-colors hover:text-orange-600 hover:bg-orange-50 no-underline">
              {l.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop Actions ── */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#Join" className="btn-primary !py-2.5 !px-5 !text-xs !font-bold !rounded-xl">
            DONATE
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50
                     hover:text-orange-600 transition-colors"
          aria-label="Toggle menu"
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl leading-none`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 pb-4 pt-2">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
               onClick={() => setMenuOpen(false)}
               className="block py-3 text-sm font-medium text-gray-700 border-b border-gray-50
                          hover:text-orange-600 transition-colors no-underline">
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            <a href="#Join" className="btn-primary flex-1 justify-center !text-sm">DONATE</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header