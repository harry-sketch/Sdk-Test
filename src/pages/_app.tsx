import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HuddleClient, HuddleProvider } from "@huddle01/react";

const huddleClient = new HuddleClient({
  projectId: "oirwjtHBMERNfvA5kmwrpxz8Mi176hUL",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HuddleProvider client={huddleClient}>
      <Component {...pageProps} />
    </HuddleProvider>
  );
}
