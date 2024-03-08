import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import VideoItem from "./VideoItem";

const Playlist = ({ videos, onVideoSelect }) => {
 const [videoList, setVideoList] = useState(videos);
 const [activeVideoIdx, setActiveVideoIdx] = useState(1);
 const [searchTerm, setSearchTerm] = useState("");

 const selectVideo = (video, idx) => {
    setActiveVideoIdx(video.id);
    onVideoSelect?.(video.id);
 };

const onDragEnd = (result) => {
    if (!result.destination) return;
    if (
       result.destination.droppableId === result.source.droppableId &&
       result.source.index === result.destination.index
    )
       return;
   
    const startIdx = parseInt(result.source.index);
    const endIdx = parseInt(result.destination.index);
   
    const updatedList = [...videoList];
    const [movedItem] = updatedList.splice(startIdx, 1);
    updatedList.splice(endIdx, 0, movedItem);
   
    setVideoList(updatedList);
};

 const filteredVideos = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
    <div className="p-2 border-2 border-cyan-900 rounded-md font-poppins">
      <div className="h-16 flex items-center ">
        <h1 className="font-medium text-left text-xl">Playlist</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search videos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 outline-none border-cyan-900"
        />
      </div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="overflow-y-auto h-[37rem] "
              >
                {filteredVideos.map((video, idx) => (
                 <Draggable key={video.id} draggableId={video.id} index={idx}>
                    {(dragProps) => (
                      <VideoItem
                        video={video}
                        idx={idx}
                        activeIdx={activeVideoIdx}
                        onSelect={selectVideo}
                        dragProps={dragProps}
                      />
                    )}
                 </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
 );
};

export default Playlist