import { ThemeProvider } from "next-themes";
import React from "react";

const NotFound = () => {
  return (
    <ThemeProvider attribute="data-theme">
      <div className="min-h-screen flex items-center justify-center  bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="text-center px-6">
          <h1 className="text-8xl font-extrabold text-gray-800 dark:text-white">
            404
          </h1>

          <a
            href="/"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            برگشت به خانه
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
