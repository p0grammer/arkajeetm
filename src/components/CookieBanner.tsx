import { useState } from 'react'

const STORAGE_KEY = 'arkajeet-portfolio-privacy-notice-dismissed'

function hasDismissedNotice() {
  try { return window.localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !hasDismissedNotice())

  function dismiss() {
    try { window.localStorage.setItem(STORAGE_KEY, 'true') } catch { /* The notice still dismisses for this visit. */ }
    setVisible(false)
  }

  if (!visible) return null
  return <aside className="cookie-banner" aria-label="Cookie and privacy notice"><div><p className="mono">COOKIE &amp; PRIVACY NOTICE</p><p>This site uses Vercel Analytics for traffic statistics and does not use advertising cookies. It stores your choice to dismiss this notice in this browser. <a href="/privacy">Read the privacy policy</a>.</p></div><button type="button" onClick={dismiss}>Got it</button></aside>
}
