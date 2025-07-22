import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Landing() {
  return (
    <>
      <section className="h-screen">
        <div
          
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
            platforms.<br/> Receive, read, and reply to emails directly from your
            favorite messaging apps—no manual forwarding, no missed messages.
            <br/>Stay in sync, stay productive.
          </p>
          <Link href={"/login"} className="w-1/2 ">
            <button className="mt-8  w-full transform transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none bg-primary rounded-full text-white  py-3">
              Sign In
            </button>
          </Link>
        </div>
     
      </section>
    </>
  );
}
