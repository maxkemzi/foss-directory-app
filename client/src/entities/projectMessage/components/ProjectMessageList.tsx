"use client";

import {
	PropsWithChildren,
	forwardRef,
	useImperativeHandle,
	useRef
} from "react";

interface Ref {
	scrollToEnd: () => void;
}

const ProjectMessageList = forwardRef<Ref, PropsWithChildren>(
	({children}, ref) => {
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
			</div>
		);
	}
);

ProjectMessageList.displayName = "ProjectMessageList";

export type {Ref as ProjectMessageListRef};
export default ProjectMessageList;