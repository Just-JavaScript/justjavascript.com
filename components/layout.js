import React from "react";
import Navigation from "./navigation";
import { NextSeo } from "next-seo";

const Layout = ({
  children,
  navClassName,
  navChildren,
  noIndex,
  meta,
  background = "bg-gray-100",
}) => {
  const {
    title,
    description,
    titleAppendSiteName = false,
    url,
    ogImage,
  } = meta || {};
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
        noindex={noIndex}
      />
      <div className={background}>
        <div className="flex flex-col items-center justify-center min-h-screen print:min-h-full print:h-auto">
          <Navigation className={navClassName}>{navChildren}</Navigation>
          <div className="flex-shrink-0 w-full px-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
