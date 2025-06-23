import React from 'react'
import { ArrowRight, Github } from 'lucide-react'

export const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to start drawing?
        </h2>
        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
          Join millions of users who trust Excalidraw for their visual collaboration needs. 
          It's free, open source, and ready to use right now.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>Launch Excalidraw</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center space-x-2">
            <Github className="h-5 w-5" />
            <span>View on GitHub</span>
          </button>
        </div>

        <p className="text-indigo-200 text-sm mt-8">
          No sign-up required • Works in your browser • Always free
        </p>
      </div>
    </section>
  )
}