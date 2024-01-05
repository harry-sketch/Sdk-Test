import React, { useEffect } from "react";
import LocalPeer from "../LocalPeer/LocalPeer";
import RemotePeer from "../RemotePeer/RemotePeer";
import {
  useLocalAudio,
  useLocalVideo,
  usePeerIds,
} from "@huddle01/react/hooks";
import { Euler } from "three";

type ViewProps = {};

const View: React.FC<ViewProps> = ({}) => {
  // const { peerIds } = usePeerIds();
  const { enableVideo } = useLocalVideo();

  const handleVideo = async () => {
    await enableVideo().catch((error) => {
      console.log({ error });
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
