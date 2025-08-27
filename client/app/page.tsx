import { cookies } from "next/headers";
import buildClient from "@/api/buildClient";

export default async function HomePage() {
  let currentUser = null;

  try {
    // Use Next.js cookies API
    const cookieStore =await cookies();
    const sessionCookie = cookieStore.toString();

    const client = buildClient({
      req: {
        headers: {
          cookie: sessionCookie,
          host: "ticketing.dev",
        },
      },
    });

    const response = await client.get("/api/users/currentuser");
    currentUser = response.data.currentUser;
    console.log('current user ***', currentUser)

  } catch (err) {
    console.error("Error fetching current user:", err);
  }

  return (
    <div>
      <h1>Home Page</h1>
      {currentUser ? (
        <p>Signed in as {currentUser.email}</p>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}
