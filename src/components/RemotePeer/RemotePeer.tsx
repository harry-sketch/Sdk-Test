import { useRemoteVideo } from "@huddle01/react/hooks";
import React from "react";
import VideoCard from "../common/VideoCard";

type RemotePeerProps = {
  peerId: string;
};

const RemotePeer: React.FC<RemotePeerProps> = ({ peerId }) => {
  const { state, stream } = useRemoteVideo({ peerId });

  console.warn({ stream });
  return (
    <div>{stream && state === "playable" && <VideoCard stream={stream} />}</div>
  );
};
export default RemotePeer;
