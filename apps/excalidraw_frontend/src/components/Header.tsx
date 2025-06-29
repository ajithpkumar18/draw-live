'use client'

import React from 'react'
import { PenTool, Menu, X } from 'lucide-react'
import Link from 'next/link'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 rounded-lg p-2">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Excalidraw</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
            <Link href={"/signin"}>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Signin
              </button>
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full">
                Try Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}