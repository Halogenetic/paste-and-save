import { type NextPage } from "next";
import Head from "next/head";
import SignIn from "../components/signinFormComponent";

const Signin: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-[90%]">
        <div id="feedback-form">
          <h2 className="header">Sign in</h2>
          <div>
            <SignIn/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signin;
