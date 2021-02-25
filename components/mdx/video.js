import React from 'react'

const Video = (props) => {
  return (
    <div className="sm:mx-0 -mx-5">
      <video
        controls
        loop
        muted
        playsInline
        src={props.src}
        autoPlay
        className="sm:mx-0 sm:border sm:rounded-lg border-gray-100 sm:shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
        {...props}
      />
    </div>
  )
}

export default Video
