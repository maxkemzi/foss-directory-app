"use client";

import {Pathname} from "#src/constants";
import {ProjectFromApi} from "#src/types/apis";
import {Card, CardBody} from "@nextui-org/react";
import classNames from "classnames";
import {usePathname, useRouter} from "next/navigation";
import {FC} from "react";
import {revalidateChatPath} from "./actions";

interface Props {
	projects: ProjectFromApi[];
}

const ChatSidebar: FC<Props> = ({projects}) => {
	const pathname = usePathname();
	const router = useRouter();

	const handleClick = async (path: string) => {
		await revalidateChatPath(path);
		router.replace(path);
	};

	return (
		<aside>
			<ul className="flex flex-col gap-4 h-full overflow-y-auto">
				{projects.map(project => {
					const path = `${Pathname.CHATS}/${project.id}`;
					const isActive = pathname === path;

					return (
						<li key={project.id}>
							<button
								className="w-full"
								onClick={() => handleClick(path)}
								type="button"
							>
								<Card classNames={{base: classNames({"bg-primary": isActive})}}>
									<CardBody>
										<p className="truncate">{project.name}</p>
									</CardBody>
								</Card>
							</button>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default ChatSidebar;
