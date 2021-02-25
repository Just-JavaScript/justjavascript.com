import React from 'react'
// import {GifPlayer as ReactGifPlayer} from 'react-gif-player'
import dynamic from 'next/dynamic'

const ReactGifPlayer = dynamic(() => import('react-gif-player'), {
  ssr: false,
})

export default function GifPlayer(props) {
  return props.src.includes('gif') ? (
    <ReactGifPlayer
      gif={props.src}
      className="border rounded-lg border-gray-100 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
    />
  ) : (
    <img src={props.src} alt={props.alt} {...props} />
  )
}
