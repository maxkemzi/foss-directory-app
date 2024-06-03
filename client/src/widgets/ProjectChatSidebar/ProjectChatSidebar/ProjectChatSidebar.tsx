"use client";

import {ProjectFromApi} from "#src/shared/api";
import {useListenClickOutside} from "#src/shared/ui";
import {Card, CardBody} from "@nextui-org/react";
import classNames from "classnames";
import {AnimatePresence, motion} from "framer-motion";
import {FC, useRef} from "react";
import List from "./List";

interface Props {
	projects: ProjectFromApi[];
	sidebarIsOpen?: boolean;
	onSidebarClose?: () => void;
}

const ProjectChatSidebar: FC<Props> = ({
	projects,
	sidebarIsOpen,
	onSidebarClose
}) => {
	const sidebarRef = useRef(null);

	useListenClickOutside(sidebarRef, () => {
		onSidebarClose?.();
	});

	return (
		<aside>
			<div className="hidden md:block">
				<List projects={projects} />
			</div>
			<AnimatePresence>
				{sidebarIsOpen ? (
					<motion.aside
						initial={{x: "-100%"}}
						animate={{x: 0}}
						exit={{x: "-100%"}}
						transition={{
							duration: 0.3,
							ease: "easeInOut"
						}}
						ref={sidebarRef}
						className={classNames("absolute top-0 bottom-0 z-20")}
					>
						<Card isBlurred classNames={{base: "h-full"}}>
							<CardBody>
								<List projects={projects} />
							</CardBody>
						</Card>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</aside>
	);
};

export type {Props as ProjectChatSidebarProps};
export default ProjectChatSidebar;
