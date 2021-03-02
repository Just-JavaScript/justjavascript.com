import Link from 'next/link'

const Header = ({children, ...props}) => {
  return (
    <header className="bg-black relative flex items-center justify-between sm:mb-24 mb-16 text-white sm:mx-auto -mx-5 max-w-screen-md">
      <Link href="/">
        <a
          aria-label="Homepage"
          className="font-mono font-normal uppercase text-sm tracking-wide px-5 py-4"
        >
          Just<span className="font-bold">JavaScript</span>
        </a>
      </Link>
      <div className="px-5 py-3">{children}</div>
    </header>
  )
}

export default Header
