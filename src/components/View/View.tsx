import React from "react";
import LocalPeer from "../LocalPeer/LocalPeer";
import RemotePeer from "../RemotePeer/RemotePeer";
import {
  useLocalAudio,
  useLocalVideo,
  usePeerIds,
} from "@huddle01/react/hooks";

type ViewProps = {};

const View: React.FC<ViewProps> = () => {
  const { peerIds } = usePeerIds();
  const { enableVideo, stream, disableVideo } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();

  const handleVideo = async () => {
    await enableVideo().catch((error) => {
      console.log({ error });
    });
  };

  const handleDisableVideo = async () => {
    await disableVideo().catch((error) => {
      console.error({ error });
    });
  };

  const handleAudio = async () => {
    await enableAudio().catch((error) => {
      console.log({ error });
    });
  };

  const handledisableAudio = async () => {
    await disableAudio().catch((error) => {
      console.error({ error });
    });
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => (stream ? handleDisableVideo() : handleVideo())}
      >
        {stream ? "Disable Video" : "Enable Video"}
      </button>

      <br />
      <button
        type="button"
        onClick={() => (isAudioOn ? handledisableAudio() : handleAudio())}
      >
        {isAudioOn ? "disable Audio" : "enable Audio"}
      </button>

      <div className="h-96 w-96">
        <LocalPeer />
        {peerIds.map((peerId) => (
          <RemotePeer peerId={peerId} key={`remote-peer-${peerId}`} />
        ))}
      </div>
    </div>
  );
};
export default View;
