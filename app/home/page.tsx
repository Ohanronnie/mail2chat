"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [connections, setConnections] = useState({
    email: "user@example.com",
    phone: "+1234567890",
    phoneVerified: false,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    axiosInstance
      .get("/auth/user")
      .then(({ data }) => {
        setConnections({
          email: data.email,
          phone: data.phoneNumber,
          phoneVerified: data.phoneVerified,
        });
      })
      .catch((err) => {
        router.replace("/");
      });
  }, []);
  const disconnect = () => {
    setLoading(true);
    axiosInstance.delete("/auth/user").finally(() => {
      setLoading(false);
      router.replace("/");
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connected Accounts
          </h1>
          <p className="text-sm text-gray-600">
            Manage your connected email and messaging accounts
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Connection Card */}
          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    Email Connected
                  </span>
                  <span className="text-sm text-gray-500">
                    {connections.email}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>

          {/* WhatsApp Connection Card */}
          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#25D366]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    WhatsApp Connected
                  </span>
                  <span className="text-sm text-gray-500">
                    {connections.phone}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {connections.phoneVerified ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            className="w-full py-3 px-4 rounded-lg bg-primary text-white font-medium shadow-md transform transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none"
            onClick={disconnect}
            disabled={loading}
          >
            {loading ? "Loading..." : "Disconnect All"}
          </button>
        </div>
      </div>
    </div>
  );
}
