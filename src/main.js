import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="app">
     <div class="character-bg"></div>

    <div class="sidebar">
      <h2>KATHRA</h2>
      <div class="nav">
        <button class="nav-item active" data-page="live">Live</button>
        <button class="nav-item" data-page="logs">Logs</button>
        <button class="nav-item" data-page="settings">Settings</button>
      </div>
    </div>

    <div class="main">

      <div class="topbar">
        <div class="topbar-left">
          <div class="status" id="statusWrapper">
            <span class="status-dot"></span>
            <span id="statusText">KATHRA idle</span>
          </div>
        </div>

        <div class="topbar-right">
          <div class="wallet">
            <button id="connectWallet">Connect</button>
            <span id="walletStatus">Not Connected</span>
          </div>
        </div>
      </div>

      <div id="livePage" class="page active">

        <div id="transcript" class="terminal">
          <span class="placeholder">Awaiting input...</span>
        </div>

        <div id="speechOverlay" class="speech-overlay">
          <div id="liveSpeech" class="live-speech"></div>

          <div class="audio-bar" id="audioBar">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div class="controls">
          <button id="payBtn">Pay 0.001 SOL</button>
          <button id="startBtn" disabled>Start Session</button>
          <button id="stopBtn">Stop</button>
          <button id="exportBtn">Export</button>
        </div>
      </div>

      <div id="logsPage" class="page">
        <h3>Session Logs</h3>
        <pre id="logsBox">No logs yet...</pre>
      </div>

      <div id="settingsPage" class="page">
        <h3>Settings</h3>

        <div class="settings-block">
          <h4>Input Mode</h4>

          <label><input type="radio" name="mode" value="mic" checked> 🎤 Mic</label><br>
          <label><input type="radio" name="mode" value="media"> 🖥️ System</label><br>
          <label><input type="radio" name="mode" value="both"> ⚡ Mic + System</label>
        </div>

      </div>

    </div>
  </div>
`

// ============================
// NAV
// ============================

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"))
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"))

    btn.classList.add("active")
    document.getElementById(btn.dataset.page + "Page").classList.add("active")
  }
})

// ============================
// INPUT MODE
// ============================

let inputMode = "mic"

document.addEventListener("change", (e) => {
  if (e.target.name === "mode") inputMode = e.target.value
})

// ============================
// WALLET
// ============================

const connectWalletBtn = document.getElementById("connectWallet")
const walletStatus = document.getElementById("walletStatus")

let walletConnected = false

connectWalletBtn.onclick = async () => {
  try {
    const provider = window.solana

    if (!provider || !provider.isPhantom) {
      alert("Install Phantom Wallet")
      return
    }

    const res = await provider.connect()
    const address = res.publicKey.toString()

    walletConnected = true

    walletStatus.textContent =
      "Connected: " + address.slice(0, 4) + "..." + address.slice(-4)

    connectWalletBtn.textContent = "Disconnect"

  } catch {
    alert("Wallet connection failed")
  }
}

// ============================
// PAYMENT
// ============================

const payBtn = document.getElementById("payBtn")
const startBtn = document.getElementById("startBtn")

let sessionActive = false
let isPaying = false
const SESSION_PRICE = 0.001

payBtn.onclick = async () => {
  if (isPaying) return
  if (!walletConnected) return alert("Connect wallet first.")

  try {
    const provider = window.solana

    const connection = new solanaWeb3.Connection(
      "https://mainnet.helius-rpc.com/?api-key=0c578682-fe6b-4c4b-af1d-d16dc9a1069e",
      "confirmed"
    )

    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new solanaWeb3.PublicKey("HP3rx7xBGfwiG4iNLULzvkuUyDgyYtWg9UTpABHKf86u"),
        lamports: SESSION_PRICE * solanaWeb3.LAMPORTS_PER_SOL,
      })
    )

    transaction.feePayer = provider.publicKey
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    isPaying = true
    payBtn.textContent = "Processing..."
    payBtn.disabled = true

    const { signature } = await provider.signAndSendTransaction(transaction)
    await connection.confirmTransaction(signature)

    sessionActive = true
    payBtn.textContent = "Paid ✔"
    startBtn.disabled = false

  } catch (err) {
    alert(err.message || "Payment failed")
    payBtn.textContent = "Pay 0.001 SOL"
    payBtn.disabled = false
  }

  isPaying = false
}

// ============================
// AUDIO ENGINE
// ============================

let audioContext, analyser, dataArray
const bars = document.querySelectorAll("#audioBar span")

function setupAudio(stream) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)()

  analyser = audioContext.createAnalyser()
  analyser.fftSize = 64

  dataArray = new Uint8Array(analyser.frequencyBinCount)

  const source = audioContext.createMediaStreamSource(stream)
  source.connect(analyser)

  animateBars()
}

function animateBars() {
  requestAnimationFrame(animateBars)
  analyser.getByteFrequencyData(dataArray)

  bars.forEach((bar, i) => {
    const val = dataArray[i]
    bar.style.height = Math.max(8, val / 1.5) + "px"
    bar.style.opacity = val > 20 ? 1 : 0.3
  })
}

// ============================
// SESSION
// ============================

const transcriptDiv = document.getElementById("transcript")
const liveSpeech = document.getElementById("liveSpeech")
const overlay = document.getElementById("speechOverlay")

async function startSession() {
  transcriptDiv.innerHTML = `<span class="prefix">KATHRA //</span><br>`

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    setupAudio(stream)
  } catch {
    alert("Audio capture failed")
  }

  try { recognition.stop() } catch {}

  setTimeout(() => {
    try { recognition.start() } catch {}
  }, 200)
}

// ============================
// SPEECH (FINAL FIX)
// ============================

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

let recognition = new webkitSpeechRecognition()
let finalTranscript = ""
let isListening = false
let fadeTimer

recognition.continuous = true
recognition.interimResults = true

recognition.onstart = () => {
  isListening = true
  statusText.textContent = "KATHRA listening..."
  statusWrapper.classList.add("listening")
}

recognition.onend = () => {
  if (!isMobile && isListening) {
    try { recognition.start() } catch {}
  }
}

recognition.onresult = (e) => {
  let interim = ""

  for (let i = e.resultIndex; i < e.results.length; i++) {
    const text = e.results[i][0].transcript

    if (e.results[i].isFinal) {
      finalTranscript += `[${new Date().toLocaleTimeString()}] ${text}\n`
      liveSpeech.textContent = ""
      setTimeout(() => overlay.classList.remove("active"), 300)
    } else {
      interim += text
    }
  }

  if (interim) {
    liveSpeech.textContent = interim
    overlay.classList.add("active")

    clearTimeout(fadeTimer)
    fadeTimer = setTimeout(() => {
      overlay.classList.remove("active")
    }, 1200)
  }

  transcriptDiv.innerHTML = `
    <span class="prefix">KATHRA //</span><br>
    <pre>${finalTranscript}</pre>
  `
}

// ============================
// CONTROLS
// ============================

const stopBtn = document.getElementById("stopBtn")
const exportBtn = document.getElementById("exportBtn")
const logsBox = document.getElementById("logsBox")
const statusText = document.getElementById("statusText")
const statusWrapper = document.getElementById("statusWrapper")

startBtn.onclick = () => {
  if (!sessionActive) return alert("Pay first.")
  startSession()
}

stopBtn.onclick = () => {
  isListening = false
  try { recognition.stop() } catch {}

  overlay.classList.remove("active")

  statusText.textContent = "KATHRA idle"
  statusWrapper.classList.remove("listening")

  logsBox.textContent = finalTranscript || "No logs yet..."
}

exportBtn.onclick = () => {
  const blob = new Blob([finalTranscript], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "kathra-session-log.txt"
  a.click()
}