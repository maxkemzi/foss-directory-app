"use client";

import {XCircleIcon} from "@heroicons/react/16/solid";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Button, Chip, Input, InputProps} from "@nextui-org/react";
import classNames from "classnames";
import {
	ChangeEvent,
	FC,
	KeyboardEvent,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";

interface Props {
	className?: string;
	onChange?: (values: string[]) => void;
	inputProps?: {
		classNames?: InputProps["classNames"];
		placeholder?: InputProps["placeholder"];
	};
}

const ChipsInput: FC<Props> = ({className, onChange, inputProps}) => {
	const [values, setValues] = useState<string[] | null>(null);
	const [inputValue, setInputValue] = useState("");
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setInputValue(target.value);
	};

	useEffect(() => {
		if (values !== null) {
			onChangeRef.current?.(values);
		}
	}, [values]);

	const isDisabled = useMemo(
		() =>
			inputValue.length === 0 ||
			(values !== null && values.includes(inputValue)),
		[inputValue, values]
	);

	const addValue = () => {
		setValues(prev => (prev !== null ? [...prev, inputValue] : [inputValue]));
		setInputValue("");
	};

	const removeValue = (value: string) => {
		setValues(prev => (prev !== null ? prev.filter(v => v !== value) : prev));
	};

	const clearValues = () => {
		setValues([]);
		setInputValue("");
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isDisabled) {
			addValue();
		}
	};

	return (
		<div className={classNames("flex gap-2 max-w-[350px]", className)}>
			<Input
				{...inputProps}
				maxLength={50}
				value={inputValue}
				classNames={{
					base: "h-full",
					inputWrapper: "h-full",
					innerWrapper: "items-end",
					input: "h-10"
				}}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				startContent={
					values !== null && values.length !== 0 ? (
						<div className="flex h-full py-2 flex-wrap items-end gap-2 max-w-[50%]">
							{values.map(v => (
								<Chip key={v} onClose={() => removeValue(v)}>
									{v}
								</Chip>
							))}
						</div>
					) : null
				}
				endContent={
					values !== null && values.length !== 0 ? (
						<button
							className="self-start py-2"
							aria-label="clear input"
							onClick={clearValues}
							type="button"
						>
							<XCircleIcon className="size-[16px]" />
						</button>
					) : null
				}
			/>
			<Button
				isIconOnly
				onClick={addValue}
				isDisabled={isDisabled}
				color="primary"
			>
				<PlusIcon className="size-[24px]" />
			</Button>
		</div>
	);
};

export type {Props as SearchInputProps};
export default ChipsInput;
