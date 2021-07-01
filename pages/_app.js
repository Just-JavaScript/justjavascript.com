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

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
