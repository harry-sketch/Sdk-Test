import {
  FaceLandmarker,
  FaceLandmarkerOptions,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import React, { useEffect, useRef } from "react";
import { Euler, Matrix4 } from "three";

interface Props {
  stream?: MediaStream;
  className?: string;
  isMe?: boolean;
  objectCover?: boolean;
}

let faceLandmarker: FaceLandmarker;
let lastVideoTime = -1;

const options: FaceLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    delegate: "GPU",
  },
  numFaces: 1,
  runningMode: "VIDEO",
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
};

const VideoCard: React.FC<Props> = ({ stream, isMe }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const dependencies = isMe ? [stream] : [];

  const setup = async () => {
    if (!videoRef.current) return;

    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      options
    );

    const videoObj = videoRef.current;

    if (videoObj && stream) {
      videoObj.srcObject = stream;

      videoObj.onloadedmetadata = async () => {
        try {
          await videoObj.play();
        } catch (error) {
          console.error(error);
        }
      };

      videoObj.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
    // videoRef.current.addEventListener("loadeddata", predict);
  };

  // const predict = async () => {
  //   if (!videoRef.current) return;

  //   let nowInMs = Date.now();

  //   if (lastVideoTime !== videoRef.current.currentTime) {
  //     lastVideoTime = videoRef.current.currentTime;
  //     const faceLandmarkerResult = faceLandmarker.detectForVideo(
  //       videoRef.current,
  //       nowInMs
  //     );

  //     if (
  //       faceLandmarkerResult.faceBlendshapes &&
  //       faceLandmarkerResult.faceBlendshapes.length > 0 &&
  //       faceLandmarkerResult.faceBlendshapes[0].categories
  //     ) {
  //       blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

  //       const matrix = new Matrix4().fromArray(
  //         faceLandmarkerResult.facialTransformationMatrixes![0].data
  //       );
  //       rotation = new Euler().setFromRotationMatrix(matrix);
  //     }
  //   }

  //   window.requestAnimationFrame(predict);
  // };

  useEffect(() => {
    setup();
  }, dependencies);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="animate-opacity-show z-20 aspect-video w-full rounded-lg shadow-md"
    />
  );
};

export default React.memo(VideoCard);
