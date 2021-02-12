import React, { useEffect, useState } from "react"

import MemeTile from "./MemeTile"
import NewMemeForm from "./NewMemeForm"
import ErrorList from "../shared/ErrorList"

const MemesList = (props) => {
  const [memes, setMemes] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getMemes()
  }, [])

  const getMemes = async () => {
    try {
      const response = await fetch("/api/v1/memes")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setMemes(body.memes)
    } catch (error) {
      console.error(`Error in getMemes Fetch: ${error.message}`)
    }
  }

  const addMeme = async (newMeme) => {
    try {
      const response = await fetch("/api/v1/memes", {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newMeme
      })
      if (!response.ok) {
        if (response.status === 404) {
          const body = await response.json()
          setErrors(body.errors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      }
      const body = await response.json()
      setMemes([
        ...memes,
        body.meme
      ])
    } catch (error) {
      console.error(`Error in addMeme Fetch: ${error.message}`)
    }
  }

  const memeTiles = memes.map((meme) => {
    return (
      <MemeTile
        key={meme.id}
        {...meme  }
      />
    )
  })

  return (
    <>
      <h1>Fresh Memes</h1>
      <ErrorList errors={errors} />
      <NewMemeForm addMeme={addMeme} />
      {memeTiles}
    </>
  )
}

export default MemesList