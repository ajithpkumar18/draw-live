import React from 'react'
import { Palette, Users, Download, Smartphone, Lock, Zap } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Hand-drawn Feel',
    description: 'Beautiful sketchy, hand-drawn style that makes your diagrams feel natural and engaging.'
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with your team. See changes instantly as others draw and edit.'
  },
  {
    icon: Download,
    title: 'Multiple Export Options',
    description: 'Export your drawings as PNG, SVG, or share via link. Your data, your way.'
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    description: 'Use Excalidraw on any device - desktop, tablet, or mobile. No installation required.'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your drawings are end-to-end encrypted. We never see your content.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed and performance. Start drawing instantly without any delays.'
  }
]

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to bring ideas to life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to make drawing and collaboration effortless, whether you're brainstorming alone or with a team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 slide-in-up stagger-${(index % 4) + 1}`}
            >
              <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}