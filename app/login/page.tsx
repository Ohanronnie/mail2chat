"use client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api_url } from "../lib/axios";

export default function LoginPage() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`${api_url}/auth/google`);
  }
  return (
    <>
      <Head>
        <title>Login | MailBridge</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-primary p-8 rounded-2xl shadow-lg text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome to MailBridge</h1>

          <p className="text-sm text-shadow-white mt-4 mb-4">
            Connect your Gmail account to start receiving and responding to
            emails directly through WhatsApp. One click to streamline your
            communication.
          </p>
          <button onClick={handleClick}  className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-white text-black font-medium shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none">
            <Image
              alt="Google logo"
              width={20}
              height={20}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
            />

            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}
