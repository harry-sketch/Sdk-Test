import View from "@/components/View/View";

type Props = {
  token: string;
};

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
