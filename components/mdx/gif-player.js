import React from 'react'
// import {GifPlayer as ReactGifPlayer} from 'react-gif-player'
import dynamic from 'next/dynamic'

const ReactGifPlayer = dynamic(() => import('react-gif-player'), {
  ssr: false,
})

export default function GifPlayer(props) {
  return props.src.includes('gif') ? (
    <ReactGifPlayer gif={props.src} />
  ) : (
    <img src={props.src} alt={props.alt} />
  )
}
