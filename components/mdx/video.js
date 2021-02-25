import React from 'react'

const Video = (props) => {
  return (
    <video
      controls
      loop
      muted
      playsInline
      src={props.src}
      autoPlay
      className="border rounded-lg border-gray-100 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
      {...props}
    />
  )
}

export default Video
