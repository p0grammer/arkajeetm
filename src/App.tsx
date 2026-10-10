import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, AudioLines, Code2, Orbit, RadioTower, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from './components/HeroScene'
import Nav from './components/Nav'

gsap.registerPlugin(ScrollTrigger)

const spring = { type: 'spring' as const, stiffness: 500, damping: 30 }

const hubs = [
  { number: '01', icon: Code2, title: 'Software engineering', description: 'Systems-minded software, from the first interface to the service beneath it.', tags: ['Python', 'C++', 'Tauri', 'Microservices'], className: 'tile-software', link: '#software' },
  { number: '02', icon: AudioLines, title: 'Audio production', description: 'A decade of sonic worlds, mixes, and artist-first experiences with Kaghze Audio Services and No STRSS.', tags: ['Spatial audio', 'Sound design', '10+ years'], className: 'tile-audio', link: '#audio' },
  { number: '03', icon: RadioTower, title: 'Digital deployments', description: 'Web applications and digital campaigns designed to move people forward.', tags: ['Full-stack', 'Growth', 'Launch'], className: 'tile-digital', link: '#digital' },
  { number: '04', icon: Orbit, title: 'Aerospace trajectory', description: 'Currently pursuing a BCA, with a long-term goal of aerospace systems engineering.', tags: ['BCA in progress', 'GATE prep', 'Systems engineering'], className: 'tile-aerospace', link: '#trajectory' },
]

const hubDetails = [
  { id: 'software', index: '01', title: 'Software engineering', lead: 'Thoughtful software, designed from the system outward.', detail: 'Full-stack product work, desktop tools, and service architecture. I enjoy making complex systems feel clear, capable, and dependable.', tags: ['Python', 'C++', 'Tauri', 'Microservices'] },
  { id: 'audio', index: '02', title: 'Audio production', lead: 'Ten years shaping sound and the spaces around it.', detail: 'From production and sound design to spatial listening, my audio practice spans Kaghze Audio Services and No STRSS.', tags: ['Production', 'Spatial audio', 'Sound design'] },
  { id: 'digital', index: '03', title: 'Digital deployments', lead: 'Good ideas deserve a considered route into the world.', detail: 'Web applications and digital marketing meet in launches that are useful, coherent, and built around the people they serve.', tags: ['Web apps', 'Digital marketing', 'Full-stack'] },
  { id: 'aerospace', index: '04', title: 'Aerospace trajectory', lead: 'A deliberate path toward aerospace systems engineering.', detail: 'I’m currently pursuing my Bachelor of Computer Applications (BCA) and preparing for GATE as I work toward a future in aerospace systems engineering. MCA is a possible next step, not a completed qualification.', tags: ['BCA in progress', 'GATE preparation', 'Systems engineering'] },
]

function Hero() {
  return (
    <section className="hero" id="top">
      <HeroScene />
      <div className="hero-vignette" />
      <div className="hero-meta mono"><span><i className="status-dot" /> OPEN TO SELECT PROJECTS</span><span>22°34′ N&nbsp; / &nbsp;88°22′ E</span></div>
      <div className="hero-copy">
        <p className="eyebrow mono"><span className="eyebrow-line" /> INDEPENDENT BUILDER · KOLKATA, INDIA</p>
        <h1>Arkajeet Mukherjee<span className="name-dot">.</span><br /><span className="hero-title-sub">Systems &amp; Software Developer</span></h1>
        <p className="hero-description">Bridging digital culture, high-performance software,<br className="desktop-break" /> and the invisible architecture of sound.</p>
        <div className="hero-actions">
          <motion.a className="button-primary" href="https://wa.me/919002753627" target="_blank" rel="noreferrer" whileHover={{ y: -3, boxShadow: '0 12px 44px rgba(255,255,255,.12)' }} whileTap={{ scale: 0.97 }} transition={spring}>Chat on WhatsApp <ArrowUpRight size={15} /></motion.a>
          <a className="text-link" href="#work">Explore the work <ArrowDown size={14} /></a>
        </div>
      </div>
      <div className="hero-bottom mono"><span>ENGINEERING WITH INTENTION</span><span className="scroll-cue"><span /> SCROLL TO EXPLORE</span><span>01 — 04</span></div>
      <div className="hero-side-note mono">SOFTWARE&nbsp; / &nbsp;SOUND&nbsp; / &nbsp;SPACE</div>
    </section>
  )
}

function Intro() {
  return (
    <section className="intro section-pad" id="about">
      <div className="section-label mono"><span>01</span><span className="label-rule" /> A MULTIDISCIPLINARY PRACTICE</div>
      <div className="intro-layout">
        <h2 className="intro-heading">Different disciplines.<br /><span>One way of thinking.</span></h2>
        <div className="intro-body"><p>I’m drawn to the systems behind things: the signal chain that makes a record feel alive, the software that makes complex work feel simple, the engineering that makes a spacecraft possible.</p><p>For more than a decade, I’ve moved between sound, code, and digital strategy. Each field sharpens the next.</p><a className="inline-link" href="#trajectory">A little more about me <ArrowRight size={15} /></a></div>
      </div>
      <div className="stat-row"><div><strong>10<span>+</span></strong><small>YEARS IN AUDIO</small></div><div><strong>04</strong><small>DISCIPLINES, ONE PRACTICE</small></div><div><strong>∞</strong><small>THINGS LEFT TO BUILD</small></div><div className="stat-note mono">CURIOUS BY DEFAULT.<br />PRECISE BY DESIGN.</div></div>
    </section>
  )
}

function WorkGrid() {
  return (
    <section className="work-section section-pad" id="work">
      <div className="section-label mono"><span>02</span><span className="label-rule" /> FOUR DIRECTIONS, ONE NORTH STAR</div>
      <div className="section-heading-row"><div><p className="eyebrow mono">AREAS OF PRACTICE</p><h2>Where I <span>come alive.</span></h2></div><p className="section-aside">The work changes shape.<br />The attention to detail doesn’t.</p></div>
      <div className="bento-grid">
        {hubs.map(({ number, icon: Icon, title, description, tags, className, link }) => (
          <a className={`bento-tile ${className}`} href={link} key={number}>
            <div className="tile-top mono"><span>{number} / 04</span><span className="tile-icon"><Icon size={18} strokeWidth={1.5} /></span></div>
            <div className="tile-copy"><h3>{title}</h3><p>{description}</p></div>
            <div className="tile-bottom"><div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="tile-arrow"><ArrowUpRight size={17} /></span></div>
            <div className="tile-graphic" aria-hidden="true"><span className="graphic-orbit orbit-a" /><span className="graphic-orbit orbit-b" /><span className="graphic-core">{number}</span></div>
          </a>
        ))}
      </div>
    </section>
  )
}

function HubDetails() {
  return (
    <section className="hub-details section-pad" aria-label="Practice areas">
      {hubDetails.map((hub) => <article className="hub-detail" id={hub.id} key={hub.id}>
        <p className="mono hub-index">{hub.index} / PRACTICE</p>
        <div><h3>{hub.title}</h3><p className="hub-lead">{hub.lead}</p><p className="hub-description">{hub.detail}</p></div>
        <div className="hub-tags">{hub.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </article>)}
    </section>
  )
}

function Manifesto() {
  return (
    <section className="manifesto" id="trajectory">
      <div className="manifesto-glow" />
      <div className="section-label mono"><span>03</span><span className="label-rule" /> THE LONG VIEW</div>
      <div className="manifesto-content"><Sparkles className="manifesto-icon" size={19} strokeWidth={1.2} /><p className="manifesto-kicker mono">A SYSTEM IN MOTION</p><h2>From the studio<br />to the <span>stars.</span></h2><p className="manifesto-body">My next frontier is aerospace systems engineering. I’m building toward it with the same mindset I bring to every project: stay curious, understand the whole system, and make every detail earn its place.</p><div className="trajectory-line"><div className="trajectory-stop"><span className="stop-dot active" /><p className="mono">IN PROGRESS</p><strong>Bachelor of Computer Applications</strong><small>BCA student</small></div><div className="trajectory-connector"><span /></div><div className="trajectory-stop"><span className="stop-dot" /><p className="mono">FUTURE STUDY</p><strong>Further study</strong><small>MCA considered</small></div><div className="trajectory-connector future"><span /></div><div className="trajectory-stop future-stop"><span className="stop-dot" /><p className="mono">LONG-TERM GOAL</p><strong>Aerospace Systems</strong><small>GATE preparation</small></div></div></div>
    </section>
  )
}

function Contact() {
  return (
    <footer className="contact section-pad" id="contact">
      <div className="section-label mono"><span>04</span><span className="label-rule" /> THE NEXT CHAPTER</div>
      <div className="contact-main"><p className="eyebrow mono">HAVE A GOOD PROBLEM?</p><h2>Let’s make<br /><span>something matter.</span></h2><div className="contact-actions"><motion.a className="contact-button" href="https://wa.me/919002753627" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>Chat on WhatsApp <ArrowUpRight size={17} /></motion.a><a className="contact-secondary" href="mailto:mukherjeearkajeet98@gmail.com">Or email me directly</a></div></div>
      <address className="contact-details"><a href="tel:+919002753627">+91 9002753627</a><a href="mailto:mukherjeearkajeet98@gmail.com">mukherjeearkajeet98@gmail.com</a><a href="https://github.com/p0grammer" target="_blank" rel="noreferrer">GitHub ↗</a><span>2/28 Adarsha Pally, Kolkata, 700092</span></address>
      <div className="footer-bottom mono"><span>© {new Date().getFullYear()} ARKAJEET MUKHERJEE</span><span><a href="/privacy">PRIVACY</a>&nbsp; / &nbsp;<a href="/terms">TERMS</a></span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  )
}

export function HomePage() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 35, opacity: 0, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.2 })
      gsap.from('.hero-meta, .hero-bottom, .hero-side-note', { opacity: 0, duration: 1, stagger: 0.12, delay: 0.75 })
      gsap.utils.toArray<HTMLElement>('.section-label').forEach((label) => {
        gsap.fromTo(label, { x: -36, z: -120, rotationY: -32, rotationX: 8, autoAlpha: 0.35 }, { x: 0, z: 0, rotationY: 0, rotationX: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: label, start: 'top 94%', end: 'top 58%', scrub: 1 } })
      })
      gsap.to('.hero-canvas', { yPercent: 16, rotation: -5, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.fromTo('.intro-heading', { y: 130, z: -240, rotateX: -20, rotateY: 8, rotationZ: -3, autoAlpha: 0.25 }, { y: 0, z: 0, rotateX: 0, rotateY: 0, rotationZ: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: '.intro-heading', start: 'top 94%', end: 'top 43%', scrub: 1 } })
      gsap.from('.intro-body > *', { scrollTrigger: { trigger: '.intro-body', start: 'top 78%' }, y: 35, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out' })
      gsap.from('.stat-row > *', { scrollTrigger: { trigger: '.stat-row', start: 'top 86%' }, y: 32, opacity: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' })
      gsap.fromTo('.section-heading-row', { y: 80, z: -170, rotateY: -12, rotateX: 7, autoAlpha: 0.3 }, { y: 0, z: 0, rotateY: 0, rotateX: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: '.work-section', start: 'top 88%', end: 'top 32%', scrub: 1 } })
      gsap.fromTo('.bento-tile', { y: 180, z: -300, rotateX: 24, rotateY: (index) => index % 2 ? 16 : -16, rotationZ: (index) => index % 2 ? 5 : -5, autoAlpha: 0.18 }, { y: 0, z: 0, rotateX: 0, rotateY: 0, rotationZ: 0, autoAlpha: 1, ease: 'power2.out', stagger: { each: 0.09, from: 'random' }, scrollTrigger: { trigger: '.bento-grid', start: 'top 91%', end: 'center 46%', scrub: 1 } })
      gsap.fromTo('.hub-detail', { x: -85, z: -170, rotateY: 11, rotationZ: 2, autoAlpha: 0.3 }, { x: 0, z: 0, rotateY: 0, rotationZ: 0, autoAlpha: 1, ease: 'none', stagger: { each: 0.12 }, scrollTrigger: { trigger: '.hub-details', start: 'top 92%', end: 'bottom 55%', scrub: 1 } })
      gsap.to('.manifesto-content', { scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 }, yPercent: -8, rotateX: -4, rotationZ: 1.5, ease: 'none' })
      gsap.to('.manifesto-glow', { scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 }, rotate: 16, scale: 1.18, ease: 'none' })
      gsap.from('.manifesto-content > *', { scrollTrigger: { trigger: '.manifesto-content', start: 'top 72%' }, y: 55, rotateX: -8, transformOrigin: '50% 100%', opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
      gsap.fromTo('.trajectory-connector span', { scaleX: 0, rotateY: 70, transformOrigin: 'left center' }, { scaleX: 1, rotateY: 0, ease: 'none', stagger: { each: 0.22 }, scrollTrigger: { trigger: '.trajectory-line', start: 'top 84%', end: 'top 43%', scrub: 1 } })
      gsap.fromTo('.contact-main h2', { y: 120, z: -220, rotateX: 20, rotateY: -10, rotationZ: -3, autoAlpha: 0.25 }, { y: 0, z: 0, rotateX: 0, rotateY: 0, rotationZ: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: '.contact-main h2', start: 'top 92%', end: 'top 42%', scrub: 1 } })
      gsap.from('.contact-main .eyebrow, .contact-actions', { scrollTrigger: { trigger: '.contact-main', start: 'top 80%' }, y: 45, z: -90, rotateX: 8, opacity: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out' })
      gsap.from('.footer-bottom > *', { scrollTrigger: { trigger: '.footer-bottom', start: 'top 100%' }, y: 15, opacity: 0, duration: 0.7, stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  return <div className="app-shell" ref={root}><Nav /><main><Hero /><Intro /><WorkGrid /><HubDetails /><Manifesto /><Contact /></main></div>
}
