import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function trySignupWithEmail(form: FormData) {
  "use server";

  const email = form.get("email");

  if (email === null) {
    throw Error("no email entered");
  }

  const sb = createClient();
  await sb.auth.signInWithOtp({
    email: email as unknown as string,
  });

  redirect(`/auth/email-sent?email=${email}`);
}

export default async function Index() {
  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <h1 className="mt-8 text-2xl">Welcome to your block!</h1>
      <h2 className="text-lg">
        Unlock new ways to connect with your block mates, help each other and do
        things together.
      </h2>

      <div className="mt-8">
        <p>Just enter your email to get started!</p>
        <form method="POST" action={trySignupWithEmail}>
          <input type="email" name="email" />
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  );
}
