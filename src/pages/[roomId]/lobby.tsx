import React, { useEffect, useRef, useState } from "react";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useLocalPeer, useRoom } from "@huddle01/react/hooks";
import { cn } from "@/utils/helpers";
import useStore from "@/store";

type lobbyProps = {
  token: string;
};

const lobby: React.FC<lobbyProps> = ({ token }) => {
  const { push, query } = useRouter();

  const { updateMetadata } = useLocalPeer<{ displayName: string }>();

  const displayName = useStore((state) => state.name);

  const setDisplayName = useStore((state) => state.setName);

  const inputRef = useRef<null | HTMLInputElement>(null);

  const { joinRoom } = useRoom({
    onJoin: () => {
      push(`/${query.roomId}`);
      updateMetadata({ displayName });
    },
  });

  const handleJoin = async () => {
    await joinRoom({
      roomId: query.roomId as string,
      token,
    });
  };

  useEffect(() => {
    const inputObj = inputRef.current;
    inputObj?.focus();
  }, []);

  return (
    <main className="flex items-center justify-center flex-col h-screen">
      <h1>not Completed Yet 🤪 !!</h1>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        ref={inputRef}
        className={cn(
          "text-black rounded-md py-2 px-4 w-96 border-none outline-none focus:outline-blue-500 my-4"
        )}
        placeholder="Enter your name please..."
      />

      <button
        onClick={handleJoin}
        type="button"
        className="py-2 px-4 w-80 bg-blue-500 rounded-md"
      >
        Join Room
      </button>
    </main>
  );
};
export default lobby;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const params = ctx.params;
  const roomId = params?.roomId;

  if (typeof roomId !== "string") return { notFound: true };

  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY!,
    roomId,
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        // you can add any custom attributes here which you want to associate with the user
        walletAddress: "harsh",
      },
    },
  });

  const token = await accessToken.toJwt();

  console.log({ token });

  return {
    props: { token },
  };
};
