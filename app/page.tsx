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
    <>
      <div className='flex w-full flex-1 flex-col items-center px-4 pt-24'>
        <h1 className='mt-8 text-center text-2xl font-medium text-green-600'>
          Welcome to your block!
        </h1>
        <h2 className='text-center text-lg'>
          Unlock new ways to connect with your block mates, help each other and
          do things together.
        </h2>

        <div className='mt-8 rounded border border-yellow-200 bg-yellow-100 p-4'>
          <p>Just enter your email to get started!</p>
          <form
            method='POST'
            action={trySignupWithEmail}
            className='mt-2 flex gap-2'
          >
            <input type='email' name='email' />
            <button type='submit'>Go</button>
          </form>
        </div>
      </div>
    </>
  );
}
