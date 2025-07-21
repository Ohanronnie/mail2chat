"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleLogin() {
  const router = useRouter();
   const handleGoogleLogin = () => {
     router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`);
   };

  return (
    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-white text-black font-medium shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none">
      <Image
        alt="Google logo"
        width={20}
        height={20}
        src="https://www.svgrepo.com/show/475656/google-color.svg"
      />

      <span className="font-medium">Sign in with Google</span>
    </button>
  );
}