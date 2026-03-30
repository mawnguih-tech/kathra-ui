import './style.css'
import { renderApp, initAppLogic } from './app.js'
import { renderLanding } from './landing.js'
import { startTerminalAnimation } from './terminal.js'
import { startUsecaseFeed } from './usecaseTerminal.js'
import { createIcons, icons } from 'lucide'

const root = document.querySelector('#app')

/* =========================
   PARALLAX
========================= */

let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 8
  targetY = (e.clientY / window.innerHeight - 0.5) * 8
})

function animateParallax() {
  currentX += (targetX - currentX) * 0.08
  currentY += (targetY - currentY) * 0.08

  document.body.style.setProperty('--bg-x', `${currentX}px`)
  document.body.style.setProperty('--bg-y', `${currentY}px`)

  requestAnimationFrame(animateParallax)
}

animateParallax()

/* =========================
   RENDER SYSTEM (FIXED)
========================= */

function renderPage(content, afterRender) {
  root.innerHTML = content
  if (afterRender) afterRender()
}

/* =========================
   ROUTES
========================= */

function loadLanding(push = true) {
  renderPage(renderLanding(), () => {
    startTerminalAnimation()
    startUsecaseFeed()
    createIcons({ icons })
  })

  if (push) history.pushState({ page: 'landing' }, '', '/')
}

function loadApp(push = true) {
  renderPage(renderApp(), () => {
    initAppLogic()
  })

  if (push) history.pushState({ page: 'app' }, '', '/app')
}

/* =========================
   INITIAL LOAD (FIXED)
========================= */

if (window.location.pathname === "/app") {
  loadApp(false)
} else {
  loadLanding(false)
}

/* =========================
   BACK / FORWARD
========================= */

window.addEventListener('popstate', (e) => {
  if (window.location.pathname === "/app") {
    loadApp(false)
  } else {
    loadLanding(false)
  }
})

/* =========================
   NAVIGATION
========================= */

document.addEventListener('click', (e) => {

  if (e.target.id === "enterApp") {
    loadApp()
  }

  if (e.target.id === "goBack") {
    loadLanding()
  }

  if (e.target.id === "liveDemoBtn") {
    const section = document.querySelector('.usecase')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

})