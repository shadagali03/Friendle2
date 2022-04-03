// createGameDisplay = document.querySelector('.createGame')

document.getElementById("submit").onclick = async () => {
    const url = `${location.href}paths/${await (await fetch('/generateURL', { method: 'post', body: document.getElementById("inputWord").value })).text()}`
    const urlText = document.getElementById("url")
    urlText.textContent = url
    urlText.href = url
}