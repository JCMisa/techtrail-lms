import Spinner from "@/components/custom/Spinner";
import { Lock } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  playbackUrl,
  isLocked,
}: {
  playbackUrl: string;
  isLocked: boolean;
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-100">
          <Spinner />
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
          onPlay={() => setIsReady(true)}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
