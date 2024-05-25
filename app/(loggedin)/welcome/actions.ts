"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { Anthropic } from "@anthropic-ai/sdk";
import { THEMES } from "../home/helping-hands/find/THEMES";

export const addUserRecord = async (
  payload: Database["public"]["Tables"]["user_metadata"]["Insert"]
) => {
  const sb = createClient();

  const { data: userData, error: userError } = await sb.auth.getUser();
  if (userError) {
    console.error(userError);
    throw Error("Could not get authenticated user");
  }

  const { preferences } = payload;
  const anthropic = new Anthropic();
  const startingMessage =
    "I am going to give you an input. Please parse the input for the person's preferences and return me a JSON Object with key = 'preferences_keyphrases' and value of type string array and containing the parsed preferences. Do not give me anything other than a valid json object (not even your conversational words)";
  const message = await anthropic.messages.create({
    max_tokens: 200,
    messages: [
      { role: "user", content: startingMessage },
      {
        role: "assistant",
        content:
          "OK please give me your input. I will send you only a JSON object with a key called preferences_keyphrases and values of type string array",
      },
      {
        role: "user",
        content: preferences as string,
      },
    ],
    model: "claude-3-haiku-20240307",
  });

  let preferences_keyphrases;
  try {
    preferences_keyphrases = JSON.parse(
      message.content[0].text
    ).preferences_keyphrases;
  } catch {
    throw new Error("Invalid response by AI model");
  }
  if (!preferences_keyphrases) {
    throw new Error("Invalid response by AI model");
  }

  const { strengths } = payload;
  const startingStrengthMessage = `Please parse the input for the person's skills, talents, and experiences, and map them to the following keywords: ${THEMES}. Return the results as a JSON object with the key 'strengths_keyphrases' and the value as an array of strings. The strings must match the keywords. Do not include anything other than the JSON object (not even your conversational words).`;

  const strengthMessage = await anthropic.messages.create({
    max_tokens: 200,
    messages: [
      { role: "user", content: startingStrengthMessage },
      {
        role: "assistant",
        content:
          "OK please give me your input. I will send you only a JSON object with a key called strengths_keyphrases and values of type string array",
      },
      {
        role: "user",
        content: strengths as string,
      },
    ],
    model: "claude-3-haiku-20240307",
  });

  let strengths_keyphrases;
  try {
    strengths_keyphrases = JSON.parse(
      strengthMessage.content[0].text
    ).strengths_keyphrases;
  } catch {
    throw new Error("Invalid strengthresponse by AI model");
  }
  if (!preferences_keyphrases) {
    throw new Error("Invalid strength response by AI model");
  }

  const user_id = userData.user.id;
  const finalPayload = {
    ...payload,
    user_id,
    preferences_keyphrases,
    strengths_keyphrases,
  };
  const { error: updateError, data: updateData } = await sb
    .from("user_metadata")
    .upsert(finalPayload)
    .select()
    .single();

  if (updateError) {
    console.error(updateError);
    throw Error("Could not update user details");
  }

  return updateData;
};
