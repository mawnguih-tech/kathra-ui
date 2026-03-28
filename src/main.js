import './style.css'
import { renderApp, initAppLogic } from './app.js'
import { renderLanding } from './landing.js'
import { startTerminalAnimation } from './terminal.js'
import { startUsecaseFeed } from './usecaseTerminal.js'
import { createIcons, icons } from 'lucide'

const root = document.querySelector('#app')

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