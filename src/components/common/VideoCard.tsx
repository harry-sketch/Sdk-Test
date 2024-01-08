import { cn } from "@/utils/helpers";
import {
  FaceLandmarker,
  FaceLandmarkerOptions,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useGraph } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Euler, Matrix4, Color } from "three";

interface Props {
  stream?: MediaStream;
  className?: string;
  isMe?: boolean;
  objectCover?: boolean;
}

let faceLandmarker: FaceLandmarker;
let lastVideoTime = -1;
let headMesh: any[] = [];
let blendshapes: any[] = [];
let rotation: Euler;

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

function Avatar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);

  useEffect(() => {
    if (nodes.Wolf3D_Head) headMesh.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) headMesh.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) headMesh.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) headMesh.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) headMesh.push(nodes.Wolf3D_Head_Custom);
  }, [nodes, url]);

  useFrame(() => {
    if (blendshapes.length > 0) {
      blendshapes.forEach((element) => {
        headMesh.forEach((mesh) => {
          let index = mesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });

      nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      nodes.Neck.rotation.set(
        rotation.x / 5 + 0.3,
        rotation.y / 5,
        rotation.z / 5
      );
      nodes.Spine2.rotation.set(
        rotation.x / 10,
        rotation.y / 10,
        rotation.z / 10
      );
    }
  });

  return <primitive object={scene} position={[0, -1.75, 3]} />;
}

const VideoCard: React.FC<Props> = ({ stream, isMe }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [url, setUrl] = useState<string>(
    "https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024"
  );

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
    videoRef.current.addEventListener("loadeddata", predict);
  };

  const predict = async () => {
    if (!videoRef.current) return;

    let nowInMs = Date.now();

    if (lastVideoTime !== videoRef.current.currentTime) {
      lastVideoTime = videoRef.current.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(
        videoRef.current,
        nowInMs
      );

      if (
        faceLandmarkerResult.faceBlendshapes &&
        faceLandmarkerResult.faceBlendshapes.length > 0 &&
        faceLandmarkerResult.faceBlendshapes[0].categories
      ) {
        blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

        const matrix = new Matrix4().fromArray(
          faceLandmarkerResult.facialTransformationMatrixes![0].data
        );
        rotation = new Euler().setFromRotationMatrix(matrix);
      }
    }

    window.requestAnimationFrame(predict);
  };

  useEffect(() => {
    setup();
  }, dependencies);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        className={cn(
          "animate-opacity-show z-20 aspect-video w-full rounded-lg shadow-md"
        )}
      />
      <Canvas style={{ height: 600 }} camera={{ fov: 25 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 10]}
          color={new Color(1, 1, 0)}
          intensity={0.5}
          castShadow
        />
        <pointLight
          position={[-10, 0, 10]}
          color={new Color(1, 0, 0)}
          intensity={0.5}
          castShadow
        />
        <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
        <Avatar url={url} />
      </Canvas>
    </>
  );
};

export default React.memo(VideoCard);
