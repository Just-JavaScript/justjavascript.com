import Link from 'next/link'

const Navigation = ({ children, className = '' }) => (
  <div className={`absolute top-0 left-0 z-10 w-full p-5 print:hidden ${className}`}>
    <nav className="flex items-center justify-between max-w-screen-lg mx-auto w-full">
      <Link href="/">
        <a aria-label="Homepage" className="font-serif text-lg font-bold sm:text-xl">
          Just JavaScript
        </a>
      </Link>
      <div className="flex items-center space-x-4 text-sm">
        <Link href="/learn"><a>Episodes</a></Link>
        {children && <div>{children}</div>}
      </div>
    </nav>
  </div>
)

export default Navigation
