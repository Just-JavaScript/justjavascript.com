import Tooltip, {useTooltip, TooltipPopup} from '@reach/tooltip'
import Finish from 'components/quiz/finish'

export default function Wrapper({children, handleSkip, handleContinue}) {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="grid grid-cols-5 w-full h-full min-h-screen">
        {children}
      </div>
      {handleSkip ? (
        <div className="grid grid-cols-5 w-full">
          <Tooltip
            label="Next question"
            className="px-3 py-2 border border-gray-200 bg-white shadow-sm rounded-sm text-sm"
          >
            <button
              type="button"
              onClick={handleSkip}
              className="w-10 h-10 rounded-full bg-white border border-cool-gray-200 col-start-4 transform -translate-x-5 -mt-16 flex items-center justify-center text-center text-gray-500 hover:text-gray-900 ease-in-out transition-colors duration-150"
            >
              ↓
            </button>
          </Tooltip>
        </div>
      ) : (
        <div className="grid grid-cols-5 w-full">
          <div className="col-span-3 -mt-8 flex mx-auto pb-24 w-40 -mr-20">
            <Finish isLastQuestion onClick={handleContinue} />
          </div>
        </div>
      )}
    </div>
  )
}
