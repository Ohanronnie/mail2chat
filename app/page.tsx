import { ChevronRight } from "lucide-react";
import Image from "next/image";
export default function Landing() {
  return (
    <>
      <section className="sm:grid sm:grid-cols-2 h-screen">
        <div
          style={{
            background:
              "linear-gradient(90deg, hsla(141, 81%, 87%, 1) 0%, hsla(41, 88%, 75%, 1) 50%, hsla(358, 82%, 71%, 1) 100%)",
            filter:
              'progid:DXImageTransform.Microsoft.gradient(startColorstr="#C5F9D7", endColorstr="#F7D486", GradientType=1)',
          }}
          className="flex h-screen sm:w-full px-4 text-gray-700 flex-col  items-center justify-center"
        >
          <p className="p-1 text-center bg-primary text-sm text-white rounded-lg">
            Its about time.
          </p>
          <h1 className="text-3xl font-bold text-center my-3">
            Sync your mail to Chat with Mail Bridge
          </h1>
          <p className="text-center text-sm">
            Seamlessly connect your email inbox to WhatsApp and other chat
            platforms. Receive, read, and reply to emails directly from your
            favorite messaging apps—no manual forwarding, no missed messages.
            Stay in sync, stay productive.
          </p>
        </div>
        <div className="px-4 py-6 h-screen text-center w-full flex flex-col items-center">
          <div className="flex-row flex ">
            <div>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs bg-primary text-white">
                1
              </span>
              <span className="text-sm ml-1">Sign In</span>
            </div>
            <div>
              <ChevronRight />
            </div>
            <div>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs bg-gray-600 text-white">
                2
              </span>
              <span className="text-sm  ml-1">Connect</span>
            </div>
          </div>
          <div className="h-full flex flex-col justify-center">
            <p className="text-lg font-medium text-gray-800">Sign In</p>
            <p className="text-sm text-gray-700 my-1">
              Connect your Gmail to sync messages to WhatsApp
            </p>
            <button className="w-full  mt-4 flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-primary text-white font-medium shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none">
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
      </section>
    </>
  );
}
