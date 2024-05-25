"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/utils/supabase/server";
import { THEMES } from "./THEMES";

export async function categoriseHelpRequest(text: string) {
  const anthropic = new Anthropic();
  const message = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `I will provide a few sentences about a request for help. Based on the following categories, return in a JSON array of strings, which of these categories apply to the request. If it is not a request for help, return just []. otherwise, return just the JSON array of strings.

The categories are:

	${THEMES.map((a) => `- ${a}`).join("\n")}`,
      },
      {
        role: "assistant",
        content:
          "OK, please provide me the text and I will return a JSON array of strings. If it is not a valid request, I will return []",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return message;
}

export async function rewriteHelpRequest(text: string) {
  const anthropic = new Anthropic();
  const message = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `I will provide a few sentences about a request for help. Please help me rewrite it into a request that is appealing to the reader, and less than 100 words. Please give me just the rewritten text without any preamble. Give me your response in a JSON object like {title: "title goes here", request: "request text goes here"}`,
      },
      {
        role: "assistant",
        content:
          "OK, please provide me the text and I will help you rewrite it. I will return a JSON object as requested.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  try {
    const json = JSON.parse(message.content[0].text) as {
      title: string;
      request: string;
    };

    if (typeof json.title !== "string" || typeof json.request !== "string") {
      throw Error("Invalid object returned");
    }
    return json;
  } catch (err) {
    throw Error("JSON parse error");
  }
}

export async function submitRequest({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const sb = createClient();
  await sb.auth.getUser();

  const themesReq = await categoriseHelpRequest(body);

  let themesArr: string[] = [];

  try {
    const json = JSON.parse(themesReq.content[0].text) as unknown[];

    themesArr = json
      .filter((a) => typeof a === "string")
      .map<string>((a) =>
        THEMES.indexOf(a as string) > -1 ? (a as string) : "Others"
      );
  } catch (err) {
    console.error("Couldn't parse categoriseReq");
  }

  return await sb.from("help_request").insert({
    body,
    title,
    themes: themesArr,
  });
}
