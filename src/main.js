import './style.css'
import { renderApp, initAppLogic } from './app.js'
import { renderLanding } from './landing.js'
import { startTerminalAnimation } from './terminal.js'
import { startUsecaseFeed } from './usecaseTerminal.js'
import { createIcons, icons } from 'lucide'

const root = document.querySelector('#app')

// 🔒 LOCK FLAG
const IS_FINALIZED = true // change to true after full payment


// helper render
function renderPage(content, afterRender) {
  root.innerHTML = content

  requestAnimationFrame(() => {
    if (afterRender) afterRender()
  })
}

// 🔒 DEPLOYMENT LOCK OVERLAY
function withLockOverlay(content) {
  if (IS_FINALIZED) return content

  return `
    <div style="position:relative">
      
      <div style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        padding:10px;
        text-align:center;
        font-size:13px;
        background:rgba(255,77,166,0.08);
        border-bottom:1px solid rgba(255,77,166,0.3);
        backdrop-filter:blur(6px);
        z-index:999;
      ">
        🚧 Deployment pending finalization
      </div>

      <div style="opacity:0.6; pointer-events:none;">
        ${content}
      </div>

    </div>
  `
}

// landing
function loadLanding(push = true) {
  renderPage(withLockOverlay(renderLanding()), () => {
    startTerminalAnimation()
    startUsecaseFeed()
    createIcons({ icons })
  })

  if (push) history.pushState({ page: 'landing' }, '', '/')
}

// app
function loadApp(push = true) {
  renderPage(withLockOverlay(renderApp()), () => {
    initAppLogic()
  })

  if (push) history.pushState({ page: 'app' }, '', '/app')
}

// initial load
loadLanding(false)

// browser navigation
window.addEventListener('popstate', (e) => {
  if (e.state?.page === 'app') {
    loadApp(false)
  } else {
    loadLanding(false)
  }
})

// clicks
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

  if (e.target.id === "goBack") {
    loadLanding()
  }

})