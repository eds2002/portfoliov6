'use client'
import { Ref, useEffect, useRef, useState } from 'react'
import { gsap, Power3 } from 'gsap'
import { languages } from '../constants/languages'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { projects } from '../constants/project'
import useWindowSize from '../hooks/useWindowSize'
export default function Home() {
  //Hook to grab window size
  const app = useRef<HTMLDivElement>(null)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const size = useWindowSize()
  const data = {
    ease: 0.05,
    current: 0,
    previous: 0,
    rounded: 0,
  }
  // Run scrollrender once page is loaded.
  useEffect(() => {
    requestAnimationFrame(() => skewScrolling())
  }, [])

  //set the height of the body.
  useEffect(() => {
    setBodyHeight()
  }, [size.height])

  //Set the height of the body to the height of the scrolling div
  const setBodyHeight = () => {
    if (scrollContainer.current) {
      document.body.style.height = `${
        scrollContainer.current.getBoundingClientRect().height
      }px`
    }
  }

  // Scrolling
  const skewScrolling = () => {
    //Set Current to the scroll position amount
    data.current = window.scrollY
    // Set Previous to the scroll previous position
    data.previous += (data.current - data.previous) * data.ease
    // Set rounded to
    data.rounded = Math.round(data.previous * 100) / 100

    // Difference between
    const difference = data.current - data.rounded
    const acceleration = difference / size.width
    const velocity = +acceleration
    const skew = velocity * 3

    if (scrollContainer.current) {
      //Assign skew and smooth scrolling to the scroll container
      scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`
    }

    //loop vai raf
    requestAnimationFrame(() => skewScrolling())
  }
  return (
    <div className="app">
      <div ref={scrollContainer} className="scroll">
        <Loading />
        <Hero />
        {/* <About /> */}
        <Projects />
      </div>
    </div>
  )
}

function Projects() {
  const projectsRef = useRef(null)
  return (
    <section className="py-24 pointer-events-auto bg-black/5" ref={projectsRef}>
      <div className="px-4 mx-auto max-w-7xl sm:px-16">
        <div className="w-full divide-y-2 divide-primary/25">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex items-center justify-between px-4 py-12 bg-black/0"
            >
              <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {project.title}
              </h6>
              <div className="w-full h-0.5 rounded-full my-4 md:hidden" />
              <p>
                <span>{project.responsibility}</span>
              </p>
            </div>
          ))}
        </div>
        <div></div>
        {/* <p className="max-w-xs mt-6 text-sm animated">
          {paragraph.split(' ').map((val) => (
            <span className="relative inline-flex overflow-hidden " key={val}>
              <span className="relative block pr-1 translate-y-full animateSlideIn">
                {val}
              </span>
            </span>
          ))}
        </p> */}
      </div>
    </section>
  )
}

function About() {
  const tl = gsap.timeline()
  const about = useRef<HTMLElement>(null)
  useEffect(() => {
    let observer = new IntersectionObserver(showItem, {
      rootMargin: '0px',
      threshold: 0,
    })

    function showItem(entries: any) {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          tl.to('.animateSlideIn', {
            y: 0,
            duration: 1,
            ease: Power3.easeInOut,
            stagger: 0.01,
          })
        }
      })
    }

    if (about.current) {
      const text = about?.current?.querySelectorAll('.animated')
      text?.forEach((item: any) => {
        observer.observe(item)
      })
    }
  }, [tl])

  const heading = `A passion for creating sites that - WOW`

  const paragraph = `I am a front end developer based in New Jersey. I love creating things for the web using react. As a developer, my main focus is to create a wonderful user
  experience both for mobile and desktop and is my main goal when
  starting a new job or project.`

  return (
    <section className="py-24" ref={about}>
      <div className="max-w-4xl px-4 mx-auto sm:px-16">
        <h3 className="block max-w-sm overflow-hidden text-3xl font-normal sm:text-5xl animated">
          {heading.split(' ').map((val) => (
            <span
              className="relative inline-flex overflow-hidden py-1.5 "
              key={val}
            >
              <span className="relative block pr-1 translate-y-full animateSlideIn">
                {val}
              </span>
            </span>
          ))}
        </h3>
        <p className="max-w-xs mt-6 text-sm animated">
          {paragraph.split(' ').map((val) => (
            <span className="relative inline-flex overflow-hidden " key={val}>
              <span className="relative block pr-1 translate-y-full animateSlideIn">
                {val}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function Hero() {
  const [openNav, setOpenNav] = useState(false)
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
    <>
      <section className="relative z-[2] pointer-events-auto">
        <Header setOpenNav={setOpenNav} />
        <div className="flex flex-col items-center justify-center px-4 py-64 text-center text-primary">
          <p className="overflow-hidden">
            <span className="block translate-y-full slideInText">
              Eduardo S
            </span>
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
      <Navbar openNav={openNav} setOpenNav={setOpenNav} />
    </>
  )
}

function Header({ setOpenNav }: { setOpenNav: (val: boolean) => void }) {
  return (
    <header className="w-full pointer-events-auto">
      <div className="flex items-center justify-between py-2 layout">
        <Logo />
        <Hamburger setOpenNav={setOpenNav} />
      </div>
    </header>
  )
}

function Logo() {
  return <h1 className="">Eduardo</h1>
}

function Hamburger({ setOpenNav }: { setOpenNav: (val: boolean) => void }) {
  return (
    <div
      className="relative z-20 p-2 cursor-pointer pointer-events-auto w-max"
      onClick={() => setOpenNav(true)}
    >
      <div className="w-5 h-0.5 my-1 rounded-full bg-primary" />
      <div className="w-5 h-0.5 my-1 rounded-full bg-primary" />
      <div className="w-5 h-0.5 my-1 rounded-full bg-primary" />
    </div>
  )
}

function Navbar({
  openNav,
  setOpenNav,
}: {
  openNav: boolean
  setOpenNav: (val: boolean) => void
}) {
  const tl = gsap.timeline()
  const navigation = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'About',
      href: '#about',
    },
    {
      name: 'Projects',
      href: '#projects',
    },
    {
      name: 'Contact',
      href: '#contact',
    },
  ]

  useEffect(() => {
    if (openNav) {
      gsap.to('.navBarSlider', {
        x: 0,
        ease: Power3.easeInOut,
        duration: 0.6,
        delay: 0.2,
      })
      tl.to('.links-circle-container', {
        width: '80%',
        duration: 0.5,
        ease: Power3.easeIn,
      }).to('.links-circle-container', {
        width: '0%',
        duration: 0.38,
        ease: Power3.easeOut,
      })
      gsap.to('.navLink', {
        x: 0,
        ease: Power3.easeInOut,
        duration: 0.6,
        stagger: 0.1,
      })
    } else {
      gsap.to('.navBarSlider', {
        x: '100%',
        ease: Power3.easeInOut,
        duration: 0.6,
      })
      tl.to('.links-circle-container', {
        width: '0%',
        duration: 0.3,
        ease: Power3.easeIn,
      })
      gsap.to('.navLink', {
        x: 40,
        ease: Power3.easeInOut,
        duration: 0.6,
        stagger: 0.15,
      })
    }
  }, [openNav])

  return (
    <div className="fixed top-0 bottom-0 right-0 z-10 w-full max-w-md navBarSlider bg-primary">
      <div className="relative z-10 w-full h-full pointer-events-auto">
        <div className="flex items-center justify-between p-12 text-secondary">
          <p className="text-xs">Eduardo</p>
          <XMarkIcon
            onClick={() => setOpenNav(false)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <ul className="relative z-20 flex flex-col items-start h-full gap-12 p-12 py-24">
          {navigation.map((nav) => (
            <li
              className="text-5xl font-semibold navLink text-secondary"
              key={nav.name}
            >
              {nav.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Circle bottom */}
      <div className="relative z-10 w-full h-full">
        <div className="absolute w-[0%]  h-[150%] block rounded-[50%] transform-gpu bg-primary top-[-50%] translate-y-[-50%] -translate-x-[50%] links-circle-container"></div>
      </div>
    </div>
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

    if (languagePos >= 12) {
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      clearInterval(interval)
    }
  }, [languagePos, tl])

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-none">
      <div
        className="relative flex flex-col items-center justify-center w-full h-[100vh] bg-primary text-secondary revealAnim z-[99999] pointer-events-auto"
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
