import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Meme from "../../../models/Meme.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import uploadImage from "../../../services/uploadImage.js"

const memesRouter = new express.Router()

memesRouter.get("/", async (req, res) => {
  try {
    const memes = await Meme.query()
    return res.status(200).json({ memes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

memesRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    const { body, user } = req
    const bodyInput = await cleanUserInput(body)

    const formData = {
      ...bodyInput,
      image: req.file.location,
      userId: user.id
    }
    const meme = await Meme.query().insertAndFetch(formData)
    return res.status(201).json({ meme })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default memesRouter
