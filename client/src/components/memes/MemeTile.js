import React from "react"

const MemeTile = ({ title, image }) => {
  return (
    <div className="callout secondary">
      <h3>{title}</h3>
      <img src={image} className="sized-image" />
    </div>
  )
}

export default MemeTile
