import React, { useEffect } from "react";
import LocalPeer from "../LocalPeer/LocalPeer";
import RemotePeer from "../RemotePeer/RemotePeer";
import { useLocalPeer, useLocalVideo, usePeerIds } from "@huddle01/react/hooks";
import useStore from "@/store";

type ViewProps = {};

const View: React.FC<ViewProps> = ({}) => {
  const { peerIds } = usePeerIds();

  const enableCanvas = useStore((state) => state.enableCanvas);
  const setEnableCanvas = useStore((state) => state.setEnableCanvas);

  const { metadata } = useLocalPeer<{
    displayName: string;
  }>();

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
      <h1>{metadata?.displayName}</h1>

      <button type="button" onClick={() => setEnableCanvas(!enableCanvas)}>
        Enable Canvas
      </button>
      <div className="">
        <LocalPeer />

        {/* {peerIds.map((peerId) => (
          <RemotePeer peerId={peerId} key={`remote-peer-${peerId}`} />
        ))} */}
      </div>
    </div>
  );
};
export default View;
