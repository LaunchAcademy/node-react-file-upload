import React from "react"

const MemeTile = ({ title, image }) => {

  return (
    <div className="callout">
      <h3>{title}</h3>
      <img src={image} />
    </div>
  )
}

export default MemeTile