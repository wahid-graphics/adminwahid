'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CATS = { all:'All', flex:'Flex Banners', bcard:'Visiting Cards', logo:'Logo Design', shadi:'Shadi Cards', print4:'4-Colour Printing', other:'Other Works' }

const SERVICES = [
  { icon:'🖨️', n:'01', title:'Flex Banners', urdu:'فلیکس بینر', desc:'High-resolution outdoor and indoor flex printing in any size. UV-resistant inks for vibrant, long-lasting results.', tags:['Any custom size','UV-resistant','Single & double sided','Fast delivery'], cat:'flex' },
  { icon:'💳', n:'02', title:'Visiting Cards', urdu:'وزٹنگ کارڈ', desc:'Premium business cards in matte, gloss, or spot UV finishes. Make a lasting first impression with thick cardstock.', tags:['Matte & gloss','Spot UV','Bulk discounts','Custom die-cut'], cat:'bcard' },
  { icon:'✏️', n:'03', title:'Logo Design', urdu:'لوگو ڈیزائن', desc:'Custom logos that define your brand identity. Delivered in PNG, SVG, PDF — ready for print and digital.', tags:['Multiple concepts','Unlimited revisions','All formats','Brand guide'], cat:'logo' },
  { icon:'💒', n:'04', title:'Shadi Cards', urdu:'شادی کارڈ', desc:'Elegant wedding invitation cards with gold foil, embossing, and premium paper. Single and double leaf available.', tags:['Gold foil option','Single & double leaf','Custom design','Bulk orders'], cat:'shadi' },
  { icon:'🎨', n:'05', title:'4-Colour Printing', urdu:'فور کلر پرنٹنگ', desc:'Full CMYK printing for food menus, soap boxes, school files, and product packaging with vivid results.', tags:['Food menus','Soap boxes','School files','Product packaging'], cat:'print4' },
  { icon:'⭐', n:'06', title:'Islamic Posts', urdu:'اسلامک پوسٹ ورک', desc:'Beautiful Islamic event posters, masjid announcements, and religious occasion cards with elegance.', tags:['Event posters','Masjid flyers','Custom calligraphy','Digital & print'], cat:'other' },
]

const TESTIMONIALS = [
  { stars:5, text:'"Wahid Graphics delivered our flex banners overnight. Quality was exceptional — colours were vibrant and the material felt very durable."', name:'Ahmed Raza', role:'Shop Owner, Lahore' },
  { stars:5, text:'"The shadi cards were beautiful! Spot UV finish looked incredibly premium. All our guests complimented them at the wedding."', name:'Fatima Bibi', role:'Bride, Karachi' },
  { stars:5, text:'"Logo design delivered in 24 hours with multiple concepts. Exactly what my business needed. Highly recommended!"', name:'Usman Tariq', role:'Business Owner, Islamabad' },
]

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formData, setFormData] = useState({ name:'', phone:'', service:'', message:'' })
  const [formSent, setFormSent] = useState(false)
  const [formBusy, setFormBusy] = useState(false)
  const fadeRefs = useRef([])

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects).catch(()=>{})
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    // Fade-in observer
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    // Nav active links
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
          })
        }
      })
    }, { threshold: 0.4 })
    document.querySelectorAll('section[id]').forEach(s => secObs.observe(s))
    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter)

  const submitForm = (e) => {
    e.preventDefault()
    setFormBusy(true)
    const msg = encodeURIComponent(
      `*New Enquiry — Wahid Graphics*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Service:* ${formData.service}\n*Message:* ${formData.message}`
    )
    window.open(`https://wa.me/923260342099?text=${msg}`, '_blank')
    setTimeout(() => { setFormSent(true); setFormBusy(false) }, 600)
  }

  return (
    <>
      {/* WhatsApp float */}
      <a href="https://wa.me/923260342099?text=Hello%20Wahid%20Graphics!%20I%20need%20a%20quote." target="_blank" rel="noopener" className="wa-float" aria-label="WhatsApp">
        <span className="wa-tip">Chat with us!</span>
        <svg viewBox="0 0 32 32" fill="white" width="28" height="28"><path d="M16 .5C7.44.5.5 7.44.5 16c0 2.83.74 5.48 2.03 7.78L.5 31.5l7.96-2.03A15.47 15.47 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm7.3 18.33c-.4-.2-2.36-1.16-2.73-1.3-.36-.13-.63-.2-.89.2s-1.02 1.3-1.25 1.57c-.23.27-.46.3-.86.1a10.86 10.86 0 01-3.19-1.97 12 12 0 01-2.21-2.74c-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.77-.65-.67-.89-.68H9.6c-.27 0-.7.1-1.06.5-.36.4-1.38 1.35-1.38 3.29s1.41 3.81 1.61 4.07c.2.26 2.77 4.24 6.72 5.94.94.4 1.67.65 2.24.83.94.3 1.8.26 2.47.16.75-.11 2.36-.97 2.69-1.9.33-.94.33-1.74.23-1.9-.1-.17-.36-.27-.76-.47z"/></svg>
      </a>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/93 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 text-white text-4xl leading-none font-light hover:text-or transition-colors">×</button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img src={lightbox.image} alt={lightbox.title} className="w-full max-h-[82vh] object-contain rounded-sm"/>
            <div className="text-center mt-4">
              <p className="sf text-white text-xl">{lightbox.title}</p>
              <p className="text-white/40 text-xs mt-1">{CATS[lightbox.category]}</p>
            </div>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div className="bg-ink text-white text-xs py-2 px-5 flex justify-between items-center">
        <span className="opacity-75 tracking-wide">Free delivery on orders over Rs. 1,000</span>
        <span className="hidden sm:block opacity-50">wahidgraphics21@gmail.com &nbsp;|&nbsp; +92 326 034 2099</span>
      </div>

      {/* NAVBAR */}
      <nav id="mainNav" className={`fixed top-0 left-0 right-0 z-40 px-5 lg:px-12 transition-all duration-300 ${navScrolled ? 'py-3 bg-white/97 border-b border-bd shadow-sm backdrop-blur-md' : 'py-4 bg-white border-b border-bd'}`} style={{top:'32px'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Wahid Graphics" className="h-10 w-auto object-contain"/>
            <div>
              <div className="sf text-xl text-ink leading-none">Wahid Graphics</div>
              <div className="text-[9px] text-ink-faint tracking-[.18em] uppercase mt-0.5">Print Studio</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {['home','services','portfolio','process','about','contact'].map(s => (
              <a key={s} href={`#${s}`} className={`nav-link text-sm font-medium text-ink-soft capitalize ${s==='home'?'active':''}`}>{s}</a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+923260342099" className="text-xs text-ink-muted hover:text-or transition-colors font-medium">+92 326 034 2099</a>
            <a href="#contact" className="btn-p text-xs py-2.5 px-5">Get Quote</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-ink" aria-label="Menu">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="18" x2="19" y2="18"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-bd mt-3 -mx-5 px-5 pb-5 pt-2">
            {['home','services','portfolio','process','about','contact'].map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium border-b border-bd text-ink hover:text-or transition-colors capitalize">{s}</a>
            ))}
            <a href="#contact" className="btn-p w-full justify-center mt-4 text-xs">Get a Free Quote</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="pt-28 min-h-screen grid lg:grid-cols-2" style={{marginTop:'32px'}}>
        <div className="bg-cr flex flex-col justify-center px-10 lg:px-16 py-20 fade-in">
          <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-5">Print Studio — Est. 2019</p>
          <h1 className="sf text-6xl lg:text-7xl leading-[.92] text-ink mb-2">Premium</h1>
          <h1 className="sf text-6xl lg:text-7xl leading-[.92] italic text-or mb-2">Printing</h1>
          <h1 className="sf text-6xl lg:text-7xl leading-[.92] text-ink mb-6">&amp; Design</h1>
          <p className="text-ink-muted text-sm leading-relaxed max-w-sm mb-2">Flex banners, visiting cards, logo design, shadi cards, brochures &amp; more — crafted with precision, delivered fast.</p>
          <p className="text-or/55 text-xs mb-10">اعلیٰ معیار کی پرنٹنگ اور ڈیزائن خدمات</p>
          <div className="flex flex-wrap gap-4">
            <a href="#services" className="btn-p">Explore Services →</a>
            <a href="#portfolio" className="btn-o">View Portfolio</a>
          </div>
          <div className="flex gap-8 mt-12 pt-8 border-t border-bd-strong fade-in">
            <div><div className="sf text-3xl text-ink">500+</div><div className="text-[11px] text-ink-faint mt-1">Happy Clients</div></div>
            <div className="border-l border-bd-strong pl-8"><div className="sf text-3xl text-ink">1000+</div><div className="text-[11px] text-ink-faint mt-1">Projects Done</div></div>
            <div className="border-l border-bd-strong pl-8"><div className="sf text-3xl text-ink">5+</div><div className="text-[11px] text-ink-faint mt-1">Years</div></div>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
          <img src="/images/hero.jpg" alt="Wahid Graphics Shop" className="w-full h-full object-cover"/>
          <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(26,26,26,.65) 0%, transparent 60%)'}}/>
          <div className="absolute top-5 left-5 bg-or text-white text-[9px] font-bold tracking-[.12em] uppercase px-3 py-1.5">Premium Quality</div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="sf text-white text-2xl leading-tight">Wahid Graphics<br/><span className="text-or text-lg font-normal italic">Print Studio</span></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-or overflow-hidden py-3">
        <div className="mq-track">
          {[1,2].map(i => (
            <span key={i} className="flex items-center gap-10 text-white text-[9px] font-bold tracking-[.22em] uppercase whitespace-nowrap">
              {['Flex Banners','Visiting Cards','Logo Design','Shadi Cards','4-Colour Printing','Islamic Posts','Brochures','Stickers','Digital Printing'].map((s,j) => (
                <span key={j} className="flex items-center gap-10">{s}{j<8&&<span className="w-1 h-1 rounded-full bg-white/40 inline-block"/>}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-5 fade-in">
            <div>
              <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-3">What We Offer — ہماری خدمات</p>
              <h2 className="sf text-5xl lg:text-6xl text-ink leading-tight">Our <em className="italic text-or">Services</em></h2>
              <div className="w-14 h-0.5 bg-or mt-4 mb-4"></div>
              <p className="text-ink-muted text-sm leading-relaxed max-w-lg">From concept to print — every order handled with professional expertise and fast turnaround.</p>
            </div>
            <a href="#contact" className="btn-o self-start lg:self-end">Request a Quote</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 fade-in">
            {SERVICES.map(s => (
              <div key={s.n} className="svc-card bg-white p-7 cursor-pointer">
                <div className="svc-icon mb-5 text-2xl">{s.icon}</div>
                <div className="text-[9px] text-ink-faint tracking-[.15em] uppercase mb-1">{s.n}</div>
                <h3 className="sf text-xl text-ink mb-1">{s.title}</h3>
                <p className="text-[10px] text-or/65 mb-3 tracking-wide">{s.urdu}</p>
                <p className="text-ink-muted text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.tags.map(t => <span key={t} className="text-[9px] bg-cr text-ink-soft px-2.5 py-1 rounded-sm font-medium">{t}</span>)}
                </div>
                <a href={`https://wa.me/923260342099?text=I%20need%20a%20${encodeURIComponent(s.title)}%20quote`} target="_blank" rel="noopener"
                  className="text-[10px] text-or font-bold tracking-[.1em] uppercase flex items-center gap-2 hover:gap-3 transition-all">
                  Order Now <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            ))}
          </div>
          {/* Mini services */}
          <div className="grid sm:grid-cols-3 gap-4 mt-4 fade-in">
            {[
              { icon:'📄', title:'Brochures & Pamphlets', desc:'Bi-fold, tri-fold & one-colour pamphlets for marketing campaigns.' },
              { icon:'📦', title:'Stickers & Packaging', desc:'Waterproof vinyl stickers, product labels & custom packaging.' },
              { icon:'📝', title:'Letterheads & Stamps', desc:'Company stationery, rubber stamps, envelopes & letterheads.' },
            ].map(m => (
              <div key={m.title} className="svc-card bg-white p-5 flex items-start gap-4">
                <div className="svc-icon w-11 h-11 text-lg flex-shrink-0">{m.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm text-ink mb-1">{m.title}</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Timing banner */}
          <div className="mt-8 rounded-sm overflow-hidden border border-bd fade-in">
            <img src="/images/timing.jpg" alt="Business Hours" className="w-full object-cover max-h-36"/>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-or py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[['500+','Happy Clients'],['1000+','Projects Done'],['5+','Years Experience'],['100%','Satisfaction']].map(([v,l]) => (
            <div key={l} className="border-l border-white/20 first:border-0">
              <div className="sf text-5xl text-white">{v}</div>
              <div className="text-white/70 text-[10px] font-medium tracking-wider mt-2 uppercase">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-5 fade-in">
            <div>
              <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-3">Our Work — ہمارا کام</p>
              <h2 className="sf text-5xl text-ink">Portfolio <em className="italic text-or">Highlights</em></h2>
              <div className="w-14 h-0.5 bg-or mt-4"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATS).map(([k, v]) => (
                <button key={k} onClick={() => setActiveFilter(k)}
                  className={`text-[10px] font-bold tracking-[.1em] uppercase px-4 py-2 rounded-sm border transition-all ${activeFilter===k ? 'bg-ink text-white border-ink' : 'bg-white text-ink-muted border-bd hover:border-ink hover:text-ink'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 fade-in">
              {filtered.map(p => (
                <div key={p.id} className="port-img rounded-sm relative cursor-pointer aspect-[4/3] bg-cr"
                  onClick={() => setLightbox(p)}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy"/>
                  {p.featured && <div className="absolute top-2 left-2 bg-or text-white text-[8px] font-bold px-2 py-0.5">Featured</div>}
                  <div className="overlay">{p.title}</div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <a href="https://wa.me/923260342099?text=I%20want%20to%20order%20similar%20work" target="_blank" rel="noopener" className="btn-o">Order Similar Work</a>
          </div>
        </div>
      </section>

      {/* ABOUT / WHY US */}
      <section id="about" className="grid lg:grid-cols-2">
        <div className="relative overflow-hidden min-h-[340px] lg:min-h-0">
          <img src="/images/shop-flex.jpg" alt="Wahid Graphics" className="w-full h-full object-cover"/>
          <div className="absolute inset-0" style={{background:'linear-gradient(to right, rgba(26,26,26,.5), transparent)'}}/>
          <div className="absolute bottom-8 left-8">
            <div className="bg-or text-white px-5 py-3 rounded-sm">
              <div className="sf text-4xl leading-none">5+</div>
              <div className="text-xs font-bold mt-1 tracking-wider uppercase">Years of Excellence</div>
            </div>
          </div>
        </div>
        <div className="bg-white px-10 lg:px-16 py-20 flex flex-col justify-center fade-in">
          <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-4">Why Choose Us — ہمیں کیوں چنیں</p>
          <h2 className="sf text-4xl lg:text-5xl text-ink mb-3">Quality You Can <em className="italic text-or">Trust</em></h2>
          <div className="w-14 h-0.5 bg-or mb-5"></div>
          <p className="text-ink-muted text-sm leading-relaxed mb-8">Professional-grade printing on every order — no matter the size. Fast, reliable, always on-brand, serving clients across Pakistan.</p>
          <ul className="space-y-4 mb-10">
            {[
              ['Same-day & next-day delivery','Tight deadlines? We have you covered.'],
              ['Premium UV-resistant inks','Colours stay vibrant outdoors for years.'],
              ['Free revisions until 100% satisfied','Your approval is the only standard we work to.'],
              ['WhatsApp support — always available','Message us anytime, reply within minutes.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{background:'rgba(249,115,22,.1)',border:'2px solid #F97316'}}>
                  <svg width="9" height="9" fill="none" stroke="#F97316" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink">{t}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{d}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 flex-wrap">
            <a href="#services" className="btn-p">Our Services</a>
            <a href="#contact" className="btn-o">Contact Us</a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14 fade-in">
            <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-3">How It Works — کیسے کام کرتا ہے</p>
            <h2 className="sf text-5xl text-ink">Our Simple <em className="italic text-or">Process</em></h2>
            <div className="w-14 h-0.5 bg-or mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative fade-in">
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-bd hidden lg:block"></div>
            {[['01','Contact Us','WhatsApp us or fill the contact form with your requirements.'],
              ['02','Get Free Quote','We reply within minutes with pricing and timeline.'],
              ['03','Design & Approve','Designers create artwork — you approve before printing.'],
              ['04','Delivered Fast','Printed and delivered with quality guaranteed.']
            ].map(([n,t,d]) => (
              <div key={n} className="process-step text-center">
                <div className="step-num sf text-2xl mx-auto">{n}</div>
                <h3 className="font-semibold text-sm text-ink mb-2">{t}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24" style={{background:'rgba(249,115,22,.05)'}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 fade-in">
            <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-3">Client Reviews — گاہکوں کی رائے</p>
            <h2 className="sf text-5xl text-ink">What Our Clients <em className="italic text-or">Say</em></h2>
            <div className="w-14 h-0.5 bg-or mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 fade-in">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-bd rounded-sm p-7">
                <div className="text-or text-sm tracking-widest mb-4">{'★'.repeat(t.stars)}</div>
                <p className="text-ink-muted text-sm leading-relaxed italic mb-5">{t.text}</p>
                <div className="border-t border-bd pt-4">
                  <div className="font-semibold text-sm text-ink">{t.name}</div>
                  <div className="text-xs text-ink-faint mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14">
            <div className="fade-in">
              <p className="text-or text-[10px] font-bold tracking-[.25em] uppercase mb-4">Get In Touch — رابطہ کریں</p>
              <h2 className="sf text-5xl text-white mb-4">Let's Create <em className="italic text-or">Something</em> Great</h2>
              <div className="w-14 h-0.5 bg-or mb-6"></div>
              <p className="text-white/50 text-sm leading-relaxed mb-10">Contact us today and get a free quote within minutes. We reply instantly on WhatsApp.</p>
              <div className="space-y-4 mb-8">
                <a href="https://wa.me/923260342099" target="_blank" rel="noopener"
                  className="flex items-center gap-4 p-4 rounded-sm transition-colors"
                  style={{background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)'}}>
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0" style={{background:'rgba(37,211,102,.15)',border:'1px solid rgba(37,211,102,.25)'}}>
                    <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20"><path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.07 1.51 5.77L.5 23.5l5.88-1.5A11.5 11.5 0 0012 23.5C18.35 23.5 23.5 18.35 23.5 12S18.35.5 12 .5zm5.43 13.6c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.34.22-.64.07a8.1 8.1 0 01-2.38-1.47A9 9 0 019.09 11c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>
                  </div>
                  <div><div className="font-semibold text-sm" style={{color:'#25D366'}}>+92 326 0342099</div><div className="text-xs" style={{color:'rgba(255,255,255,.4)'}}>WhatsApp — instant reply</div></div>
                </a>
                <a href="mailto:wahidgraphics21@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-sm"
                  style={{background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)'}}>
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0" style={{background:'rgba(249,115,22,.1)',border:'1px solid rgba(249,115,22,.2)'}}>
                    <svg width="20" height="20" fill="none" stroke="#F97316" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                  </div>
                  <div><div className="font-semibold text-sm text-or">wahidgraphics21@gmail.com</div><div className="text-xs" style={{color:'rgba(255,255,255,.4)'}}>Email — reply within 24h</div></div>
                </a>
              </div>
              <div className="rounded-sm overflow-hidden" style={{border:'1px solid rgba(255,255,255,.1)'}}>
                <img src="/images/map.jpg" alt="Location" className="w-full object-cover max-h-40 opacity-75"/>
              </div>
            </div>

            <div className="bg-white rounded-sm p-8 fade-in">
              <h3 className="sf text-2xl text-ink mb-1">Send a Message</h3>
              <p className="text-ink-faint text-[10px] mb-7 tracking-wide">پیغام بھیجیں — opens WhatsApp instantly</p>
              {formSent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="sf text-2xl text-ink mb-2">Message Sent!</h3>
                  <p className="text-ink-muted text-sm mb-6">WhatsApp opened with your message. We will reply shortly!</p>
                  <button onClick={() => setFormSent(false)} className="btn-o text-xs">Send Another</button>
                </div>
              ) : (
                <form onSubmit={submitForm} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold tracking-widest uppercase text-ink-muted block mb-1.5">Your Name *</label>
                      <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Muhammad Ahmed" className="admin-input text-sm"/>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-widest uppercase text-ink-muted block mb-1.5">Phone / WhatsApp *</label>
                      <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+92 300 0000000" className="admin-input text-sm"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-widest uppercase text-ink-muted block mb-1.5">Service Required *</label>
                    <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="admin-input text-sm">
                      <option value="">Select a service...</option>
                      {['Flex Banner','Visiting Cards','Logo Design','Shadi Cards','4-Colour Printing','Islamic Posts','Brochures','Stickers','Letterheads','Other'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-widest uppercase text-ink-muted block mb-1.5">Your Message *</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Describe your requirements, size, quantity, deadline..." className="admin-input text-sm resize-none"/>
                  </div>
                  <button type="submit" disabled={formBusy} className="btn-p w-full justify-center disabled:opacity-60">
                    <svg viewBox="0 0 24 24" fill="#fff" width="15" height="15"><path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.07 1.51 5.77L.5 23.5l5.88-1.5A11.5 11.5 0 0012 23.5C18.35 23.5 23.5 18.35 23.5 12S18.35.5 12 .5zm5.43 13.6c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.34.22-.64.07a8.1 8.1 0 01-2.38-1.47A9 9 0 019.09 11c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>
                    {formBusy ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-bd">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/images/logo.png" alt="Wahid Graphics" className="h-12 w-auto object-contain mb-3"/>
            <div className="sf text-lg text-ink mb-3">Wahid Graphics</div>
            <p className="text-ink-muted text-xs leading-relaxed mb-5">Premium printing and graphic design services in Pakistan. Fast delivery, professional quality.</p>
            <div className="text-xs text-ink-soft mb-2">📱 +92 326 0342099</div>
            <div className="text-xs text-ink-soft">✉️ wahidgraphics21@gmail.com</div>
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-ink mb-4">Quick Links</div>
            {['home','services','portfolio','process','about','contact'].map(s => (
              <a key={s} href={`#${s}`} className="block text-xs text-ink-muted mb-2.5 hover:text-or transition-colors capitalize">{s}</a>
            ))}
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-ink mb-4">Services</div>
            {['Flex Banners','Visiting Cards','Logo Design','Shadi Cards','4-Colour Printing','Islamic Posts','Brochures & More'].map(s => (
              <div key={s} className="text-xs text-ink-muted mb-2">{s}</div>
            ))}
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-ink mb-4">Newsletter</div>
            <p className="text-xs text-ink-muted leading-relaxed mb-4">Get print tips and offers in your inbox.</p>
            <div className="flex mb-6">
              <input placeholder="your@email.com" className="flex-1 border border-bd px-3 py-2.5 text-xs text-ink outline-none focus:border-or rounded-l-sm font-sans"/>
              <button className="bg-or text-white text-xs font-bold px-4 py-2.5 hover:bg-or-dark transition-colors rounded-r-sm">Go</button>
            </div>
            <div className="flex gap-2">
              <a href="https://wa.me/923260342099" target="_blank" rel="noopener" className="w-8 h-8 rounded-full border border-bd flex items-center justify-center text-xs font-bold text-ink-muted hover:border-or hover:text-or transition-colors">W</a>
              <a href="#" className="w-8 h-8 rounded-full border border-bd flex items-center justify-center text-xs font-bold text-ink-muted hover:border-or hover:text-or transition-colors">f</a>
            </div>
          </div>
        </div>
        <div className="border-t border-bd px-6 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-ink-faint">© 2025 Wahid Graphics. All rights reserved.</p>
          <a href="/admin/login" className="text-[10px] text-ink-faint/40 hover:text-ink-faint transition-colors">Admin Portal</a>
        </div>
      </footer>
    </>
  )
}
