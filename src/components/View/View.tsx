import React, { useEffect } from "react";
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

  useEffect(() => {
    handleVideo();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full p-4 h-full">
        <LocalPeer />

        {/* {peerIds.map((peerId) => (
          <RemotePeer peerId={peerId} key={`remote-peer-${peerId}`} />
        ))} */}
      </div>
    </div>
  );
};
export default View;
