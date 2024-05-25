"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export const addUserRecord = async (
	payload: Database["public"]["Tables"]["user_metadata"]["Insert"]
) => {
	const sb = createClient();

	const { data: userData, error: userError } = await sb.auth.getUser();

	if (userError) {
		console.error(userError);
		throw Error("Could not get authenticated user");
	}

	const user_id = userData.user.id;
	const finalPayload = { ...payload, user_id };
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
