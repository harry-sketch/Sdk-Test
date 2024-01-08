export default function Home() {
  return null;
}

export const getServerSideProps = async () => {
  const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    body: JSON.stringify({
      title: "Huddle01-room",
    }),
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.API_KEY!,
    },
  });

  const data = await response.json();
  const roomId = data.data.roomId;

  console.log(roomId);

  return {
    redirect: {
      destination: `/${roomId}/lobby`,
      permanent: false,
    },
  };
};
