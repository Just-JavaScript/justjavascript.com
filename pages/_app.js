import React from "react";
import Router from "next/router";
import { MDXProvider } from "@mdx-js/react";
import "focus-visible";
import { ViewerProvider } from "context/viewer-context";
import { ProgressProvider } from "context/progress-context";
import mdxComponents from "../components/mdx";
import "../styles/index.css";
import "../styles/gifplayer.css";
import NProgress from "nprogress";
import { DefaultSeo } from "next-seo";
import config from "../config";

let timer
const delay = 500
NProgress.configure({showSpinner: false})
const handleStartLoading = () => {
  timer = setTimeout(() => {
    NProgress.start()
  }, delay)
}
const handleStopLoading = () => {
  clearTimeout(timer)
  NProgress.done()
}
Router.events.on('routeChangeStart', handleStartLoading)
Router.events.on('routeChangeComplete', handleStopLoading)
Router.events.on('routeChangeError', handleStopLoading)


const App = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...config} />
      <ViewerProvider>
        <ProgressProvider>
          <MDXProvider components={mdxComponents}>
            <Component {...pageProps} />
          </MDXProvider>
        </ProgressProvider>
      </ViewerProvider>
    </>
  );
};

export default App;
