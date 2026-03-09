import { useState, useRef, useEffect } from 'react'
import { useConfig } from '../context/ConfigContext'

export default function MusicPlayer() {
  const { config } = useConfig()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Only show music player if music URL is configured
    if (config.music.url) {
      setIsVisible(true)
      audioRef.current = new Audio(config.music.url)
      audioRef.current.loop = true
    }
  }, [config.music.url])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions silently
      })
    }
    setIsPlaying(!isPlaying)
  }

  if (!isVisible) return null

  return (
    <div className="music-player" onClick={togglePlay}>
      <button className="music-player-button">
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <span className="music-player-title">
        {config.music.title || 'Our Song'}
      </span>
    </div>
  )
}
