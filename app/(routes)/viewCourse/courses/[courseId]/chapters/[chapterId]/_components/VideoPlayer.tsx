import { Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackUrl,
  isLocked,
}: {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackUrl: string;
  isLocked: boolean;
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-100">
          <Loader2 className="w-8 h-8 animate-spin text-primary-100" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-100 flex-col gap-y-2 text-primary-100">
          <Lock className="w-8 h-8" />
          <p className="text-sm text-light-100">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={playbackUrl}
          playing={true}
          loop={true}
          muted={true}
          controls={true}
          width="100%"
          height="100%"
          onEnded={() => {}}
          onPlay={() => setIsReady(true)}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
