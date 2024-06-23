"use client";

import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Input, InputProps} from "@nextui-org/react";
import classnames from "classnames";
import {ChangeEvent, FC, useEffect, useRef, useState} from "react";

interface Props {
	classNames?: InputProps["classNames"];
	onSearch?: (value: string) => void;
	placeholder?: InputProps["placeholder"];
}

const SearchInput: FC<Props> = ({classNames, onSearch, placeholder}) => {
	const {base, ...restClassNames} = classNames || {};

	const [inputValue, setInputValue] = useState<string | null>(null);
	const onSearchRef = useRef(onSearch);
	onSearchRef.current = onSearch;

	useEffect(() => {
		if (inputValue !== null) {
			onSearchRef.current?.(inputValue);
		}
	}, [inputValue]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setInputValue(target.value);
	};

	const handleClear = () => {
		setInputValue("");
	};

	return (
		<Input
			classNames={{base: classnames("max-w-[350px]", base), ...restClassNames}}
			label="Search"
			value={inputValue || ""}
			onChange={handleChange}
			onClear={handleClear}
			maxLength={50}
			isClearable
			placeholder={placeholder || "Type to search..."}
			startContent={<MagnifyingGlassIcon className="size-[16px]" />}
		/>
	);
};

export type {Props as SearchInputProps};
export default SearchInput;
