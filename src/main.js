import './style.css'
import { renderApp, initAppLogic } from './app.js'
import { renderLanding } from './landing.js'
import { startTerminalAnimation } from './terminal.js'
import { startUsecaseFeed } from './usecaseTerminal.js'
import { createIcons, icons } from 'lucide'

const root = document.querySelector('#app')

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 12;
  targetY = (e.clientY / window.innerHeight - 0.5) * 12;
});

function animateParallax() {
  // smooth interpolation (THIS is the magic)
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  document.body.style.setProperty('--bg-x', `${currentX}px`);
  document.body.style.setProperty('--bg-y', `${currentY}px`);

  requestAnimationFrame(animateParallax);
}

animateParallax();
// helper: smooth render
function renderPage(content, afterRender) {
  root.innerHTML = `<div class="page">${content}</div>`

  const page = document.querySelector('.page')

  requestAnimationFrame(() => {
    page.classList.add('active')

    if (afterRender) afterRender()
  })
}

// landing
function loadLanding(push = true) {
  renderPage(renderLanding(), () => {
    startTerminalAnimation()
    startUsecaseFeed()
    createIcons({ icons })
  })

  if (push) history.pushState({ page: 'landing' }, '', '/')
}

// app
function loadApp(push = true) {
  renderPage(renderApp(), () => {
    initAppLogic()
  })

  if (push) history.pushState({ page: 'app' }, '', '/app')
}

// initial load
loadLanding(false)

// handle back/forward browser
window.addEventListener('popstate', (e) => {
  if (e.state?.page === 'app') {
    loadApp(false)
  } else {
    loadLanding(false)
  }
})

// navigation clicks
document.addEventListener('click', (e) => {

  if (e.target.id === "enterApp") {
    loadApp()
  }

  if (e.target.id === "liveDemoBtn") {
    const section = document.querySelector('.usecase')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 🔥 BACK BUTTON (we add next)
  if (e.target.id === "goBack") {
    loadLanding()
  }

})