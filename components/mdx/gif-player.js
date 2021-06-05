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
      className="transition-all duration-300 ease-in-out border border-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
    />
  ) : (
    <img
      src={props.src}
      alt={props.alt}
      loading="lazy"
      className="mx-auto"
      {...props}
    />
  )
}
