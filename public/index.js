// createGameDisplay = document.querySelector('.createGame')

document.getElementById("submit").onclick = async () => {
    //const buttonSelected = document.querySelector('input[name="userChoice"]:checked').value
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
    console.log(response, response.path)
    const url = `${location.href}paths/${response.path}?customWord=${response.customWord}`
    const urlText = document.getElementById("url")
    urlText.textContent = url
    urlText.href = url
}
