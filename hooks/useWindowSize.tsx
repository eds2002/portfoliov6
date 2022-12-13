import { useState, useEffect } from 'react'

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 500, height: 500 })

  useEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('DOMContentLoaded', handleResize)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  console.log(windowSize)

  return windowSize
}
