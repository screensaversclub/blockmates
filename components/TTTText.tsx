"use client";
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
  target = "en",
}: {
  children: React.ReactNode;
  as: "span" | "p";
  target: "en" | "my" | "cn";
}) {
  const text = innerText(children);

  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [doTranslate, setDoTranslate] = useState(false);

  const display = useMemo(() => {
    return translatedText.length > 0 && doTranslate ? translatedText : text;
  }, [translatedText, doTranslate]);

  const handleTranslation = useCallback(async () => {
    setDoTranslate(() => true);
    setIsTranslating(() => true);
    const _translation = await getTranslation({
      text,
      targetLanguage: target,
    });

    if (_translation !== null && _translation.length > 0) {
      setTranslatedText(() => _translation);
      setIsTranslating(() => false);
    } else {
      alert("error translating. try again.");
    }
  }, [target]);

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
          className='translatable-text relative'
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
