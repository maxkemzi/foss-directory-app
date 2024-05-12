"use server";

import {revalidatePath} from "next/cache";

const revalidateChatPath = async (path: string) => {
	revalidatePath(path);
};

export {revalidateChatPath};
