"use client";

import {
	PropsWithChildren,
	ReactNode,
	forwardRef,
	useImperativeHandle,
	useRef
} from "react";

interface Ref {
	scrollToEnd: () => void;
}

interface Props extends PropsWithChildren {
	topSlot?: ReactNode;
}

const ProjectMessageList = forwardRef<Ref, Props>(
	({children, topSlot}, ref) => {
		const lastElementRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(
			ref,
			() => {
				return {
					scrollToEnd: () => {
						lastElementRef.current?.scrollIntoView({block: "end"});
					}
				};
			},
			[]
		);

		return (
			<div className="flex flex-col-reverse overflow-y-auto">
				<div ref={lastElementRef} className="invisible" />
				<div className="flex flex-col-reverse gap-4 p-6">{children}</div>
				{topSlot}
			</div>
		);
	}
);

ProjectMessageList.displayName = "ProjectMessageList";

export type {Ref as ProjectMessageListRef};
export default ProjectMessageList;
