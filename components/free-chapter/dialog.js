import React from 'react'
import Image from 'next/image'
import { Dialog } from '@reach/dialog'
import DanAbramov from '../../public/dan-abramov.jpg'
import MaggieAppleton from '../../public/maggie-appleton.jpg'
import FreeChapterForm from './form'

const FreeChapterDialog = ({ close, isModalOpen, className = '' }) => {
  return (
    <Dialog
      className="rounded-lg flex flex-col items-center text-center relative sm:max-w-xl max-w-md z-50 w-full"
      style={{ width: '100%', zIndex: 999 }}
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
      <div className="sm:py-10 py-5 w-full">
        <h1 className="text-2xl font-bold leading-tight">
          Get free episode of JustJavaScript
        </h1>
        <h2 className="py-2 text-base mx-auto">
          We’ll send <b>The JavaScript Universe</b> episode to your email.
        </h2>
        <FreeChapterForm />
        <section className="flex items-center justify-center sm:pt-14 pt-8 border-t border-gray-100">
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

export default FreeChapterDialog
