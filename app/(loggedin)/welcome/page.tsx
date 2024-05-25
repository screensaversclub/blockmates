import OnboardingForm from "@/components/OnboardingForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const WelcomePage: React.FC = async () => {
  const sb = createClient();

  const user = await sb.auth.getUser();

  if (user.data.user === null) {
    redirect("/");
  }

  const metaRow = await sb
    .from("user_metadata")
    .select()
    .eq("user_id", user.data.user.id);

  if (metaRow.data === null || metaRow.data.length > 0) {
    redirect("/home");
  }

  return (
    <div>
      <OnboardingForm />
    </div>
  );
};

export default WelcomePage;
