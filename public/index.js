document.getElementById("submit").onclick = async () => {
    const customWord = document.getElementById('customWord').checked
    if (!customWord) {
        const json = await (await fetch(`http://localhost:3000/check/?word=${document.getElementById("inputWord").value}`)).json()
        if (json == 'Entry word not found') {
            alert("Word does not exist")
            return
        }
    }
    const response = await (await fetch('/generateURL', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: document.getElementById("inputWord").value, customWord })
    })).json()
    const url = `${location.href}paths/${response.path}?customWord=${response.customWord}`
    const urlText = document.getElementById("url")
    navigator.clipboard.writeText(url)
    urlText.textContent = url
    urlText.href = url
}
