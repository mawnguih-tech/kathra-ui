export function startUsecaseFeed() {
  const container = document.querySelector(".data-body")
  if (!container) return

  container.innerHTML = ""

  const events = [
    '[LIVE] Twitter Space → "SOL narrative heating up"',
    '[AI] Transcribing stream...',
    '→ Keywords detected: "airdrop", "volume", "rotation"',
    '→ Routing to AI agent...',
    '✓ Signal processed',
    '[LIVE] YouTube → "ETH ecosystem update"',
    '[AI] Parsing audio...',
    '→ Keywords detected: "layer2", "zk", "fees"',
    '→ Sending to model...',
    '✓ Signal processed',
  ]

  function createLine(text) {
    const line = document.createElement("div")
    line.className = "data-line"
    
    if (text.includes("Keywords")) line.classList.add("highlight")
    if (text.includes("✓")) line.classList.add("success")

    container.appendChild(line)

    let i = 0
    const typing = setInterval(() => {
      line.textContent += text[i]
      i++

      if (i >= text.length) {
        clearInterval(typing)

        // auto scroll
        container.scrollTop = container.scrollHeight

        // next line
        setTimeout(runNext, getDynamicDelay(text))
      }
    }, 12)
  }

  function getDynamicDelay(text) {
    if (text.includes("Keywords")) return 900
    if (text.includes("✓")) return 1200
    if (text.includes("[LIVE]")) return 600
    return 400
  }

  function runNext() {
    const random = events[Math.floor(Math.random() * events.length)]
    createLine(random)

    // limit lines (simulate terminal overflow)
    if (container.children.length > 12) {
      container.removeChild(container.firstChild)
    }
  }

  // start loop
  runNext()
}