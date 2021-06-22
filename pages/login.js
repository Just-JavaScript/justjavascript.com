import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useViewer } from "context/viewer-context";
import Layout from "components/layout";
import Image from "next/image";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("enter your email"),
});

const LoginForm = ({
  children,
  button = "Email a login link",
  label = "Enter your email address to log in",
  track,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false); // false
  const [isError, setIsError] = React.useState(false);
  const { requestSignInEmail } = useViewer();

  return (
    <Layout meta={{ title: "Log In to Just JavaScript" }} background="bg-white">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-md mx-auto text-gray-900 sm:flex-row">
        <div className="flex-shrink-0 max-w-xs sm:w-auto">
          <Image
            src="/crystal-ball@2x.png"
            width={800 / 2}
            height={837 / 2}
            alt="a crystal ball with javascript entities"
            quality={100}
          />
        </div>
        <div className="w-full pl-0 mx-auto text-center rounded-lg sm:pl-8 sm:text-left">
          {isSubmitted && (
            <h1 className="font-serif text-4xl font-bold sm:text-5xl">
              Email Sent
            </h1>
          )}
          {isError && (
            <h1 className="font-serif text-3xl font-bold leading-9 ">
              Something went wrong!
            </h1>
          )}
          {!isSubmitted &&
            !isError &&
            (children ? (
              children
            ) : (
              <>
                <h1 className="font-serif text-6xl font-extrabold leading-tighter">
                  Welcome back!
                </h1>
                <p></p>
              </>
            ))}
          <div className="sm:w-full sm:max-w-xl">
            <div className="py-4">
              {!isSubmitted && !isError && (
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    setIsSubmitted(true);
                    requestSignInEmail(values.email)
                      .then(() => {
                        track && track(values.email);
                      })
                      .catch(() => {
                        setIsSubmitted(false);
                        setIsError(true);
                      });
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = props;
                    return (
                      <>
                        <form onSubmit={handleSubmit} className="text-lg">
                          <div className="w-full py-4">
                            <label
                              htmlFor="email"
                              className="block pb-2 leading-5 text-gray-700"
                            >
                              {label}
                            </label>
                            <div className="relative">
                              <input
                                autoFocus
                                required
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full max-w-sm px-4 py-3 text-lg rounded-lg focus:border-transparent focus:outline-none focus:ring focus:ring-orange-400"
                                placeholder="you@example.com"
                                type="email"
                                autoComplete="email"
                              />
                            </div>
                          </div>
                          <div className="pt-4">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex px-4 py-3 text-white transition-all duration-200 ease-in-out transform bg-black rounded-lg hover:scale-105 focus:scale-90 focus:ring focus:outline-none focus:ring-orange-400 hover:shadow-xl"
                            >
                              {button}
                            </button>
                          </div>
                        </form>
                      </>
                    );
                  }}
                </Formik>
              )}
              {isSubmitted && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold leading-tighter">
                    Please check your inbox for your sign in link.
                  </h2>
                  <p className="leading-relaxed opacity-80">
                    Sometimes this can land in SPAM! While we hope that isn't
                    the case if it doesn't arrive in a minute or three, please
                    check.
                  </p>
                </div>
              )}
              {isError && (
                <div className="text-text">
                  <p>
                    Login Link Not Sent{" "}
                    <span role="img" aria-label="sweating">
                      😅
                    </span>
                  </p>
                  <p className="pt-3">
                    Are you using an aggressive ad blocker such as Privacy
                    Badger? Please disable it for this site and reload the page
                    to try again.
                  </p>
                  <p className="pt-3">
                    If you <strong>aren't</strong> running aggressive adblocking
                    please check the console for errors and email
                    support@egghead.io with any info and we will help you ASAP.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
