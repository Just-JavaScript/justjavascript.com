import React from 'react'
import FreeChapterDialog from './dialog'

const FreeChapterCTA = () => {
  const [isModalOpen, setModalOpen] = React.useState(false)
  const open = () => setModalOpen(true)
  const close = () => setModalOpen(false)

  return (
    <div className="-mx-5 sm:-mx-8 p-8 text-center items-center flex flex-col pt-12 border-t border-gray-100 mt-12">
      <div className="text-xl font-bold">Still Not Convinced?</div>
      <p className="py-2">
        Get a glimpse of Just JavaScript by reading{' '}
        <b>The JavaScript Universe</b> episode for free.
      </p>
      <button
        onClick={open}
        className="mt-3 rounded-full px-10 py-3 hover:shadow-lg bg-white hover:scale-105 ease-in-out duration-150 transition-all text-lg font-bold border-2 border-black"
      >
        Get Free Preview
      </button>
      <FreeChapterDialog close={close} open={open} isModalOpen={isModalOpen} />
    </div>
  )
}

export default FreeChapterCTA
