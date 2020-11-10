import Tooltip, {useTooltip, TooltipPopup} from '@reach/tooltip'
import Finish from 'components/quiz/finish'

export default function Wrapper({
  children,
  answered,
  handleSkip,
  handleContinue,
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>{children}</div>
      {!answered && (
        <>
          {handleSkip ? (
            <div className="w-full flex items-center justify-center py-16">
              <Tooltip
                label="Next question"
                className="px-3 py-2 border border-gray-200 bg-white shadow-sm rounded-sm text-sm"
              >
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-10 h-10 rounded-full bg-white border border-cool-gray-200 flex items-center justify-center text-center text-gray-500 hover:text-gray-900 ease-in-out transition-colors duration-150"
                >
                  ↓
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-16">
              <Finish isLastQuestion onClick={handleContinue} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
