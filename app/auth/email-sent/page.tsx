"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function EmailSent() {
  const validateOtp = useCallback(async (email: string, otp: string) => {
    const sb = createClient();
    await sb.auth.getUser();

    const loginResponse = await sb.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (loginResponse.error) {
      console.error(loginResponse.error);
      alert("An error has occurred. Try again.");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      // user login successful, redirect to home
      router.push("/home");
    }
  }, []);

  const search = useSearchParams();
  const email = search.get("email");
  const router = useRouter();

  const [otp, setOtp] = useState("");

  if (email === null || email.length < 1) {
    router.push("/");
    return <></>;
  }

  return (
    <div className='flex flex-col items-center justify-start p-4 pt-8'>
      <h1 className='mt-8 text-center'>Email Sent!</h1>
      <p className='text-center'>
        We sent you an email! Enter the 6-digit OTP in your email here to log
        in.
      </p>
      <form className='mt-8 flex gap-2'>
        <input
          type='text'
          name='otp'
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />

        <button
          type='button'
          onClick={async () => {
            const user = await validateOtp(email, otp);
            console.log(user);
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
