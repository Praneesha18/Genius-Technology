"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      image: "/slide1.png",
    },
    {
      id: 2,
      image: "/slide1.png",
    },
    {
      id: 3,
      image: "/slide1.png",
    },
    {
      id: 4,
      image: "/slide1.png",
    },
    {
      id: 5,
      image: "/slide1.png",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

    return (
    <div className="my-[75px] mx-[150px]">
      <section
        className="relative h-[600px] overflow-hidden rounded-[30px]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        <div className="relative h-full overflow-hidden">
          {slides.map((slide, index) => (
            <Image 
              key={slide.id}
              src={slide.image} 
              alt="Slide" 
              width={1000} 
              height={1000}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                index === currentSlide 
                  ? 'translate-x-0' 
                  : index < currentSlide 
                    ? '-translate-x-full' 
                    : 'translate-x-full'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-[30px] space-x-[10px]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#F5C80D] scale-125" : "bg-[#F5C80D]/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
