'use client'
import { Ref, useEffect, useRef, useState } from 'react'
import { gsap, Power3 } from 'gsap'
import { languages } from '../constants/languages'
export default function Home() {
  return (
    <>
      <Loading />
      <Hero />
    </>
  )
}

function Hero() {
  const tl = gsap.timeline()
  useEffect(() => {
    tl.to('.slideInText', {
      y: 0,
      duration: 1,
      delay: 1.5,
      ease: Power3.easeInOut,
      stagger: 0.1,
    })

    tl.to('.slideInLeftToRight', {
      x: 0,
      duration: 1,
      ease: Power3.easeInOut,
      stagger: 0.1,
    })
  }, [])

  return (
    <section className="relative z-[2]">
      <div className="flex flex-col items-center justify-center px-4 py-64 text-center text-primary">
        <p className="overflow-hidden">
          <span className="block translate-y-full slideInText">Eduardo</span>
        </p>
        <p className="max-w-md text-5xl font-semibold sm:max-w-xl md:max-w-2xl lg:max-w-3xl sm:text-7xl md:text-7xl">
          <span className="block overflow-hidden">
            <span className="block py-2 translate-y-full slideInText">
              Creating things
            </span>
          </span>
          <span className="block overflow-hidden ">
            <span className="block py-2 translate-y-full slideInText">
              for the web.
            </span>
          </span>
        </p>
        <a className="mt-6 overflow-hidden cursor-pointer text-primary group">
          <span className="relative flex items-center justify-center gap-2 translate-y-full slideInText">
            Learn more
            <Line />
          </span>
        </a>
      </div>
    </section>
  )
}

function Line() {
  return (
    <div className="h-0.5 w-3  rounded-full bg-primary group-hover:w-6 transition-all duration-300 cursor-pointer" />
  )
}

function Loading() {
  const tl = gsap.timeline()
  const [languagePos, setLanguagePos] = useState(0)
  const loading = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const height = window.innerHeight
    const interval = setInterval(() => {
      setLanguagePos(languagePos + 1)
      if (languagePos === 12) {
        tl.to('.revealAnim', {
          y: -height,
          duration: 1,
          ease: Power3.easeInOut,
        })
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [languagePos, tl])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="relative flex flex-col items-center justify-center w-full h-[100vh] bg-primary text-secondary revealAnim z-10 pointer-events-auto"
        ref={loading}
      >
        <div className="relative z-10 flex items-center justify-center gap-x-2">
          <div className="block w-2 h-2 rounded-full bg-secondary" />
          <p className="relative z-10 overflow-hidden text-4xl font-semibold">
            {languages[languagePos]?.hello}
          </p>
        </div>
        <CircleBottom loading={loading} />
      </div>
    </div>
  )
}

function CircleBottom({ loading }: any) {
  const tl = gsap.timeline()
  useEffect(() => {
    const interval = setInterval(() => {
      if (loading.current) {
        const styles = window.getComputedStyle(loading.current)
        const value = styles.transform.split(',')[5]
        if (value) {
          tl.to('.circle-container', {
            height: 0,
            duration: 1,
            ease: Power3.easeInOut,
          })
        }
      }
    }, 42)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="absolute bottom-0 top-[unset] translate-y-[99] w-full circle-container h-[15vh] z-0 select-none pointer-events-none">
      <div className="absolute w-[150%] h-[745%] block rounded-[50%] transform-gpu bg-primary left-[50%] -translate-x-[50%] -translate-y-[73.7%]"></div>
    </div>
  )
}
