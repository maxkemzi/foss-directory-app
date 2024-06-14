"use client";

import {useListenClickOutside} from "#src/shared/ui";
import {Card, CardBody} from "@nextui-org/react";
import classNames from "classnames";
import {AnimatePresence, motion} from "framer-motion";
import {FC, ReactNode, useRef} from "react";

interface Props {
	isOpen?: boolean;
	onClose?: () => void;
	contentSlot?: ReactNode;
}

const ProjectChatSidebar: FC<Props> = ({isOpen, onClose, contentSlot}) => {
	const sidebarRef = useRef(null);

	useListenClickOutside(sidebarRef, () => {
		onClose?.();
	});

	return (
		<aside className="h-full">
			<div className="h-full hidden md:block">{contentSlot}</div>
			<AnimatePresence>
				{isOpen ? (
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
							<CardBody>{contentSlot}</CardBody>
						</Card>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</aside>
	);
};

export default ProjectChatSidebar;
