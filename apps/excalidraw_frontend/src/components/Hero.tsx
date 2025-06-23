import React from 'react'
import { ArrowRight, Play, Users, Zap, Heart } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="slide-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Draw ideas,
              <span className="text-indigo-600 block">collaborate freely</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your thoughts into beautiful hand-drawn diagrams. Excalidraw makes it simple to create, share, and collaborate on visual ideas in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Drawing</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>5M+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Open source</span>
              </div>
            </div>
          </div>

          <div className="slide-in-up stagger-2">
            <div className="relative floating-animation">
              <div className="bg-white rounded-2xl shadow-2xl p-8 hand-drawn-border text-indigo-600">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="h-12 bg-gray-100 rounded-lg"></div>
                  <div className="h-12 bg-indigo-100 rounded-lg"></div>
                  <div className="h-12 bg-purple-100 rounded-lg"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Live collaboration</span>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}