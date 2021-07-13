import { motion } from 'framer-motion'

const Spinner = ({ className = 'text-black' }) => {
  return (
    <>
      <svg
        aria-hidden="true"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <motion.g
          animate={{ rotateZ: [0, 360] }}
          transition={{ repeat: Infinity }}
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z"></path>
        </motion.g>
      </svg>
      <span className="sr-only">Loading</span>
    </>
  )
}

export default Spinner
