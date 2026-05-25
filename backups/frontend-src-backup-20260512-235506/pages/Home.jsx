import React from 'react'
import { useSelector } from 'react-redux'
import Hero from '../components/core/HomePage/Hero'
import Features from '../components/core/HomePage/Features'
import Stats from '../components/core/HomePage/Stats'
import Testimonials from '../components/core/HomePage/Testimonials'
import CTA from '../components/core/HomePage/CTA'
import Footer from '../components/common/Footer'

const Home = () => {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="flex flex-col min-h-screen bg-richblack-900">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
