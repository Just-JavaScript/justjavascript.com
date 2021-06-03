import React from 'react'
import Spinner from 'components/spinner'
import {
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogContent,
} from '@reach/alert-dialog'
import isEmpty from 'lodash/isEmpty'

const ResetProgress = ({progress, resetProgress, isResetting}) => {
  function handleResetProgress() {
    resetProgress()
    !isResetting && isEmpty(progress) && close()
  }
  const [showDialog, setShowDialog] = React.useState(false)
  const cancelRef = React.useRef()
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <div>
      <button
        onClick={open}
        className="flex items-center px-4 py-2 transition-all duration-200 ease-in-out rounded-lg sm:text-lg hover:bg-white hover:shadow-xl"
      >
        {isResetting ? (
          <Spinner />
        ) : (
          <>
            <i className="gg-undo" />
            <span className="pl-3">Reset progress</span>
          </>
        )}
      </button>
      {showDialog && (
        <AlertDialogOverlay
          className="z-50 bg-black backdrop-filter backdrop-blur-lg bg-opacity-20"
          leastDestructiveRef={cancelRef}
          onDismiss={close}
        >
          <AlertDialogContent className="rounded-lg shadow-xl">
            <AlertDialogLabel className="text-xl font-semibold">
              Please Confirm
            </AlertDialogLabel>
            <AlertDialogDescription className="pt-1 pb-6 opacity-80">
              Are you sure you want to reset your progress?
            </AlertDialogDescription>
            <div className="flex space-x-5">
              <button
                className="px-4 py-2 text-white transition-colors duration-100 ease-in-out bg-black rounded-md hover:bg-gray-600"
                onClick={handleResetProgress}
              >
                {isResetting && !isEmpty(progress) ? (
                  <Spinner className="text-white" />
                ) : (
                  'Yes, reset my progress'
                )}
              </button>{' '}
              <button
                className="px-4 py-2 transition-colors duration-100 ease-in-out border border-gray-100 rounded-md hover:bg-gray-100"
                ref={cancelRef}
                onClick={close}
              >
                Nevermind, don't reset
              </button>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      )}
    </div>
  )
}

export default ResetProgress
