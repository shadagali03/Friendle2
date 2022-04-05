import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs/promises';
import axios from 'axios'

const app = express()
app.use(express.static('./public'))
app.use(express.json())
app.listen(3000)

const paths = new Map()

app.post('/generateurl', async (req, res) => {
    const path = (Math.random() + 1).toString(36).substring(7)
    paths.set(path, req.body.word)
    res.send(JSON.stringify({ path, customWord: req.body.customWord }))
})

app.get("/paths/:path", async (req, res) => {
    try {
        let htmlFile = await fs.readFile('./public/opponent.html', 'utf8')
        htmlFile = htmlFile.replace("$$REPLACEANSWER$$", paths.get(req.params.path))
        res.send(htmlFile)
    }
    catch (err) {
        console.log("error")
    }
})


app.get('/check', (req, res) => {
    const word = req.query.word
    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
        params: { entry: word },
        headers: {
            'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
            'X-RapidAPI-Key': '4335776fa6mshe20dea79d67d1d6p1f5c44jsn153f087d1e68'
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data.result_msg)
    }).catch((error) => {
        console.error(error)
    })
})