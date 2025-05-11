import React from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Heart,
  Users,
  MessageCircle,
  Shield,
  Home,
  Award,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-800">
                  NIVASA
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="border-indigo-500 text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="/listings"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Listings
                </a>
                <a
                  href="/contact"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative rounded-md">
                <input
                  type="text"
                  placeholder="Explore by area, amenities, or keyword..."
                  className="w-64 lg:w-80 py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <button className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign In
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/api/placeholder/1200/400"
            alt="Team working on property solutions"
          />
          <div
            className="absolute inset-0 bg-indigo-800 mix-blend-multiply"
            aria-hidden="true"
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Nivasa
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Connecting property seekers directly with owners since 2023.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Mission
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Revolutionizing Property Search
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're on a mission to make finding your dream home simple,
              transparent, and free from intermediaries.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Home className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Direct Connections
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Contact property owners directly without any middlemen, saving
                  time and money.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Verified Listings
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  All properties are verified to ensure you get accurate and
                  reliable information.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Instant Communication
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Message owners directly through our platform for quick
                  responses and efficient decisions.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Advanced Filters
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Find exactly what you're looking for with our comprehensive
                  search filters and sorting options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Story
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              From College Project to Reality
            </p>
          </div>
          <div className="mt-10">
            <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
              <p>
                Nivasa began as a college project with a simple yet powerful
                vision: to remove unnecessary middlemen from the property search
                process. As students, we noticed how difficult and expensive it
                was to find housing, with brokers charging substantial fees for
                connecting tenants with landlords.
              </p>
              <p className="mt-4">
                Built on the MERN stack (MongoDB, Express.js, React, and
                Node.js) and deployed on Amazon EC2, our platform is designed to
                be user-friendly, secure, and efficient. Our team of passionate
                developers has created a solution that addresses real problems
                in the housing market.
              </p>
              <p className="mt-4">
                Today, Nivasa has grown into a comprehensive platform that
                connects property seekers directly with owners, ensuring a
                transparent and hassle-free experience for everyone involved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Founders
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Passionate students committed to transforming the property search
              experience.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="h-48 w-full object-cover"
                  src="/api/placeholder/400/300"
                  alt="Team member"
                />
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Student Developer
                  </h3>
                  <p className="text-sm text-indigo-600">Frontend Developer</p>
                  <p className="mt-2 text-gray-500">
                    Responsible for creating the responsive user interface using
                    React and Tailwind CSS.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="h-48 w-full object-cover"
                  src="/api/placeholder/400/300"
                  alt="Team member"
                />
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Student Developer
                  </h3>
                  <p className="text-sm text-indigo-600">Backend Developer</p>
                  <p className="mt-2 text-gray-500">
                    Created the MongoDB database structure and Express.js API
                    endpoints.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="h-48 w-full object-cover"
                  src="/api/placeholder/400/300"
                  alt="Team member"
                />
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Student Developer
                  </h3>
                  <p className="text-sm text-indigo-600">DevOps Engineer</p>
                  <p className="mt-2 text-gray-500">
                    Managed the AWS EC2 deployment and infrastructure for the
                    application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-indigo-700 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            Our Technology Stack
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">MongoDB</span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                NoSQL Database
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">
                Express.js
              </span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Backend Framework
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">React</span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Frontend Library
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">Node.js</span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                JavaScript Runtime
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">
                Tailwind CSS
              </span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Styling Framework
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">AWS EC2</span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Cloud Hosting
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">
                REST API
              </span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                API Architecture
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-700">JWT</span>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Authentication
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Get In Touch
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              We'd Love to Hear From You
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Have questions or feedback? Contact our team.
            </p>
          </div>

          <div className="mt-10">
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-2xl font-bold text-white">NIVASA</span>
              <p className="mt-2 text-base text-gray-300">
                Making home-buying and renting simple, transparent, and direct.
              </p>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="/"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/listings"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Listings
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex">
                  <MapPin className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span className="ml-3 text-base text-gray-300">
                    University Campus, India
                  </span>
                </li>
                <li className="flex">
                  <Phone className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span className="ml-3 text-base text-gray-300">
                    +91 98765 43210
                  </span>
                </li>
                <li className="flex">
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="ml-3 text-base text-gray-300">
                    contact@nivasa.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
