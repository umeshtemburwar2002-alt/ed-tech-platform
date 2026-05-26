/**
 * College LMS - Video Player Component
 * Custom video player with controls, speed selection, and thumbnail generation
 */

import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const VideoPlayer = ({ url, onProgress, onEnded, autoPlay = false }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    let controlsTimeout;
    if (showControls) {
      controlsTimeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(controlsTimeout);
  }, [showControls]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      if (onProgress) {
        onProgress(state.playedSeconds);
      }
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    if (onEnded) onEnded();
  };

  const handlePlaybackRate = (rate) => {
    setPlaybackRate(rate);
  };

  const handleFullscreen = () => {
    const wrapper = document.querySelector('.video-wrapper');
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen();
    }
  };

  const generateThumbnail = async () => {
    if (!playerRef.current) return;

    const video = playerRef.current.getInternalPlayer();
    if (!video) return;

    // Seek to 5 seconds
    video.currentTime = 5;

    // Wait for seek to complete
    await new Promise((resolve) => {
      video.addEventListener('seeked', resolve, { once: true });
    });

    // Create canvas and capture frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob
    canvas.toBlob((blob) => {
      const thumbnailUrl = URL.createObjectURL(blob);
      setThumbnail(thumbnailUrl);
    }, 'image/jpeg', 0.8);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="video-wrapper relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
        width="100%"
        height="100%"
        style={{ aspectRatio: '16/9' }}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />

      {/* Custom Controls Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={handleMute} className="text-white hover:text-blue-400">
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>

            {/* Time Display */}
            <span className="text-white text-sm">
              {formatTime(played * duration)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Playback Speed */}
            <select
              value={playbackRate}
              onChange={(e) => handlePlaybackRate(parseFloat(e.target.value))}
              className="bg-transparent text-white text-sm border border-slate-600 rounded px-2 py-1 focus:outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>

            {/* Generate Thumbnail */}
            <button
              onClick={generateThumbnail}
              className="text-white hover:text-blue-400 transition-colors"
              title="Generate thumbnail"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Preview */}
      {thumbnail && (
        <div className="absolute top-4 right-4 bg-slate-900/90 rounded-lg p-2">
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="w-32 h-18 object-cover rounded"
          />
          <p className="text-xs text-slate-400 mt-1 text-center">Thumbnail at 5s</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
