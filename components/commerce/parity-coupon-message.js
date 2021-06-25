import React from "react";

const ParityCouponMessage = ({
  coupon,
  countryName,
  onApply,
  onDismiss,
  isPPP,
}) => {
  const percentOff = coupon && coupon.coupon_discount * 100;
  const [showFlag, setShowFlag] = React.useState(false);
  return (
    <div className="max-w-sm mx-auto p-7 border border-dashed border-gray-300 rounded-xl text-center">
      <h2 className="text-lg font-semibold mb-4 text-center">
        We noticed that you're from{" "}
        <img
          loading="lazy"
          width={showFlag ? 18 : 0}
          onLoad={() => setShowFlag(true)}
          alt={coupon.coupon_region_restricted_to}
          className={`inline-block ${showFlag ? "mr-1" : ""}`}
          src={`https://hardcore-golick-433858.netlify.app/image?code=${coupon.coupon_region_restricted_to}`}
        />
        {countryName}. 👋 To help facilitate global learning, we are offering
        purchasing power parity pricing.
      </h2>
      <p className="text-base">
        Please note that you will only be able to view content from within{" "}
        {countryName}, and{" "}
        <strong className="font-semibold">
          no downloads/bonuses will be provided
        </strong>
        .
      </p>
      <p className="text-base inline-block mt-5">
        If that is something that you need:
      </p>
      <div className="mt-4">
        {/* new */}
        <button
          type="button"
          className={`inline-flex shadow-lg items-center justify-center px-5 py-3 text-sm ${
            isPPP ? " bg-emerald-500 text-white" : "bg-white"
          } rounded-md`}
          onClick={isPPP ? onDismiss : onApply}
          role="switch"
          aria-checked={isPPP}
        >
          <div
            className={`${
              isPPP ? "bg-emerald-400" : "bg-gray-500"
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                isPPP ? "translate-x-5" : "translate-x-0"
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </div>
          {isPPP
            ? `Activate ${percentOff}% off with regional pricing`
            : `Activate ${percentOff}% off with regional pricing`}
        </button>

        {isPPP && (
          <p className="pt-4 italic">
            You currently have a Purchasing Power Parity coupon applied. With
            this discount{" "}
            <strong>
              your purchase will be restricted to your region/country
            </strong>
            . You will have the opportunity to upgrade to a full license at a
            later time if you choose to do so.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParityCouponMessage;
