import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs/promises';

const app = express()
app.use(express.static('./public'))
app.use(express.text())
app.use(express.json())
app.listen(3000)

const paths = new Map()
// const listOfWords = await ((await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')).text)
// console.log(listOfWords)
app.post('/generateURL', async (req, res) => {
    const path = (Math.random() + 1).toString(36).substring(7)
    paths.set(path, req.body)
    res.send(path)
})

app.get("/paths/:path", async (req, res) => {
    // console.log(req.params.path)
    try {
        // res.sendFile(path.join(path.resolve(), './public/opponent.html'));
        let htmlFile = await fs.readFile('./public/opponent.html', 'utf8')
        console.log(req.params.path, paths.get(req.params.path))
        htmlFile = htmlFile.replace("$$REPLACEANSWER$$", paths.get(req.params.path))
        res.send(htmlFile)
    }
    catch (err) {
        console.log("error")
    }
    // console.log(path.join(path.resolve(), './public/opponent.html'))
    // res.send(await fs.readFile('./public/opponent.html', 'utf8'))
    // res.send(paths.get(req.params.path))
})