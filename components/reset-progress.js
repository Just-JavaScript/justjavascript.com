import React from 'react'
import {
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogContent,
} from '@reach/alert-dialog'
import resetQuizAnswers from 'utils/reset-quiz-answers'

const ResetProgress = (questions) => {
  function handleResetProgress() {
    resetQuizAnswers(questions)
    close()
  }
  const [showDialog, setShowDialog] = React.useState(false)
  const cancelRef = React.useRef()
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <div>
      <button
        onClick={open}
        className="flex items-center px-4 py-2 transition-all duration-200 ease-in-out transform bg-white rounded-lg shadow-xl sm:text-lg hover:scale-105"
      >
        <i className="gg-undo" />
        <span className="pl-3">Start over</span>
      </button>
      {showDialog && (
        <AlertDialogOverlay
          className="z-50 bg-black backdrop-filter backdrop-blur-lg bg-opacity-20"
          leastDestructiveRef={cancelRef}
          onDismiss={close}
        >
          <AlertDialogContent className="max-w-screen-sm rounded-lg shadow-xl">
            <AlertDialogLabel className="text-xl font-semibold">
              Please Confirm
            </AlertDialogLabel>
            <AlertDialogDescription className="pt-1 pb-6 opacity-80">
              Are you sure you want to start this quiz over and reset your
              progress?
            </AlertDialogDescription>
            <div className="flex space-x-5">
              <button
                className="px-4 py-2 text-white transition-colors duration-100 ease-in-out bg-black rounded-md hover:bg-gray-600"
                onClick={handleResetProgress}
              >
                Yes, start over
              </button>{' '}
              <button
                className="px-4 py-2 transition-colors duration-100 ease-in-out border border-gray-100 rounded-md hover:bg-gray-100"
                ref={cancelRef}
                onClick={close}
              >
                Nevermind, don't reset my progress
              </button>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      )}
    </div>
  )
}

export default ResetProgress
