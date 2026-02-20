import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");

  // Redirect home on access_denied (user cancelled OAuth)
  if (error === "access_denied") {
    redirect("/");
  }

  // For other errors, redirect home too (graceful fallback)
  redirect("/");
}
