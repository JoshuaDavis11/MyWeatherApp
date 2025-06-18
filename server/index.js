import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors());
const port = 5000;

app.get('/api/weather', async (req,res) =>{
    const {lat, lon} = req.query

    if(!lat || !lon) {
        return res.status(400).json({error:"Missing Lat or Lon"})
    }

    try{
        const apiKey = process.env.VITE_API_KEY
        console.log(apiKey)
        console.log(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}`)

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}`)
        const data = await response.json();
        res.json(data)

    } catch(err){
        res.status(500).json({error: "Weather API request Failed " + err})
    }
})

app.listen(port, () =>{
    console.log(`Server has started running on http://localhost:${port}`)
})
