"use client";

import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC, PropsWithChildren} from "react";

const Providers: FC<PropsWithChildren> = ({children}) => {
	const router = useRouter();

	return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default Providers;
