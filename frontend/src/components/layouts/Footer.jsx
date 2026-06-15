const QUICK   = ['About Us', 'Careers', 'Impact Stories']
const RESOURCES = ['Transparency Report', 'Volunteer Portal', 'Privacy Policy']
const CONTACT = [
  { icon: '💬', text: 'Contact Support' },
  { icon: '✉️', text: 'support@nayepankh.org' },
  { icon: '📞', text: '+91 1800-WING01' },
]

const SocialLink = ({ children }) => (
  <a href="#"
     className="w-9 h-9 rounded-lg border border-white/10 bg-white/5
                flex items-center justify-center text-gray-400
                transition-all hover:text-orange-500 hover:bg-orange-500/10
                hover:border-orange-500/30 no-underline">
    {children}
  </a>
)

const FooterLink = ({ children }) => (
  <li>
    <a href="#"
       className="text-sm text-gray-400 hover:text-orange-500 transition-colors no-underline">
      {children}
    </a>
  </li>
)

const Footer = () => (
  <footer className="py-14 sm:py-16 px-4 sm:px-6" style={{ background: '#1A1A2E' }}>
    <div className="max-w-6xl mx-auto">

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg,#E85D04,#F48C06)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L13.5 8H20L14.75 12L16.5 18L12 14.5L7.5 18L9.25 12L4 8H10.5L12 2Z"/>
              </svg>
            </div>
            <span className="font-extrabold text-xl text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>
              Naye<span style={{ color: '#E85D04' }}>Pankh</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
            Bridging the gap between grassroots activism and technology with
            data-driven solutions for sustainable social impact.
          </p>
          <div className="flex gap-2.5">
            <SocialLink>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </SocialLink>
            <SocialLink>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </SocialLink>
            <SocialLink>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </SocialLink>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {QUICK.map(l => <FooterLink key={l}>{l}</FooterLink>)}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-5">
            Resources
          </h4>
          <ul className="space-y-3">
            {RESOURCES.map(l => <FooterLink key={l}>{l}</FooterLink>)}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-5">
            Contact
          </h4>
          <div className="space-y-3">
            {CONTACT.map(c => (
              <div key={c.text} className="flex items-center gap-2.5">
                <span className="text-sm">{c.icon}</span>
                <span className="text-sm text-gray-400">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/8 mb-6" />

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-gray-600 text-center sm:text-left">
          © 2024 NayePankh Foundation. Bridging the gap with AI.
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="w-2 h-2 rounded-full bg-emerald-400 anim-pulse-dot" />
          Systems Operational
        </div>
      </div>
    </div>
  </footer>
)

export default Footer