import {motion} from 'framer-motion'

export default function Finish({onClick}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center md:p-8 p-5 rounded-lg bg-white border border-cool-gray-100">
      <motion.button
        layout
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="w-full flex items-center justify-center px-5 py-3 rounded-md font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors ease-in-out duration-300"
        type="button"
        onClick={onClick}
      >
        {/* prettier-ignore */}
        <svg className="transform scale-150 mr-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>{' '}
        Complete Quiz
      </motion.button>
    </div>
  )
}
