"use client";

import { postSecretPayload } from "@/actions";

export default function Form() {
  return (
    <form>
      <button
        onClick={async () => {
          await postSecretPayload("haha");
        }}
      >
        Click me
      </button>
    </form>
  );
}
