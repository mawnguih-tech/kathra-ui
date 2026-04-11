export function renderLanding() {
  return `
    <div class="landing">

      <!-- HERO -->
      <section class="hero">
        <div class="hero-left">
          <h1>
            Real-Time AI Transcription.<br>
            <span>Across Everything.</span>
          </h1>

          <p>
            Capture real time conversations, meetings, and system audio live.<br>
            Powered by next-gen speech intelligence.
          </p>

          <div class="hero-buttons">
            <button id="enterApp">Launch App</button>
            <button class="secondary" id="liveDemoBtn">Live Demo</button>
          </div>

          <!-- CLEAN TAGS -->
          <div class="hero-tags">

            <div class="tag">
              <i data-lucide="zap"></i>
              <span>Real-Time</span>
            </div>

            <div class="tag">
              <i data-lucide="mic"></i>
              <span>Multi Input</span>
            </div>

            <div class="tag">
              <i data-lucide="link"></i>
              <span>Solana Powered</span>
            </div>

          </div>
        </div>

        <div class="hero-right">
          <div class="hero-card terminal-card">

            <div class="terminal-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>

            <div class="fake-terminal" id="terminal"></div>

          </div>
        </div>
      </section>

      <!-- FEATURES -->
      <section class="features">

        <div class="feature-card">
          <div class="feature-top">
            <div class="feature-icon">
              <i data-lucide="mic"></i>
            </div>
            <h3>Universal Input</h3>
          </div>
          <p>Mic, system audio, or both. Capture everything in real-time.</p>
        </div>

        <div class="feature-card">
          <div class="feature-top">
            <div class="feature-icon">
              <i data-lucide="zap"></i>
            </div>
            <h3>Real-Time Engine</h3>
          </div>
          <p>Ultra-low latency streaming powered by modern AI pipelines.</p>
        </div>

        <div class="feature-card">
          <div class="feature-top">
            <div class="feature-icon">
              <i data-lucide="wallet"></i>
            </div>
            <h3>Pay-As-You-Go</h3>
          </div>
          <p>Powered by Solana. No subscriptions. Pay per session.</p>
        </div>

      </section>

      <!-- USE CASES -->
      <section class="usecase">

        <h2>Why Kathra Matters</h2>

        <div class="usecase-wrapper">

          <div class="usecase-left">

            <div class="usecase-item">
              <div class="uc-icon">
                <i data-lucide="headphones"></i>
              </div>
              <div>
                <h3>Content Consumption</h3>
                <p>Transcribe YouTube, podcasts, and streams in real-time.</p>
              </div>
            </div>

            <div class="usecase-item">
              <div class="uc-icon">
                <i data-lucide="briefcase"></i>
              </div>
              <div>
                <h3>Meetings & Calls</h3>
                <p>Capture conversations instantly without missing details.</p>
              </div>
            </div>

            <div class="usecase-item">
              <div class="uc-icon">
                <i data-lucide="cpu"></i>
              </div>
              <div>
                <h3>AI Workflows</h3>
                <p>Feed live transcription directly into AI tools and agents.</p>
              </div>
            </div>

            <div class="usecase-item">
              <div class="uc-icon">
                <i data-lucide="bar-chart-3"></i>
              </div>
              <div>
                <h3>Research & Trading</h3>
                <p>Track live discussions, spaces, and alpha in real-time.</p>
              </div>
            </div>

          </div>

          <div class="usecase-right">

            <div class="data-panel">

              <div class="data-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="data-title">Live Signal Feed</span>
              </div>

              <div class="data-body">
                <div class="data-line">[LIVE] Twitter Space → "SOL narrative heating up"</div>
                <div class="data-line">[AI] Transcribing stream...</div>
                <div class="data-line highlight">→ Keywords detected: "airdrop", "volume", "rotation"</div>
                <div class="data-line">→ Routing to AI agent...</div>
                <div class="data-line success">✓ Signal processed</div>
              </div>

            </div>

          </div>

        </div>

      </section>

      <!-- TECH -->
      <section class="tech">
        <h2>Powered By</h2>

        <div class="tech-grid">

          <div class="tech-item">
            <img src="/logos/whisper.svg" alt="Whisper AI" />
            <span>Whisper AI</span>
          </div>

          <div class="tech-item">
            <img src="/logos/deepgram.svg" alt="Deepgram" />
            <span>Deepgram</span>
          </div>

          <div class="tech-item">
            <i data-lucide="audio-waveform"></i>
            <span>Web Audio API</span>
          </div>

          <div class="tech-item">
            <img src="/logos/solana.svg" alt="Solana" />
            <span>Solana Web3</span>
          </div>

        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="cta">

        <h2>Join the Kathra Network</h2>

        <p class="cta-sub">
          Get early access, updates, and live signals as we build.
        </p>

        <div class="cta-socials">

  <a href="https://x.com/AiKathra95026" target="_blank" class="social-item">
    <div class="social-btn">
      <span class="icon-text">𝕏</span>
    </div>
    <span class="social-label">X</span>
  </a>

  <a href="https://t.me/kathraai" target="_blank" class="social-item">
    <div class="social-btn">
      <span class="icon-text">✈</span>
    </div>
    <span class="social-label">Telegram</span>
  </a>

  <a href="/whitepaper.pdf" target="_blank" class="social-item wp-item">
    <div class="social-btn wp-btn">
      <i data-lucide="scroll"></i>
    </div>
    <span class="social-label">Whitepaper</span>
  </a>

</div>

        </div>

      </section>

    </div>
  `
}