import Head from "next/head";
import Image from "next/image";
import GoogleLogin from "./components/GoogleButton";

export default function LoginPage() {
 
  return (
    <>
      <Head>
        <title>Login | MailBridge</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
        <div className="w-full max-w-sm bg-[#161b22] p-8 rounded-2xl shadow-lg text-white text-center">
          <img
            src="/vercel.svg"
            alt="App Logo"
            className="mx-auto mb-6 w-14 h-14"
          />
          <h1 className="text-2xl font-bold mb-2">Welcome to Mail2Chat</h1>

          <p className="text-sm text-gray-400 my-6">
            Connect your Gmail to sync messages to WhatsApp
          </p>

          <GoogleLogin />
        </div>
      </div>
    </>
  );
}
