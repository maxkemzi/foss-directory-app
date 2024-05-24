"use client";

import {XMarkIcon} from "@heroicons/react/16/solid";
import {Button, Card, CardBody} from "@nextui-org/react";
import classNames from "classnames";
import {FC} from "react";
import {ToastVariant} from "./constants";
import {ToastOptions} from "./types";

interface Props extends ToastOptions {
	onClose: () => void;
}

const Toast: FC<Props> = ({variant, message, onClose}) => {
	return (
		<Card
			classNames={{
				base: classNames("border-1 min-w-[250px]", {
					"border-success": variant === ToastVariant.SUCCESS,
					"border-danger": variant === ToastVariant.ERROR,
					"border-warning": variant === ToastVariant.WARNING
				})
			}}
		>
			<CardBody>
				<div className="flex items-center justify-between gap-4">
					<p className="truncate">{message}</p>
					<Button onClick={onClose} isIconOnly size="sm">
						<XMarkIcon width={16} height={16} />
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default Toast;
