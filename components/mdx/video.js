import React from 'react'

const Video = (props) => {
  return (
    <div className="flex justify-center -mx-5 sm:mx-0">
      <video
        width="100%"
        controls
        loop
        muted
        playsInline
        src={props.src}
        autoPlay
        className="border-gray-100 cursor-pointer sm:mx-0 sm:border-2 sm:rounded-lg"
        {...props}
      />
    </div>
  )
}

export default Video
