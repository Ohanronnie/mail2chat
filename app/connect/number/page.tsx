"use client";
import axios from "axios";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

// Reusable Input Component
const NumberInput = ({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string | null;
}) => {
  return (
    <div className="text-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-600 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

// Reusable Form Component
const MessageForm = ({
  title,
  description,
  value,
  onChange,
  placeholder,
  error,
  countryCode,
  onCountryChange,
  countries,
  type
}: {
  title: string;
  description: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string | null;
  countryCode: string;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  countries: { code: string; name: string }[];
  type: boolean
}) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-400 my-4">{description}</p>
      </div>
      <div className={type ? `flex gap-2` : ""}>
        {type && <select
          value={countryCode}
          onChange={onCountryChange}
          className="w-1/3 p-3 border border-gray-600 rounded-lg bg-[#1f2937] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>}
        <NumberInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
        />
      </div>
    </>
  );
};

// Main Page Component
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
        await axios.post(
          `${
            process.env.BACKEND_URL || "http://localhost:3000"
          }/auth/number/connect`,
          { phone: `${countryCode}${number}` },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        const response = await axios.post(
          `${
            process.env.BACKEND_URL || "http://localhost:3000"
          }/auth/number/verify`,
          { otp },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          alert("Connected successfully");
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

      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
        <div className="w-full max-w-sm bg-[#161b22] p-8 rounded-2xl shadow-lg text-white text-center">
          {!messageSent ? (
            <MessageForm
              title="Enter your WhatsApp Number"
              description="Please provide your WhatsApp number to proceed."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter your number"
              error={error}
              countryCode={countryCode}
              onCountryChange={(e) => setCountryCode(e.target.value)}
              countries={countries}
              type={true}
            />
          ) : (
            <MessageForm
              title="Verify Your Account"
              description="Please enter the OTP sent to your WhatsApp number."
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              error={error}
              countryCode={countryCode}
              onCountryChange={() => {}}
                countries={[]}
                type={false}
            />
          )}
          <button
            className={`w-full mt-4 py-2 px-4 rounded-md bg-blue-500 text-white font-medium shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
      </div>
    </>
  );
}
