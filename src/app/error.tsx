"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ThemeProvider attribute="data-theme">
      <div className="min-h-screen flex items-center justify-center  bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            یه مشکلی پیش اومد
          </h1>
          <p className="text-center text-2xl font-semibold mt-15 text-theme ">
            برای تجربه بهتر از VPN استفاده کنید
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={reset}
              className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              تلاش دوباره
            </button>

            <a
              href="/"
              className="px-6 py-3 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              برگشت به خانه
            </a>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
