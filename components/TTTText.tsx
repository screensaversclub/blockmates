"use client";
import { createClient } from "@/utils/supabase/client";
import { getTranslation } from "@/utils/translate-deepl";
import { useCallback, useMemo, useState } from "react";

const reduceJsxToString = (previous: string, current: React.ReactNode) => {
  return previous + innerText(current);
};

const innerText: (jsx: React.ReactNode) => string = (jsx) => {
  if (jsx === null || typeof jsx === "boolean" || typeof jsx === "undefined") {
    return "";
  }

  if (typeof jsx === "number") {
    return jsx.toString();
  }

  if (typeof jsx === "string") {
    return jsx;
  }

  if (Array.isArray(jsx)) {
    return jsx.reduce(reduceJsxToString, "");
  }

  return "";
};

export default function TTTText({
  children,
  as = "span",
}: {
  children: React.ReactNode;
  as: "span" | "p";
}) {
  const text = innerText(children);

  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [doTranslate, setDoTranslate] = useState(false);

  const display = useMemo(() => {
    return translatedText.length > 0 && doTranslate ? translatedText : text;
  }, [translatedText, doTranslate]);

  const handleTranslation = useCallback(async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const sb = createClient();
    const user = await sb.auth.getUser();

    if (typeof user.data.user?.id !== "string") {
      alert("Error fetching user in TTTText!");
      return;
    }

    const { data } = await sb
      .from("user_metadata")
      .select("language")
      .eq("user_id", user.data.user.id)
      .single();

    const targetLanguage =
      data === null || ["en", "my", "cn"].indexOf(data.language) < 0
        ? "en"
        : (data.language as "en" | "my" | "cn");

    setDoTranslate(() => true);
    setIsTranslating(() => true);
    const _translation = await getTranslation({
      text,
      targetLanguage,
    });

    if (_translation !== null && _translation.length > 0) {
      setTranslatedText(() => _translation);
      setIsTranslating(() => false);
    } else {
      alert("error translating. try again.");
    }
  }, []);

  if (as === "p") {
    return (
      <p className={translatedText === "" ? "unset" : "text-purple-800"}>
        {display}
        {!doTranslate && translatedText === "" && (
          <b
            onClick={handleTranslation}
            className='relative translatable-text'
            style={{
              opacity: isTranslating ? 0.6 : 1,
            }}
          >
            &nbsp;🗣️
          </b>
        )}
      </p>
    );
  }
  return (
    <span className={translatedText === "" ? "unset" : "text-purple-800"}>
      {display}
      {!doTranslate && translatedText === "" && (
        <b
          onClick={handleTranslation}
          className='relative translatable-text'
          style={{
            opacity: isTranslating ? 0.6 : 1,
          }}
        >
          &nbsp;🗣️
        </b>
      )}
    </span>
  );
}
