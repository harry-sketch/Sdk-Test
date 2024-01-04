import View from "@/components/View/View";

import { useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect } from "react";
import { Euler } from "three";

type Props = {
  token: string;
};

let blendshapes: any[] = [];
let rotation: Euler;
let headMesh: any[] = [];

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

export default function Home({ token }: Props) {
  return (
    <main className="">
      <View />
    </main>
  );
}

// export const getServerSideProps = async () => {
//   const accessToken = new AccessToken({
//     apiKey: "Lvtt3L8xT6UhlFLjGlyAgXVd7IF2-TzF",
//     roomId: "fge-bxdp-hwr",
//     role: Role.HOST,
//     permissions: {
//       admin: true,
//       canConsume: true,
//       canProduce: true,
//       canProduceSources: {
//         cam: true,
//         mic: true,
//         screen: true,
//       },
//       canRecvData: true,
//       canSendData: true,
//       canUpdateMetadata: true,
//     },
//     options: {
//       metadata: {
//         // you can add any custom attributes here which you want to associate with the user
//         walletAddress: "harsh",
//       },
//     },
//   });

//   const token = await accessToken.toJwt();

//   console.log({ token });

//   return {
//     props: { token },
//   };
// };
