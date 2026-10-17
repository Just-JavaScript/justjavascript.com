import React from 'react'
import Link from 'next/link'

const Footer = () => (
  <footer className="print:hidden flex flex-col items-center max-w-screen-lg mx-auto py-16 space-y-4">
    <Link href="/learn"><a className="font-serif text-2xl font-extrabold">JJS</a></Link>
    <Link href="/credits"><a className="text-sm hover:underline">Credits</a></Link>
    <Link href="/terms"><a className="text-sm hover:underline">Terms &amp; Conditions</a></Link>
  </footer>
)

export default Footer
