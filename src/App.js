import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import { Data } from "./data/Data";
import VideoDetails from "./components/VideoDetails";
import "./App.css";
import Playlist from "./components/PlayList";

function App() {
 const [videoList] = useState(Data);
 const [activeVideo, setActiveVideo] = useState(Data[0]);

 const updateActiveVideo = (videoId) => {
    const video = videoList.find((video) => video.id === videoId);
    setActiveVideo(video);
 };

 return (
    <div className="flex flex-col items-center font-poppins">
      <div className="w-full bg-cyan-900 p-2">
        <h1 className="text-2xl font-semibold p-2 text-cyan-100 text-center">
          Video Player App
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-7">
        <div className="md:col-span-2 rounded-lg">
          {videoList.length > 0 ? (
            <>
              <VideoPlayer videoSrc={activeVideo?.sources[0]} />
              <VideoDetails video={activeVideo} />
            </>
          ) : (
            <p>No videos available</p>
          )}
        </div>
        <div className="rounded-lg">
          {videoList.length > 0 && (
            <Playlist
              videos={videoList}
              onVideoSelect={updateActiveVideo}
            />
          )}
        </div>
      </div>
    </div>
 );
}

export default App;
