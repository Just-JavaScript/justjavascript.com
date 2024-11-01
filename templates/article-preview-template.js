import React from 'react'
import Layout from '../components/layout'
import ConvertkitSubscribeAndTagForm from '../components/convertkit-subscribe-and-tag'
import DanAbramov from '../public/dan-abramov.jpg'
import Image from "next/legacy/image"
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useViewer } from 'context/viewer-context'
import FreeChapterForm from 'components/free-chapter/form'
import Commerce from 'components/commerce'

const Article = ({
  bundles,
  children,
  title,
  series,
  episode,
  next,
  prev,
  nextTitle,
  bottomContent,
  authorized,
  byline,
  CK_TAG_ID,
  ogImage,
  ...props
}) => {
  const router = useRouter()
  const { purchased } = useViewer()

  React.useEffect(() => {
    if (router.query.continue && authorized) {
      toast('Enjoy this free chapter!')
      document.getElementById('continue')?.scrollIntoView()
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname
      )
    }
  }, [authorized, router])
  return (
    <Layout
      background="bg-white"
      meta={{ title, ogImage: { url: ogImage } }}
      {...props}
    >
      <article>
        {title && (
          <header className="relative flex flex-col items-center justify-center pt-48 sm:pb-40 pb-32 min-h-[60vh] text-center">
            <h1 className="lg:px-10 px-0 relative z-10 py-8 overflow-hidden font-serif text-5xl font-extrabold lg:text-8xl xl:text-9xl md:text-7xl sm:text-5xl leading-tighter">
              {title}
            </h1>
            {byline && (
              <h2 className="relative z-10 pb-10 text-base font-semibold tracking-wide uppercase">
                {byline}
              </h2>
            )}
            <div className="relative z-10 flex items-center justify-center">
              <Image
                src={DanAbramov}
                width={56}
                height={56}
                alt="Dan Abramov"
                className="rounded-full"
              />
              <span className="pl-2">Dan Abramov</span>
            </div>
            {episode && (
              <span className="absolute pointer-events-none z-0 sm:text-8xl text-6xl transform md:scale-[5] scale-[3.5] text-gray-100 font-extrabold font-serif">
                <span className="sr-only">episode </span>
                {('0' + episode).slice(-2)}
              </span>
            )}
          </header>
        )}
        <div className="relative">
          <main className="mx-auto prose md:prose-lg">{children}</main>
          {!authorized && (
            <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-b from-transparent to-white" />
          )}
        </div>
        {!authorized && (
          <div className="mt-16 relative bg-black -mx-5 px-5">
            <div className="flex flex-col items-center justify-center -translate-y-16">
              <div className="w-2 h-2 rounded-full bg-black" />
              <div className="w-px h-24 bg-black mx-auto" />
            </div>
            <div className="pb-24 relative z-10 px-10 max-w-lg mx-auto w-full text-white">
              <FreeChapterForm
                buttonLabel="Continue Reading"
                styles={{
                  form: 'max-w-xs mx-auto space-y-4',
                  label: 'block pb-1 font-medium',
                  input:
                    'focus:outline-none py-2 border border-gray-100 focus:border-transparent shadow-md focus:ring-2 focus:ring-orange-300 rounded-lg text-black placeholder-coolGray-400 w-full',
                  button:
                    'px-6 py-3 shadow-xl hover:scale-105 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 border focus:border-black border-white text-lg font-semibold mt-4 transition-all duration-300 ease-in-out bg-white text-black',
                }}
              >
                <h3 className="text-3xl font-bold text-center pb-2 leading-tight">
                  Unlock this chapter for free
                </h3>
                <div className="pb-10 text-center text-lg opacity-60">
                  and learn more about JavaScript Universe
                </div>
              </FreeChapterForm>
              {/* <ConvertkitSubscribeAndTagForm tag={CK_TAG_ID}>
                <h3 className="text-3xl font-bold text-center pb-2 leading-tight">
                  Unlock this chapter for free
                </h3>
                <div className="pb-10 text-center text-lg opacity-60">
                  and learn more about JavaScript Universe
                </div>
              </ConvertkitSubscribeAndTagForm> */}
            </div>
          </div>
        )}
        {authorized && !purchased && (
          <section className="py-8 mt-24">
            <Commerce bundles={bundles}>
              <div className="px-5 pb-12 text-center">
                <h2 className="max-w-screen-md pb-3 mx-auto font-serif text-3xl font-extrabold lg:text-6xl sm:text-5xl leading-tighter">
                  Ready for more?
                </h2>
                <div className="sm:pb-8 pb-4 max-w-xl mx-auto text-base font-medium text-center md:text-lg sm:text-lg">
                  <p>
                    Just JavaScript is my distilled mental model of how
                    JavaScript works and a collaboration with Maggie Appleton.
                  </p>
                </div>
              </div>
            </Commerce>
          </section>
        )}
      </article>
    </Layout>
  )
}

export default Article
