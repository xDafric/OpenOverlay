import { authClient } from "../lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <h1>Home</h1>
      <p>{session?.user.name}</p>
    </>
  );
}
