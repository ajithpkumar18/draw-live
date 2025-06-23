import React from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    company: 'TechFlow',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'Excalidraw has revolutionized how our team collaborates on design concepts. The hand-drawn style makes everything feel more approachable.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Engineering Manager',
    company: 'DataViz Inc',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'The real-time collaboration features are incredible. We can brainstorm system architecture with the entire team, no matter where they are.',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    role: 'UX Researcher',
    company: 'Innovate Labs',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'Simple, powerful, and intuitive. Excalidraw has become an essential tool for user journey mapping and wireframing.',
    rating: 5
  }
]

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See what our users have to say about their Excalidraw experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow slide-in-up stagger-${index + 1}`}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="h-8 w-8 text-indigo-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>

              <div className="flex items-center">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}