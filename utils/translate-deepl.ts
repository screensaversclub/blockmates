"use server";

export const getTranslation = async ({
  text,
  targetLanguage,
}: {
  text: string;
  targetLanguage: "en" | "my" | "cn";
}) => {
  const req = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      text: [text],
      target_lang:
        targetLanguage === "en"
          ? "EN"
          : targetLanguage === "my"
            ? "ID"
            : targetLanguage === "cn"
              ? "ZH"
              : "EN",
    }),
  });

  const json = (await req.json()) as {
    translations: { text: string; detected_source_langauge: string }[];
  };

  return json?.translations?.[0]?.text || null;
};
