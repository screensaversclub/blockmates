import { createClient } from "@/utils/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

export const getInspirationalMessage = async (
  requestId: string,
  isOwnPost: boolean
) => {
  const sb = createClient();
  const { data: userData, error: userError } = await sb.auth.getUser();
  if (userError || !userData) {
    throw Error("Could not get authenticated user");
  }

  const { data: userMetaData, error: userMetaDataError } = await sb
    .from("user_metadata")
    .select("*")
    .eq("user_id", userData.user.id)
    .select()
    .single();
  if (userMetaDataError) {
    throw Error("Could not get associated user meta data");
  }

  const { data: helpRequestData, error: helpRequestError } = await sb
    .from("help_request")
    .select("*")
    .eq("id", requestId)
    .select()
    .single();
  if (helpRequestError || !helpRequestData) {
    throw Error("Could not get associated Help Request Data");
  }

  if (isOwnPost) {
    return {
      title: helpRequestData.title,
      body: helpRequestData.body,
      requesterId: helpRequestData.created_by,
      requestDate: helpRequestData.created_at,
    };
  }

  const baseMessage = `I am an A.I. working on an online platform that connects individuals in need with those offering help. Please write a motivational and inspirational post directed at the person who is offering help to motivate her to offer help to the requests.
  
  The message should be written in a conversational style and should not exceed 100 words.
  It is extremely important that you do not need to force the use of the helper's details if they are not relevant to the request details or using it will result in absurdity.
  
Please do not include any phrases such as "Here is a motivational and inspirational post directed at the helper:" at the beginning.

Consider using 1-2 emojis.

Here are the details for the helper and the request:

Helper Details:
Preferences: ${userMetaData.preferences}
Strengths: ${userMetaData.strengths}

Request Details:
Title: ${helpRequestData.title}
Body: ${helpRequestData.body}`;

  const anthropic = new Anthropic();
  const message = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: baseMessage,
      },
    ],
  });

  if (!message?.content[0]?.text) {
    throw new Error("Invalid response by AI model");
  }

  let inspirationalMessage;
  try {
    inspirationalMessage = message.content[0].text;
  } catch {
    throw new Error("Invalid response by AI model");
  }
  return {
    inspirationalMessage,
    title: helpRequestData.title,
    body: helpRequestData.body,
    requesterId: helpRequestData.created_by,
    requestDate: helpRequestData.created_at,
  };
};

export const getIsOwnPost = async (requestId: string) => {
  const sb = createClient();
  const { data: userData, error: userError } = await sb.auth.getUser();
  if (userError || !userData) {
    throw Error("Could not get authenticated user");
  }

  const { data: helpRequestData, error: helpRequestError } = await sb
    .from("help_request")
    .select("*")
    .eq("id", requestId)
    .select()
    .single();
  if (helpRequestError || !helpRequestData) {
    throw Error("Could not get associated Help Request Data");
  }

  let isOwnPost = false;
  if (helpRequestData.created_by === userData.user.id) {
    isOwnPost = true;
  }

  return { isOwnPost };
};
