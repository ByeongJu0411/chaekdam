'use client'
import { useEffect, useRef } from 'react'

export function useInfiniteScroll(onIntersect: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect()
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return ref
}
