import React from "react";

const VideoItem = ({ video, idx, activeIdx, onSelect, dragProps }) => {
 return (
    <li
      ref={dragProps.innerRef}
      {...dragProps.draggableProps}
      {...dragProps.dragHandleProps}
      className={`border-2 border-cyan-900 rounded-lg mb-2 h-24 ${video.id === activeIdx ? "bg-zinc-200" : ""}font-poppins hover:bg-cyan-100`}
    >
      <div
        onClick={() => onSelect(video, idx)}
        style={{ cursor: "pointer" }}
        className="flex flex-row text-center justify-start p-2"
      >
        <div className="flex items-center p-2 mr-1">
          <img src="/drag.svg" className="h-5 w-5 hidden" alt="drag" />
          {video.id === activeIdx ? (
            <img src="/play.svg" className="h-3 w-5 list-index" alt="play" />
          ) : (
            <span className="list-index w-5">{idx + 1}</span>
          )}
        </div>
        <div className="flex">
          <div className="flex items-center">
            <img src={video.thumb} className="w-26 h-20" alt={video.title} />
          </div>
          <div className="flex flex-col ml-4">
            <p className="mb-2 text-left text-md font-medium">{video.title}</p>
            <p className="mb-2 text-left text-sm">{video.subtitle}</p>
          </div>
        </div>
      </div>
    </li>
 );
};

export default VideoItem
