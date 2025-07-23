"use client";
import axios from "axios";
import { axiosInstance } from "@/app/lib/axios";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

export default function NumberInputPage() {
  const query = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [countries, setCountries] = useState<{ code: string; name: string }[]>(
    []
  );
  const token = query.get("token");

  useEffect(() => {
    if (!token) {
      router.back();
      return;
    }
    localStorage.setItem("Auth-Token", token);
  }, [token, router]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=idd,name"
        );

        const countryData = response.data
          .map((country: any) => {
            const root = country.idd?.root || "";
            const suffix = country.idd?.suffixes?.[0] || "";
            const dialCode = root + suffix;

            return {
              code: dialCode || "+1",
              name: country.name?.common || "Unknown",
            };
          })
          .sort((a: any, b: any) => a.name.localeCompare(b.name)); // Sort alphabetically by name

        setCountries(countryData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const validatePhoneNumber = (phone: string): boolean => {
    const fullNumber = `${countryCode}${phone}`;
    const parsedNumber = parsePhoneNumberFromString(fullNumber);
    return parsedNumber ? parsedNumber.isValid() : false;
  };

  const handleSubmit = async () => {
    if (!messageSent) {
      // Validate phone number
      if (!validatePhoneNumber(number)) {
        setError("Please enter a valid WhatsApp number.");
        return;
      }
      setError(null);

      try {
        setLoading(true);
        await axiosInstance.post(`/auth/number/connect`, {
          phone: `${countryCode}${number}`,
        });
        setMessageSent(true);
      } catch (err) {
        setError("Failed to send message. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Validate OTP
      if (otp.length !== 6 || isNaN(Number(otp))) {
        setError("Please enter a valid 6-digit OTP.");
        return;
      }
      setError(null);

      try {
        setLoading(true);
        const response = await axiosInstance.post(`/auth/number/verify`, {
          code: otp,
        });
        if (response.data) {
          router.replace("/home")
        } else {
          setError("Verification failed. Please try again.");
        }
      } catch (err) {
        setError("Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Enter Number | MailBridge</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {!messageSent
                ? "Enter your WhatsApp Number"
                : "Verify Your Account"}
            </h1>
            <p className="text-sm text-gray-600">
              {!messageSent
                ? "Please provide your WhatsApp number to proceed."
                : "Please enter the OTP sent to your WhatsApp number."}
            </p>
          </div>

          <div className="space-y-4">
            {!messageSent ? (
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCountryCode(e.target.value)
                  }
                  className="w-1/3 p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={number}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNumber(e.target.value)
                  }
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Enter your number"
                />
              </div>
            ) : (
              <input
                type="text"
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOtp(e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Enter OTP"
                maxLength={6}
              />
            )}

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <button
              className={`w-full mt-6 py-3 px-4 rounded-lg bg-primary text-white font-medium shadow-md transform transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
