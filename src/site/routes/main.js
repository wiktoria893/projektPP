import * as express from "express";
const router = express.Router();
import fetch from "node-fetch";
import {limiter} from "../../utils/limiter.js";

router.get(`/`, (req, res) =>{
  return res.render(`main`)
})

router.get('/reset', async (req, res) => {
    limiter.resetKey(req.ip);
    res.send('Rate limit is reset!')
})

router.get(`/location/:city`, async (req, res) => {
  const {city} = req.params;
  const {lang} = req.query || "en";

  const response =
    await fetch(`http://localhost:3000/api/location/${city}?lang=${lang}&key=${process.env.API_KEY}`)

  const body = await response.json();
  return res.render(`city`, {city: body})
})

export default router