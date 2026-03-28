export function startTerminalAnimation() {
  const terminal = document.getElementById("terminal")
  if (!terminal) return

  const lines = [
    "> booting kathra core...",
    "> initializing streams...",
    "> listening...",
    '"capturing system audio..."'
  ]

  let i = 0
  let j = 0

  function type() {
    if (i < lines.length) {
      if (j < lines[i].length) {
        const char = lines[i][j]

        if (char === ">") {
          terminal.innerHTML += '<span class="cmd">></span>'
          j++
        } else {
          terminal.innerHTML += char
          j++
        }

        setTimeout(type, 20)
      } else {
        terminal.innerHTML += "<br>"
        i++
        j = 0
        setTimeout(type, 300)
      }
    }
  }

  terminal.innerHTML = ""
  type()
}