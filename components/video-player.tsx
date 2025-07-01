"use client"

import React from "react"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface VideoPlayerProps {
  src: string
  title?: string
  poster?: string
}

export function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")

  const videoRef = React.useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
      setIsMuted(newVolume === 0)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0]
    setProgress(newProgress)
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)

      // Format current time
      const minutes = Math.floor(videoRef.current.currentTime / 60)
      const seconds = Math.floor(videoRef.current.currentTime % 60)
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      // Format duration
      const minutes = Math.floor(videoRef.current.duration / 60)
      const seconds = Math.floor(videoRef.current.duration % 60)
      setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && (
            <Button size="icon" variant="secondary" className="h-16 w-16 rounded-full opacity-90" onClick={togglePlay}>
              <Play className="h-8 w-8" />
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {title && <h3 className="font-medium mb-2">{title}</h3>}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{currentTime}</span>
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">{duration}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={skipBackward}>
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={skipForward}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Slider value={[volume]} min={0} max={100} step={1} onValueChange={handleVolumeChange} className="w-24" />

              <Button variant="ghost" size="icon" onClick={handleFullscreen}>
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
