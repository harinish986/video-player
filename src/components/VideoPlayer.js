import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ videoSrc, ...props }) => {
 const videoElem = useRef(null);
 const [isPlaying, setPlaying] = useState(false);
 const [currentTime, setCurrentTime] = useState(0);
 const [duration, setDuration] = useState(0);
 const [speed, setSpeed] = useState(1);
 const [volume, setVolume] = useState(1);

 useEffect(() => {
    const video = videoElem.current;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const updatePlayState = () => setPlaying(video.paused);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("play", updatePlayState);
    video.addEventListener("pause", updatePlayState);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("play", updatePlayState);
      video.removeEventListener("pause", updatePlayState);
    };
 }, []);

 const togglePlayPause = () => {
    const video = videoElem.current;
    video.paused ? video.play() : video.pause();
    setPlaying(!isPlaying);
 };

 const seek = (event) => {
    const video = videoElem.current;
    video.currentTime = event.target.value;
    setCurrentTime(event.target.value);
 };

 const changeSpeed = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
    videoElem.current.playbackRate = newSpeed;
 };

 const adjustVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    videoElem.current.volume = newVolume;
 };

 const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
 };

 return (
    <div className="flex flex-col bg-cyan-100 font-poppins">
      <div className="video-play relative">
        <video
          {...props}
          ref={videoElem}
          src={videoSrc}
          autoPlay
          onClick={togglePlayPause}
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col md:flex-row p-1">
        <div className="flex flex-row w-full md:w-3/4 text-center justify-center items-center">
          <div className="mr-2">
            <button onClick={togglePlayPause} className="cursor-pointer p-1">
              {isPlaying ? (
                <img src="/play.svg" className="h-5 md:h-4 w-5 md:w-5" alt="Play" />
              ) : (
                <img src="/pause.svg" className="h-5 md:h-4 w-5 md:w-5" alt="Pause" />
              )}
            </button>
          </div>
          <div className="flex-grow mx-2">
            <input
              className="w-full cursor-pointer"
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={seek}
            />
          </div>
          <div className="flex items-center mx-2">
            <span className="text-sm md:text-md">{formatTime(currentTime)}</span>{" "}
            / <span className="text-sm md:text-md">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex flex-row w-full md:w-1/4">
          <div className="flex items-center w-full md:w-auto text-center justify-center">
            <label className="mx-2 text-sm md:text-md">Volume:</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={adjustVolume}
              className="p-1 border border-gray-300 rounded w-full md:w-18"
            />
          </div>

          <div className="flex items-center w-full md:w-auto ml-2 md:ml-0 mt-2 md:mt-0">
            <label className="mx-2 text-sm md:text-md">Speed:</label>
            <select
              value={speed}
              onChange={changeSpeed}
              className="p-1 rounded w-full md:w-auto outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
 );
};

export default VideoPlayer;
