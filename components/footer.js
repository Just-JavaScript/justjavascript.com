import React from 'react'
import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import { useRouter } from 'next/router'
import { useViewer } from 'context/viewer-context'

const Footer = () => {
  const sellingLive = useSellingLive()
  const { purchased } = useViewer()
  const { pathname } = useRouter()

  return sellingLive || pathname === '/learn' ? (
    <footer
      className={`print:hidden lg:px-0 px-5 flex flex-col sm:items-start items-center justify-center w-full max-w-screen-lg pt-16 mx-auto space-y-16 sm:pt-24 sm:space-y-0 ${
        pathname === '/learn' ? 'sm:justify-between' : 'sm:justify-center'
      } sm:flex-row`}
    >
      <div className="flex flex-col items-center sm:items-start">
        {pathname === '/learn' && (
          <Link href="/invoice">
            <a className="flex items-center px-4 py-2 transition-all duration-200 ease-in-out rounded-lg sm:text-base hover:bg-white hover:shadow-xl">
              <i className="gg-file" />
              <span className="pl-3">Get your invoice</span>
            </a>
          </Link>
        )}
      </div>
      <div
        className={`flex flex-col ${
          pathname === '/learn' ? 'sm:items-end' : 'sm:items-center'
        } items-center pb-16`}
      >
        <Link href={purchased ? '/learn' : '/'}>
          <a tabIndex={-1} className="font-serif text-2xl font-extrabold">
            JJS
          </a>
        </Link>

        {sellingLive && (
          <div className="pt-16">
            <Link href="/terms">
              <a className="opacity-80 hover:opacity-100 text-sm">
                Terms & Conditions
              </a>
            </Link>
          </div>
        )}
      </div>
    </footer>
  ) : null
}

export default Footer
