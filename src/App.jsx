import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

/* ══════════════════════════════════════════════════════════════════
   THEME CONTEXT
   ══════════════════════════════════════════════════════════════════ */
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

/* ══════════════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════════════ */
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();
  useEffect(() => {
    if (!isVisible) return;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ══════════════════════════════════════════════════════════════════
   LOGO — SVG path extracted from uploaded files
   Dark mode  → white text   (from Goismo_v_1_Blue)
   Light mode → #0F2774 text (from Goismo_v_1_White)
   Uses inline `fill` — NO <style> tags (avoids SVG conflicts)
   ══════════════════════════════════════════════════════════════════ */
const LOGO_PATH = "M119.3 176H101.9C91.95 176 84.7 169.45 84.7 159.75C84.7 150.05 91.95 143.5 101.9 143.5H119.3V151.85H101.3C96.75 151.85 93.4 155.05 93.4 159.75C93.4 164.4 96.75 167.6 101.3 167.6H111V163.15H100.45V156.2H119.3V176ZM144.363 167.6H150.263C154.813 167.6 158.113 164.4 158.113 159.75C158.113 155.05 154.813 151.85 150.263 151.85H144.363C139.813 151.85 136.463 155.05 136.463 159.75C136.463 164.4 139.763 167.6 144.363 167.6ZM149.663 176H144.963C135.013 176 127.763 169.45 127.763 159.75C127.763 150.05 135.013 143.5 144.963 143.5H149.663C159.563 143.5 166.813 150.05 166.813 159.75C166.813 169.45 159.563 176 149.663 176ZM183.994 176H175.244V143.5H183.994V176ZM217.402 176H192.702V167.6H217.002C218.252 167.6 219.152 166.8 219.152 165.4C219.152 164 218.252 163.15 217.002 163.15H202.702C196.652 163.15 192.302 159.15 192.302 153.35C192.302 147.45 196.652 143.5 202.702 143.5H227.402V151.85H203.102C201.852 151.85 201.002 152.6 201.002 154C201.002 155.35 201.852 156.2 203.102 156.2H217.402C223.502 156.2 227.852 160.25 227.852 166.05C227.852 172.05 223.502 176 217.402 176ZM282.295 176H273.595L268.795 155.1L263.145 172.9C262.545 175 261.095 176 259.045 176H256.395C254.295 176 252.895 175 252.295 172.9L246.645 154.75L241.845 176H233.195L239.795 147.2C240.345 144.5 241.845 143.5 244.045 143.5H247.695C249.745 143.5 251.195 144.5 251.845 146.65L257.745 166.1L263.595 146.65C264.245 144.5 265.645 143.5 267.695 143.5H271.345C273.545 143.5 275.045 144.5 275.645 147.2L282.295 176ZM304.113 167.6H310.013C314.563 167.6 317.863 164.4 317.863 159.75C317.863 155.05 314.563 151.85 310.013 151.85H304.113C299.563 151.85 296.213 155.05 296.213 159.75C296.213 164.4 299.513 167.6 304.113 167.6ZM309.413 176H304.713C294.763 176 287.513 169.45 287.513 159.75C287.513 150.05 294.763 143.5 304.713 143.5H309.413C319.313 143.5 326.563 150.05 326.563 159.75C326.563 169.45 319.313 176 309.413 176Z";

/** Inline text-only logo — adapts fill to theme */
const GoismoLogo = ({ height = 28 }) => {
  const { isDark } = useTheme();
  return (
    <svg viewBox="80 138 252 44" style={{ height, display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <path d={LOGO_PATH} fill={isDark ? '#ffffff' : '#0F2774'} />
    </svg>
  );
};

/** Full badge with background — unique gradient ID per instance */
const GoismoLogoBadge = ({ size = 52 }) => {
  const { isDark } = useTheme();
  const uid = useRef(`lg${Math.random().toString(36).slice(2, 8)}`).current;

  if (isDark) {
    return (
      <svg viewBox="0 0 412 320" style={{ height: size, display: 'block', borderRadius: 12 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={uid} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(206 160) rotate(90) scale(160 206)">
            <stop stopColor="#0F2774" />
            <stop offset="1" stopColor="#041139" />
          </radialGradient>
        </defs>
        <rect width="412" height="320" rx="16" fill={`url(#${uid})`} />
        <path d={LOGO_PATH} fill="#ffffff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 412 320" style={{ height: size, display: 'block', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} xmlns="http://www.w3.org/2000/svg">
      <rect width="412" height="320" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
      <path d={LOGO_PATH} fill="#0F2774" />
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ══════════════════════════════════════════════════════════════════ */
const ShinyText = ({ children }) => (
  <span className="relative inline-block overflow-hidden">
    <span className="relative z-10">{children}</span>
    <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine pointer-events-none" style={{ transform: 'translateX(-100%)' }} />
  </span>
);

const GradientShinyText = ({ children, isDark }) => (
  <span className="relative inline-block overflow-hidden">
    <span
      className={`relative z-10 bg-gradient-to-r ${isDark ? 'from-white via-orange-500 to-blue-500' : 'from-gray-900 via-orange-500 to-blue-500'} bg-clip-text`}
      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}
    >
      {children}
    </span>
    <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine pointer-events-none z-20" style={{ transform: 'translateX(-100%)' }} />
  </span>
);

const GlassCard = ({ children, className = '', hover = true }) => {
  const { isDark } = useTheme();
  return (
    <div className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.07]'} ${hover ? `hover:-translate-y-1 hover:shadow-2xl ${isDark ? 'hover:bg-white/[0.06] hover:border-orange-500/30' : 'hover:bg-black/[0.05] hover:border-orange-500/50'}` : ''} ${className}`}>
      {children}
    </div>
  );
};

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/[0.06] hover:bg-white/[0.12] text-yellow-400' : 'bg-black/[0.05] hover:bg-black/[0.1] text-slate-700'}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
      )}
    </button>
  );
};

const Badge = ({ text }) => (
  <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-500 uppercase tracking-widest mb-4 font-semibold">
    {text}
  </span>
);

const Arrow = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════════════════════════════ */
const Navigation = ({ currentPage, setCurrentPage, scrolled }) => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const go = (id) => { setCurrentPage(id); setOpen(false); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? `${isDark ? 'bg-[#0D0D0D]/92' : 'bg-white/92'} backdrop-blur-xl py-3 shadow-lg ${isDark ? 'shadow-black/30' : 'shadow-black/5'}` : 'py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => go('home')}>
          <GoismoLogo height={26} />
        </div>

        {/* Desktop + mobile nav links */}
        <div className={`${open ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto ${isDark ? 'bg-[#0D0D0D]/98' : 'bg-white/98'} md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-6 md:p-0 gap-1 md:gap-1 items-stretch md:items-center border-b md:border-b-0 ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'}`}>
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              className={`text-sm font-medium py-3 md:py-2 px-4 rounded-lg transition-all relative ${currentPage === it.id
                ? (isDark ? 'text-white bg-white/[0.06]' : 'text-gray-900 bg-black/[0.04]')
                : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/[0.04]' : 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.03]')
              }`}
            >
              {it.label}
              {currentPage === it.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-orange-500 rounded-full hidden md:block" />
              )}
            </button>
          ))}
          <a
            href="https://goismo.com/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 md:mt-0 md:ml-3 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm font-semibold rounded-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-orange-500/20 text-center"
          >
            Sign Up
          </a>
          <div className="mt-3 md:mt-0 md:ml-2 flex justify-center">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button className="w-8 h-8 relative flex flex-col justify-center items-center gap-[5px]" onClick={() => setOpen(!open)}>
            <span className={`block w-5 h-0.5 rounded-full transition-all origin-center ${isDark ? 'bg-white' : 'bg-gray-900'} ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-0.5 rounded-full transition-all ${isDark ? 'bg-white' : 'bg-gray-900'} ${open ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-0.5 rounded-full transition-all origin-center ${isDark ? 'bg-white' : 'bg-gray-900'} ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ══════════════════════════════════════════════════════════════════
   HOME — HERO SECTION
   ══════════════════════════════════════════════════════════════════ */
const HeroSection = ({ setCurrentPage }) => {
  const { isDark } = useTheme();
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);

  useEffect(() => {
    const h = (e) => {
      setMx((e.clientX / window.innerWidth) * 100);
      setMy((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,87,34,0.03)' : 'rgba(255,87,34,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,87,34,0.03)' : 'rgba(255,87,34,0.07)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-40 -top-48 -right-24"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(255,87,34,0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,87,34,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translate(${mx * 0.02}px, ${my * 0.02}px)`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-40 -bottom-24 -left-24"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(30,144,255,0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(30,144,255,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translate(${-mx * 0.03}px, ${my * 0.01}px)`,
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pill badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2 border rounded-full text-sm mb-8 animate-fadeInUp ${isDark ? 'bg-white/[0.04] border-white/[0.1] text-gray-300' : 'bg-black/[0.03] border-black/[0.08] text-gray-600'}`}>
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          Privacy · Security · Accreditation
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
          <span className={`block animate-fadeInUp ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Power Play for</span>
          <span className="block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <GradientShinyText isDark={isDark}>Privacy & Security</GradientShinyText>
          </span>
        </h1>

        {/* Subhead */}
        <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 animate-fadeInUp ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ animationDelay: '0.4s' }}>
          Empowering organisations with cutting-edge data privacy tools, cybersecurity solutions, and digital accreditation that foster trust and safeguard growth.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <button onClick={() => setCurrentPage('products')} className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 transition-all">
            Explore Products <Arrow />
          </button>
          <button onClick={() => setCurrentPage('contact')} className={`px-7 py-4 rounded-xl font-semibold border transition-all hover:border-orange-500 ${isDark ? 'bg-white/[0.04] text-white border-white/[0.1] hover:bg-white/[0.07]' : 'bg-black/[0.03] text-gray-900 border-black/[0.1] hover:bg-black/[0.05]'}`}>
            Get in Touch
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-16 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          {[
            { v: 50, s: '+', l: 'Global Clients' },
            { v: 99, s: '%', l: 'Compliance Rate' },
            { v: 3, s: '', l: 'Continents' },
          ].map((st, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className={`w-px self-stretch ${isDark ? 'bg-white/[0.1]' : 'bg-black/[0.1]'}`} />}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500">
                  <AnimatedCounter end={st.v} suffix={st.s} />
                </div>
                <div className={`text-xs md:text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{st.l}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════
   HOME — TRUST INDICATORS
   ══════════════════════════════════════════════════════════════════ */
const TrustIndicators = () => {
  const { isDark } = useTheme();
  const items = [
    { icon: '🇪🇺', label: 'GDPR', sub: 'Compliant' },
    { icon: '🇺🇸', label: 'CCPA', sub: 'Compliant' },
    { icon: '🏆', label: 'ISO 27001', sub: 'Aligned' },
    { icon: '🔒', label: 'SOC 2', sub: 'Type II' },
    { icon: '🇮🇳', label: 'DPDPA', sub: 'India' },
    { icon: '⚡', label: '99.9%', sub: 'Uptime SLA' },
  ];

  return (
    <section className={`py-14 px-6 border-y ${isDark ? 'bg-[#0a0a0a] border-white/[0.06]' : 'bg-gray-50/50 border-black/[0.06]'}`}>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-14">
        {items.map((t, i) => (
          <div key={i} className="text-center min-w-[70px]">
            <div className="text-2xl mb-1.5">{t.icon}</div>
            <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.label}</div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════
   HOME — PRODUCTS PREVIEW
   ══════════════════════════════════════════════════════════════════ */
const ProductsPreview = ({ setCurrentPage }) => {
  const { isDark } = useTheme();

  const products = [
    {
      icon: '🔐', title: 'GoSeqr Data Privacy', sub: 'Privacy Management',
      desc: 'Equip Data Protection Officers with tools to manage privacy notices, monitor consents, and ensure compliance with global data protection regulations.',
      tags: ['Privacy Notices', 'Consent Mgmt', 'RoPA & DPIA', 'Audits'],
    },
    {
      icon: '🛡️', title: 'GoSeqr Cybersecurity', sub: 'Security Operations',
      desc: 'Strengthen your organisation with advanced threat analysis, risk assessments, and robust security goal management to safeguard digital infrastructure.',
      tags: ['Threat Analysis', 'Risk Assessment', 'Security Goals', 'Incidents'],
    },
    {
      icon: '🎓', title: 'GoKred Accreditation', sub: 'Digital Credentials',
      desc: 'Simplify credential issuance and validation with GoKred for secure, verifiable, and globally recognised digital accreditations.',
      tags: ['Issuance', 'Validation', 'Verification', 'Tamper-Proof'],
    },
  ];

  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge text="Our Products" />
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Protect Your Organisation with <ShinyText>Goismo</ShinyText>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Robust, scalable solutions aligned with your privacy, security, and accreditation objectives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map((p, i) => {
            const [ref, vis] = useScrollReveal(0.1);
            return (
              <div ref={ref} key={i} className={`transition-all duration-600 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <GlassCard className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <h3 className={`text-base font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                      <span className="text-xs text-orange-500 font-medium">{p.sub}</span>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed mb-5 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, j) => (
                      <span key={j} className={`px-2.5 py-1 rounded-md text-xs font-medium ${isDark ? 'bg-white/[0.06] text-gray-300' : 'bg-black/[0.05] text-gray-600'}`}>{t}</span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button onClick={() => setCurrentPage('products')} className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-xl transition-all">
            View All Products <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════
   HOME — FEATURES GRID
   ══════════════════════════════════════════════════════════════════ */
const FeaturesGrid = () => {
  const { isDark } = useTheme();

  const features = [
    { icon: '📋', title: 'Privacy Compliance', desc: 'Simplify GDPR, CCPA, and DPDPA compliance with powerful privacy management tools.' },
    { icon: '🔍', title: 'Threat Assessment', desc: 'Conduct proactive risk assessments with advanced cybersecurity modules.' },
    { icon: '🎓', title: 'Digital Accreditation', desc: 'Verify credentials seamlessly with globally recognised digital certifications.' },
    { icon: '🤝', title: 'Collaboration Tools', desc: 'Enable cross-functional teamwork between legal, technical, and operational teams.' },
    { icon: '✅', title: 'Compliance Checks', desc: 'Ensure alignment with global standards using robust audit features.' },
    { icon: '🔒', title: 'Enhanced Security', desc: 'Achieve critical security objectives and safeguard digital assets.' },
  ];

  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge text="Key Features" />
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Why Organisations <ShinyText>Trust Us</ShinyText>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const [ref, vis] = useScrollReveal(0.08);
            return (
              <div ref={ref} key={i} className={`transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <GlassCard className="h-full">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{f.desc}</p>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════
   HOME — QUOTE
   ══════════════════════════════════════════════════════════════════ */
const QuoteSection = () => {
  const { isDark } = useTheme();
  return (
    <section className={`py-20 px-6 ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-6xl text-orange-500/30 leading-none mb-2">&ldquo;</div>
        <blockquote className={`text-2xl md:text-3xl font-bold italic leading-snug mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          At the end of the day, the goals are simple: safety and security.
        </blockquote>
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>— Jodi Rell, former Governor of Connecticut</p>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════
   HOME — CTA
   ══════════════════════════════════════════════════════════════════ */
const CTASection = ({ setCurrentPage }) => {
  const { isDark } = useTheme();
  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <GlassCard hover={false} className={`text-center !p-12 md:!p-16 ${isDark ? 'bg-gradient-to-br from-orange-500/[0.08] via-transparent to-blue-500/[0.04]' : 'bg-gradient-to-br from-orange-500/[0.12] via-transparent to-blue-500/[0.06]'}`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Ready to Secure Your Organisation?</h2>
          <p className={`text-lg mb-8 max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Let's discuss how Goismo can strengthen your privacy, security, and compliance posture.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => setCurrentPage('contact')} className="px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">Start a Conversation</button>
            <button onClick={() => setCurrentPage('products')} className={`px-7 py-4 rounded-xl font-semibold border transition-all hover:border-orange-500 ${isDark ? 'bg-white/[0.04] border-white/[0.1] text-white' : 'bg-black/[0.03] border-black/[0.1] text-gray-900'}`}>Explore Products</button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════
   PRODUCTS PAGE
   ══════════════════════════════════════════════════════════════════ */
const ProductsPage = () => {
  const { isDark } = useTheme();
  const [tab, setTab] = useState(0);

  const products = [
    {
      icon: '🔐', name: 'GoSeqr Data Privacy',
      tagline: 'One-stop solution for DPOs, engineers, and auditors',
      desc: 'Become end-to-end compliant with global regulations. GoSeqr Data Privacy equips Data Protection Officers with comprehensive tools to manage privacy notices, monitor consents, and ensure compliance with GDPR, CCPA, DPDPA, and other global data protection regulations.',
      color: 'from-orange-500 to-orange-600',
      features: [
        { t: 'Privacy Notices', d: 'Create, publish, and manage privacy notices with ease across all digital properties.' },
        { t: 'Consent Management', d: 'Monitor granular consent data across applications with real-time dashboards.' },
        { t: 'RoPA, DPIA & PIA', d: 'Generate Records of Processing Activities and Impact Assessments tailored to your needs.' },
        { t: 'Compliance Audits', d: 'Perform comprehensive compliance audits with automated workflows and reporting.' },
        { t: 'Data Subject Requests', d: 'Handle DSARs efficiently with automated tracking, fulfilment, and response management.' },
        { t: 'Cross-Border Transfers', d: 'Manage international data transfers with built-in adequacy checks and safeguard documentation.' },
      ],
    },
    {
      icon: '🛡️', name: 'GoSeqr Cybersecurity',
      tagline: 'Protect critical data from cyber attacks and hackers',
      desc: 'Mitigate risks and strengthen security measures with ease. GoSeqr Cybersecurity provides advanced threat analysis, risk assessments, and robust security goal management to safeguard your digital infrastructure.',
      color: 'from-blue-500 to-blue-600',
      features: [
        { t: 'Security Requirements', d: 'Define product and system security requirements aligned with international standards.' },
        { t: 'Threat Analysis', d: 'Proactively address threats with comprehensive risk assessments and STRIDE/DREAD modelling.' },
        { t: 'Security Goals', d: 'Monitor and achieve critical cybersecurity goals with measurable KPIs.' },
        { t: 'Vulnerability Management', d: 'Track and remediate vulnerabilities across your entire technology stack.' },
        { t: 'Incident Response', d: 'Structured incident response playbooks with automated escalation workflows.' },
        { t: 'Compliance Mapping', d: 'Map security controls to ISO 27001, NIST CSF, SOC 2, and other frameworks.' },
      ],
    },
    {
      icon: '🎓', name: 'GoKred Digital Accreditation',
      tagline: 'Your go-to solution for credential validation',
      desc: 'Help organisations with worldwide accepted digital certifications and build trust with instant credential validation. GoKred simplifies credential issuance and validation for secure, verifiable, and globally recognised digital accreditations.',
      color: 'from-emerald-500 to-green-600',
      features: [
        { t: 'Credential Issuance', d: 'Create and distribute tamper-proof digital certifications effortlessly.' },
        { t: 'Global Validation', d: 'Ensure compliance with international standards for worldwide recognition.' },
        { t: 'Real-Time Verification', d: 'Instantly confirm credentials, boosting trust and transparency.' },
        { t: 'Stakeholder Management', d: 'Streamline accreditation processes for all stakeholders in your ecosystem.' },
        { t: 'Digital Identity', d: 'Build robust digital identity profiles with verified credential portfolios.' },
        { t: 'Analytics Dashboard', d: 'Track issuance, verification rates, and accreditation lifecycle metrics.' },
      ],
    },
  ];

  const ap = products[tab];

  const regs = [
    { n: 'GDPR', r: 'EU' }, { n: 'CCPA / CPRA', r: 'California' }, { n: 'DPDPA', r: 'India' },
    { n: 'LGPD', r: 'Brazil' }, { n: 'POPIA', r: 'South Africa' }, { n: 'PIPEDA', r: 'Canada' },
    { n: 'ISO 27001', r: 'Global' }, { n: 'SOC 2', r: 'Global' }, { n: 'NIST CSF', r: 'US' },
    { n: 'ISO 17025', r: 'Global' }, { n: 'HIPAA', r: 'US' }, { n: 'PCI DSS', r: 'Global' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className={`py-20 px-6 text-center ${isDark ? 'bg-gradient-to-b from-[#111] to-[#0D0D0D]' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
        <Badge text="Products" />
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Shield for <ShinyText>Compliance</ShinyText></h1>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Data Privacy, Cybersecurity, and Digital Accreditation — all in one integrated platform.</p>
      </section>

      {/* Tabs + Detail */}
      <section className={`py-16 px-6 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {products.map((p, i) => (
              <button key={i} onClick={() => setTab(i)} className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${tab === i ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/25' : `border ${isDark ? 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:border-orange-500/40 hover:text-white' : 'bg-black/[0.02] border-black/[0.08] text-gray-600 hover:border-orange-500/50'}`}`}>
                <span className="mr-2">{p.icon}</span>{p.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ap.color} flex items-center justify-center text-3xl shadow-lg`}>{ap.icon}</div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{ap.name}</h2>
                  <p className="text-orange-500 text-sm font-medium">{ap.tagline}</p>
                </div>
              </div>
              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{ap.desc}</p>
              <a href="https://goismo.com/signin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
                Get Started <Arrow />
              </a>
            </div>

            <div className="space-y-3">
              {ap.features.map((f, i) => (
                <div key={`${tab}-${i}`} className={`flex items-start gap-3 border rounded-xl p-4 transition-all duration-300 ${isDark ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]' : 'bg-black/[0.02] border-black/[0.06] hover:bg-black/[0.04]'}`}>
                  <span className="text-orange-500 text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <h4 className={`font-semibold text-sm mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.t}</h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className={`py-24 px-6 ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Global Regulations & Frameworks</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Built-in support for compliance across jurisdictions</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {regs.map((r, i) => (
              <GlassCard key={i} className="text-center !p-4">
                <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.n}</div>
                <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{r.r}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   ABOUT PAGE
   ══════════════════════════════════════════════════════════════════ */
const AboutPage = () => {
  const { isDark } = useTheme();

  const timeline = [
    { y: '2019', t: 'Founded', d: 'Established in Bangalore with a vision for privacy & security excellence' },
    { y: '2020', t: 'GoSeqr Launch', d: 'Released first privacy compliance module for Indian enterprises' },
    { y: '2021', t: 'Team Expansion', d: 'Grew to 25+ engineers specializing in security and privacy' },
    { y: '2022', t: 'Sweden Office', d: 'Opened Göteborg development centre for European operations' },
    { y: '2023', t: 'GoKred Launch', d: 'Launched digital accreditation platform for global credentialing' },
    { y: '2024', t: 'US Expansion', d: 'Established Oakland office for North American market' },
    { y: '2025', t: 'Global Platform', d: 'Unified GoSeqr & GoKred platform serving 3 continents' },
  ];

  const values = [
    { icon: '🌍', t: 'Global Mindset', d: 'Three continents, one mission — making privacy and security accessible worldwide.' },
    { icon: '🔐', t: 'Security First', d: 'Every decision starts with security. We practice what we build.' },
    { icon: '💡', t: 'Innovation DNA', d: 'Constantly evolving our platform to stay ahead of regulatory changes.' },
    { icon: '🤝', t: 'Trust & Transparency', d: 'Building long-term partnerships founded on integrity and accountability.' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className={`py-20 px-6 text-center ${isDark ? 'bg-gradient-to-b from-[#111] to-[#0D0D0D]' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
        <Badge text="About Goismo" />
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our <ShinyText>Story</ShinyText></h1>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>From a Bangalore startup to a global technology partner, empowering organisations to navigate the complex world of data privacy, cybersecurity, and digital accreditation.</p>
      </section>

      {/* Mission + Stats */}
      <section className={`py-24 px-6 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Mission</h2>
            <p className={`text-base leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>We specialise in delivering robust, scalable solutions that align with your business's privacy, security, and accreditation objectives. Our platform helps organisations worldwide stay compliant, secure, and trusted.</p>
            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>With offices in Sweden, the United States, and India, Goismo brings together global expertise with deep local understanding of regulatory landscapes — helping businesses of all sizes navigate the ever-evolving compliance environment.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '50+', l: 'Global Clients' },
              { n: '3', l: 'Continents' },
              { n: '12+', l: 'Regulations Covered' },
              { n: '99%', l: 'Client Satisfaction' },
            ].map((s, i) => (
              <GlassCard key={i} className="text-center !p-6">
                <div className="text-3xl font-bold text-orange-500 mb-1">{s.n}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.l}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Brand badge */}
      <section className={`py-16 px-6 ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Brand</h3>
          <div className="flex justify-center"><GoismoLogoBadge size={72} /></div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`py-24 px-6 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Journey</h2>
          </div>
          <div>
            {timeline.map((item, i) => {
              const [ref, vis] = useScrollReveal(0.15);
              return (
                <div
                  ref={ref}
                  key={i}
                  className={`relative pl-8 pb-8 border-l-2 last:border-l-0 transition-all duration-500 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute left-0 top-0.5 w-3.5 h-3.5 -translate-x-[8px] rounded-full bg-orange-500 shadow-lg shadow-orange-500/40" />
                  <span className="text-orange-500 font-mono text-xs font-bold">{item.y}</span>
                  <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.t}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-24 px-6 ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <GlassCard key={i} className="text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{v.t}</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{v.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   CONTACT PAGE
   ══════════════════════════════════════════════════════════════════ */
const ContactPage = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const offices = [
    { city: 'Göteborg', country: 'Sweden', addr: 'Herkulesgatan 3A, 417 03 Göteborg, Sweden', flag: '🇸🇪' },
    { city: 'Oakland', country: 'United States', addr: '1999 Harrison St, Suite 1800, Oakland, CA 94612', flag: '🇺🇸' },
    { city: 'Bangalore', country: 'India', addr: '441, 9th Main, AECS B Block, Singasandra, Bangalore - 560068', flag: '🇮🇳' },
  ];

  const submit = () => {
    setSending(true);
    setTimeout(() => { setSent(true); setSending(false); }, 1500);
  };

  const inputCls = `w-full px-4 py-4 border rounded-xl focus:outline-none focus:border-orange-500 transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.08] text-white placeholder-white/25' : 'bg-black/[0.02] border-black/[0.07] text-gray-900 placeholder-gray-400'}`;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className={`py-20 px-6 text-center ${isDark ? 'bg-gradient-to-b from-[#111] to-[#0D0D0D]' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
        <Badge text="Contact" />
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Let's <ShinyText>Connect</ShinyText></h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ready to strengthen your organisation's privacy and security posture? We'd love to hear from you.</p>
      </section>

      <section className={`py-24 px-6 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left — offices */}
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Offices</h2>
            <div className="space-y-5">
              {offices.map((o, i) => (
                <GlassCard key={i} className="!p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl leading-none">{o.flag}</span>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{o.city}, {o.country}</h3>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{o.addr}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Direct Contact</h3>
              <a href="mailto:info@goismo.com" className="flex items-center gap-3 text-orange-500 hover:text-orange-400 transition-colors font-medium">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@goismo.com
              </a>
              <a href="tel:+46721597573" className={`flex items-center gap-3 transition-colors font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +46 72 159 7573
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send a Message</h2>

            {sent ? (
              <GlassCard hover={false} className="text-center !py-14">
                <div className="text-5xl mb-4">✅</div>
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Message Sent!</h3>
                <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Thank you for reaching out. We'll get back to you shortly.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', message: '' }); }} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all">
                  Send Another
                </button>
              </GlassCard>
            ) : (
              <div className="space-y-5">
                {[
                  { k: 'name', type: 'text', label: 'Full Name', ph: 'Jane Doe', req: true },
                  { k: 'email', type: 'email', label: 'Email', ph: 'jane@company.com', req: true },
                  { k: 'company', type: 'text', label: 'Company', ph: 'Your Organisation', req: false },
                ].map((f) => (
                  <div key={f.k} className="relative">
                    <input
                      type={f.type}
                      value={form[f.k]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))}
                      required={f.req}
                      placeholder={f.ph}
                      className={inputCls}
                    />
                    <label className={`absolute -top-2.5 left-3 px-1.5 text-xs font-medium text-orange-500 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
                      {f.label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    required
                    placeholder="Tell us about your compliance needs..."
                    className={`${inputCls} resize-none`}
                  />
                  <label className={`absolute -top-2.5 left-3 px-1.5 text-xs font-medium text-orange-500 ${isDark ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
                    Message
                  </label>
                </div>
                <button
                  onClick={submit}
                  disabled={sending}
                  className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 transition-all ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {sending ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════ */
const Footer = ({ setCurrentPage }) => {
  const { isDark } = useTheme();

  return (
    <footer className={`py-16 px-6 border-t ${isDark ? 'bg-[#080808] border-white/[0.05]' : 'bg-gray-50 border-black/[0.05]'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4"><GoismoLogo height={22} /></div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Empowering organisations with cutting-edge data privacy, cybersecurity, and digital accreditation solutions.</p>
          </div>

          {/* Products */}
          <div>
            <h4 className={`font-bold text-sm mb-4 uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Products</h4>
            <ul className="space-y-2.5">
              {['GoSeqr Data Privacy', 'GoSeqr Cybersecurity', 'GoKred Accreditation'].map((l, i) => (
                <li key={i}>
                  <button onClick={() => setCurrentPage('products')} className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`font-bold text-sm mb-4 uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Company</h4>
            <ul className="space-y-2.5">
              {[{ l: 'About', id: 'about' }, { l: 'Contact', id: 'contact' }].map((x, i) => (
                <li key={i}>
                  <button onClick={() => setCurrentPage(x.id)} className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>{x.l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className={`font-bold text-sm mb-4 uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Offices</h4>
            <div className={`text-sm space-y-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <p>🇸🇪 Göteborg, Sweden</p>
              <p>🇺🇸 Oakland, CA, USA</p>
              <p>🇮🇳 Bangalore, India</p>
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3 ${isDark ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>© 2025 GOISMO. All Rights Reserved.</p>
          <a href="mailto:info@goismo.com" className="text-xs text-orange-500 hover:text-orange-400 transition-colors font-medium">info@goismo.com</a>
        </div>
      </div>
    </footer>
  );
};

/* ══════════════════════════════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'products': return <ProductsPage />;
      case 'about':    return <AboutPage />;
      case 'contact':  return <ContactPage />;
      default: return (
        <>
          <HeroSection setCurrentPage={setPage} />
          <TrustIndicators />
          <ProductsPreview setCurrentPage={setPage} />
          <FeaturesGrid />
          <QuoteSection />
          <CTASection setCurrentPage={setPage} />
        </>
      );
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark((d) => !d) }}>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0D0D0D] text-gray-200' : 'bg-white text-gray-900'}`}>
        <Navigation currentPage={page} setCurrentPage={setPage} scrolled={scrolled} />
        {renderPage()}
        <Footer setCurrentPage={setPage} />
      </div>
    </ThemeContext.Provider>
  );
}
