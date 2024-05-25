"use client";

import { useState } from "react";
import { rewriteHelpRequest, submitRequest } from "./actions";
import { useRouter } from "next/navigation";

export default function AskForHelp() {
  const [ask, setAsk] = useState("");
  const [title, setTitle] = useState("");
  const [suggestedTitle, setSuggestedTitle] = useState("");
  const [suggestedAsk, setSuggestedAsk] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start w-full py-4 gap-4">
      <h1 className="pt-8 text-xl">What do you need help with?</h1>
      <p>
        Type 2-3 sentences to express what you need help with. Give more details
        so others can understand what you need better.
      </p>
      <input
        type="text"
        value={title}
        className="w-full"
        placeholder="Need help with moving"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className="w-full">
        <textarea
          placeholder="I need help with moving my heavy sofa down to the void deck..."
          className="w-full text-lg h-[8em]"
          value={ask}
          onChange={(e) => {
            setAsk(e.target.value);
          }}
        />
      </div>
      {suggestedAsk.length > 0 && suggestedTitle.length > 0 ? (
        <div className="p-4 my-4 bg-yellow-100">
          <h1 className="mb-4 text-sm font-bold text-center text-yellow-800 uppercase">
            Here's our suggestion!
          </h1>
          <blockquote className="font-italic">
            <h3 className="font-bold">{suggestedTitle}</h3>
            <p>{suggestedAsk}</p>
            <button
              type="button"
              className="block mx-auto mt-4"
              onClick={() => {
                setAsk(suggestedAsk);
                setTitle(suggestedTitle);
                setTimeout(() => {
                  setSuggestedAsk("");
                  setSuggestedTitle("");
                });
              }}
            >
              Use this text!
            </button>
          </blockquote>
        </div>
      ) : (
        false
      )}
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={ask.length < 1}
          type="button"
          className=""
          onClick={async () => {
            setSuggestedAsk("");
            const res = await rewriteHelpRequest(ask);
            setSuggestedTitle(res.title);
            setSuggestedAsk(res.request);
          }}
        >
          🪄 Help me rewrite
        </button>

        <button
          disabled={ask.length < 1 || title.length < 1}
          className="primary"
          onClick={async () => {
            const req = await submitRequest({ title, body: ask });
            if (req.error !== null) {
              alert("An error occurred. try again?");
              return;
            }
            router.push("/home/helping-hands/find/submitted");
          }}
        >
          Submit
        </button>

        {/* <button
						disabled={ask.length < 1}
						type="button"
						className=""
						onClick={async () => {
						setSuggestedAsk("");
						const res = await categoriseHelpRequest(ask);

						console.log(res.content[0]);
						}}
						>
						🧠 Categorise
				</button> */}
      </div>
    </div>
  );
}
