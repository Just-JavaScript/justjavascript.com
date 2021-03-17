import Link from 'next/link'

const Header = ({children, ...props}) => {
  return (
    <div className="sm:mb-24 mb-16 ">
      <nav className=" flex items-center justify-center sm:mx-auto max-w-screen-xl">
        <Link href="/">
          <a
            aria-label="Homepage"
            className="font-serif leading-tight font-extrabold sm:text-2xl text-xl sm:py-8 py-5"
          >
            Just JavaScript
          </a>
        </Link>
        {children && <div className="px-5 py-3">{children}</div>}
      </nav>
    </div>
  )
}

export default Header
