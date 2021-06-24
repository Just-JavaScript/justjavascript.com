import { motion } from 'framer-motion'

export default function Finish({ onClick }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full pb-16 rounded-lg sm:pb-24">
      <div
        className="absolute bottom-full border h-16 border-dashed border-emerald-500"
        aria-hidden="true"
      />
      <motion.button
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center w-full px-5 py-8 text-lg font-semibold text-white transition-colors duration-300 ease-in-out rounded-md bg-emerald-500 hover:bg-emerald-600"
        type="button"
        onClick={onClick}
      >
        {/* prettier-ignore */}
        <svg className="mr-2 transform scale-150" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>{' '}
        Complete Quiz
      </motion.button>
    </div>
  )
}
