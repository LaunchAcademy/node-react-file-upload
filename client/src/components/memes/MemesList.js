import React, { useEffect, useState } from "react"

import MemeTile from "./MemeTile"

const MemesList = (props) => {
  const [memes, setMemes] = useState([])

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

  useEffect(() => {
    getMemes()
  }, [])

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
      {memeTiles}
    </>
  )
}

export default MemesList