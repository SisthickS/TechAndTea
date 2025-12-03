"use client";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white transition-colors duration-700 font-sans font-medium tracking-wide text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav
        className="
        fixed top-0 z-30 w-full h-24 flex items-center border-b-4 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg transition-all duration-700
      "
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="TechAndTea Logo"
              className="h-8 rounded shadow"
            />
          </a>

          {/* Desktop navigation (only Home, About, Messages) */}
          {/* Center: responsive search bar instead of Home / About / Messages */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="w-full max-w-xl">
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M16 16l4 4" />
                  </svg>
                </span>
                <input
                  type="search"
                  placeholder="Search TechAndTea..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800
                   text-sm text-gray-900 dark:text-gray-100
                   border border-gray-200 dark:border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent
                   placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Right-side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`transform transition-transform duration-500 ${
                  darkMode ? "rotate-180" : ""
                }`}
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-700 dark:text-gray-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </span>
            </button>

            {/* Avatar dropdown */}
            <div className="relative group">
              <button
                ref={buttonRef}
                type="button"
                className="flex items-center w-10 h-10 rounded-full bg-[#1A73E8]/10 hover:bg-[#1A73E8]/30 focus:ring-2 focus:ring-[#1A73E8] transition duration-300 focus:outline-none"
                id="user-menu-button"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://randomuser.me/api/portraits/lego/1.jpg"
                  alt="user photo"
                />
              </button>
              <div
                ref={dropdownRef}
                className={`absolute top-12 right-0 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-400 ${
                  menuOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="font-semibold text-lg text-gray-900 dark:text-white">
                    Joseph McFall
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm truncate">
                    name@flowbite.com
                  </div>
                </div>
                <ul className="py-2">
                  {["Dashboard", "Settings", "Earnings", "Sign out"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#1A73E8]/10 hover:text-[#1A73E8] transition duration-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 shadow hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              aria-label="Open main menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="w-6 h-6 text-[#1A73E8] dark:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav (same 3 items) */}
        {menuOpen && (
          <div className="absolute top-24 inset-x-0 bg-white/90 dark:bg-gray-900/95 shadow-xl rounded-b-2xl p-6 md:hidden transition duration-300 max-h-[calc(100vh-6rem)] overflow-auto">
            <ul className="space-y-4">
              {["Home", "About", "Messages"].map((item, idx) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`block py-2 text-xl rounded hover:bg-[#1A73E8]/10 hover:text-[#1A73E8] transition duration-300 font-bold ${
                      idx === 0
                        ? "bg-[#1A73E8] text-white shadow-md"
                        : "text-neutral-900 dark:text-gray-200"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content Area: sidebar + feed + suggested */}
      {/* Main Content Area: sidebar + feed + suggested */}
      <div
        className="pt-28 px-4 lg:px-8 w-full 
             grid grid-cols-1 
             lg:grid-cols-[260px_minmax(0,2.4fr)_minmax(0,1.2fr)] 
             gap-6"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        {/* LEFT: Vertical nav for Home / About / Messages */}
        <aside className="hidden lg:flex flex-col space-y-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-xl h-fit">
          {["Home", "About", "Messages"].map((item, idx) => (
            <button
              key={item}
              className={`w-full text-left px-4 py-2 rounded-lg transition duration-300 font-semibold ${
                idx === 0
                  ? "bg-[#1A73E8] text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-[#1A73E8]/10 hover:text-[#1A73E8]"
              }`}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* CENTER: Feed */}
        <div className="space-y-6">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Feed
            </h2>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/lego/1.jpg"
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        User {i + 1}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This is a sample post in the scrolling feed. Great content
                    here! ✨
                  </p>
                  <div className="flex space-x-6 text-sm text-gray-500">
                    <button>❤️ 23</button>
                    <button>💬 5</button>
                    <button>🔄 2</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Messages + Suggested */}
        <div className="space-y-6">
          {/* Messages */}
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Messages
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {["John", "Sarah", "Mike", "Emma"].map((name) => (
                <div
                  key={name}
                  className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-colors"
                >
                  <img
                    src="https://randomuser.me/api/portraits/lego/2.jpg"
                    alt={name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {name}
                    </p>
                    <p className="text-sm text-gray-500">New message...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Handles */}
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Suggested
            </h3>
            <div className="space-y-3">
              {["@techlover", "@codewithtea", "@devdiaries", "@uiuxmaster"].map(
                (handle) => (
                  <div
                    key={handle}
                    className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {handle}
                    </span>
                    <button className="px-4 py-1 bg-[#1A73E8]/20 hover:bg-[#1A73E8]/40 text-[#1A73E8] text-sm rounded-full font-medium transition-colors">
                      Follow
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
