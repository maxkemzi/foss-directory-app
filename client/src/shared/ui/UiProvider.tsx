"use client";

import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import React, {FC, PropsWithChildren} from "react";

const UiProvider: FC<PropsWithChildren> = ({children}) => {
	const router = useRouter();

	return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default UiProvider;
