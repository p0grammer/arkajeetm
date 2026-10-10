import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const spring = { type: 'spring' as const, stiffness: 500, damping: 30 }

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <motion.header className="nav-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      <a className="wordmark" href="/#top" aria-label="Arkajeet Mukherjee home"><span className="mark">A<span>.</span></span><span className="wordmark-name">ARKAJEET MUKHERJEE</span></a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="/#work">Selected work</a><a href="/#about">About</a><a href="/#trajectory">Trajectory</a>
      </nav>
      <motion.a className="nav-contact" href="https://wa.me/919002753627" target="_blank" rel="noreferrer" whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.97 }} transition={spring}>WhatsApp <ArrowUpRight size={14} /></motion.a>
      <button className="mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="/#work" onClick={() => setMenuOpen(false)}>Selected work</a><a href="/#about" onClick={() => setMenuOpen(false)}>About</a><a href="/#trajectory" onClick={() => setMenuOpen(false)}>Trajectory</a><a href="/privacy" onClick={() => setMenuOpen(false)}>Privacy</a><a href="/terms" onClick={() => setMenuOpen(false)}>Terms</a><a href="https://wa.me/919002753627" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Chat on WhatsApp ↗</a></nav>}
    </motion.header>
  )
}
