import React, { useState } from "react"
import Dropzone from "react-dropzone"

const NewMemeForm = (props) => {
  const [meme, setMeme] = useState({
    title: "",
    image: {},
  })
  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
    name: "",
  })

  const handleChange = (event) => {
    event.preventDefault()
    setMeme({
      ...meme,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleImageUpload = (acceptedImage) => {
    // sets state for the image we want to post
    setMeme({
      ...meme,
      image: acceptedImage[0],
    })

    // sets state for a preview of the one uploaded image
    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
      name: acceptedImage[0].name,
    })

    // // example for preview multiple images
    // setUploadedImage(acceptedImage.map(file => Object.assign(file, {
    //   preview: URL.createObjectURL(file)
    // })))
  }

  const clearForm = () => {
    setMeme({
      title: "",
      image: {},
    })
    setUploadedImage({
      preview: "",
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = new FormData()
    body.append("title", meme.title)
    body.append("image", meme.image)
    props.addMeme(body)
    clearForm()
  }

  return (
    <form className="callout primary" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title"> Title </label>
        <input id="title" name="title" value={meme.title} onChange={handleChange} />
      </div>

      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Upload Your Meme - drag 'n' drop or click to upload</p>
            </div>
          </section>
        )}
      </Dropzone>

      <img src={uploadedImage.preview} alt={uploadedImage.name} className="sized-image" />
      <div className="button-group">
        <input className="button" type="submit" value="Add" />
        <input className="button" type="button" value="Clear" onClick={clearForm} />
      </div>
    </form>
  )
}

export default NewMemeForm
