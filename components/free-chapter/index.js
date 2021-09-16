import React from 'react'
import Image from 'next/image'
import { Dialog } from '@reach/dialog'
import DanAbramov from '../../public/dan-abramov.jpg'
import MaggieAppleton from '../../public/maggie-appleton.jpg'
import FreeChapterForm from './form'

const FreeChapterCTA = () => {
  const [isModalOpen, setModalOpen] = React.useState(false)
  const open = () => setModalOpen(true)
  const close = () => setModalOpen(false)

  const SubscribeDialog = () => {
    return (
      <Dialog
        className="rounded-lg flex flex-col items-center text-center relative max-w-xl"
        style={{ width: '95%' }}
        isOpen={isModalOpen}
        onDismiss={close}
      >
        <button
          className="absolute top-0 right-0 px-4 py-3 hover:bg-gray-100 transition-colors ease-in-out duration-150 rounded-tr-lg"
          onClick={close}
        >
          <span className="sr-only">Close</span>
          <span aria-hidden className="text-2xl leading-none">
            ×
          </span>
        </button>
        <div className="py-10 w-full">
          <h1 className="text-2xl font-bold leading-tight">
            Get free episode of JustJavaScript
          </h1>
          <h2 className="py-2 text-base mx-auto">
            We’ll send <b>The JavaScript Universe</b> episode to your email.
          </h2>
          <FreeChapterForm />
          <section className="flex items-center justify-center pt-14 border-t border-gray-100">
            <div className="flex items-center">
              <div className="relative z-10 rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                <Image src={DanAbramov} width={50} height={50} quality={100} />
              </div>
              <div className="-translate-x-4 rounded-full overflow-hidden border-2 border-transparent flex items-center justify-center">
                <Image
                  src={MaggieAppleton}
                  width={50}
                  height={50}
                  quality={100}
                />
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold">We hope you’ll like it!</div>
              <div className="text-sm">Dan {'&'} Maggie</div>
            </div>
          </section>
        </div>
      </Dialog>
    )
  }

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
      <SubscribeDialog />
    </div>
  )
}

export default FreeChapterCTA
