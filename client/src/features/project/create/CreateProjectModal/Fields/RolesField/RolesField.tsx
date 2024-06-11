"use client";

import {useRoleList} from "#src/entities/role";
import {useDebouncedCallback} from "#src/shared/hooks";
import {TrashIcon} from "@heroicons/react/20/solid";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {ChangeEvent, KeyboardEvent, useEffect, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";
import {FormValues} from "../../../types";

const RolesField = () => {
	const {formState, ...form} = useFormContext<FormValues>();
	const rolesValue = form.watch("roles");

	const {roles, hasMore, isFetching, fetchFirstPage, fetchMore} = useRoleList();
	useEffect(() => {
		fetchFirstPage();
	}, [fetchFirstPage]);

	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);
	const [autocompleteValue, setAutocompleteValue] = useState("");
	const [, scrollRef] = useInfiniteScroll({
		hasMore,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => fetchMore({search: autocompleteValue})
	});

	const fetchFirstPageWithDebounce = useDebouncedCallback(fetchFirstPage);
	const handleInputChange = (value: string) => {
		setAutocompleteValue(value);
		fetchFirstPageWithDebounce({search: value});
	};

	const submitIsDisabled = useMemo(
		() =>
			autocompleteValue.length === 0 ||
			rolesValue.some(r => r[0] === autocompleteValue),
		[rolesValue, autocompleteValue]
	);

	const addRole = () => {
		const newRole: [string, number] = [autocompleteValue, 1];
		const newRoles = [...rolesValue, newRole];
		form.setValue("roles", newRoles, {shouldValidate: true});
		setAutocompleteValue("");
	};

	const removeRole = (role: string) => {
		const updatedRoles = rolesValue.filter(r => r[0] !== role);
		form.setValue("roles", updatedRoles, {shouldValidate: true});
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			if (!submitIsDisabled) {
				addRole();
			}
		}
	};

	const changeRoleCount = (role: string, count: number) => {
		const updatedRoles = [...rolesValue];
		const indexToUpdate = updatedRoles.findIndex(r => r[0] === role);
		updatedRoles[indexToUpdate][1] = count;
		form.setValue("roles", updatedRoles);
	};

	return (
		<div>
			<div className="flex items-start gap-4">
				<Autocomplete
					classNames={{listboxWrapper: "max-h-[100px]"}}
					onKeyDown={handleKeyDown}
					label="Roles"
					placeholder="Enter role"
					isLoading={isFetching}
					items={roles}
					allowsCustomValue
					scrollRef={scrollRef}
					onOpenChange={setAutocompleteIsOpen}
					inputValue={autocompleteValue}
					onInputChange={handleInputChange}
					isInvalid={"roles" in formState.errors}
					errorMessage={formState.errors.roles?.message}
				>
					{item => (
						<AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
					)}
				</Autocomplete>
				<Button
					isIconOnly
					onClick={addRole}
					isDisabled={submitIsDisabled}
					color="primary"
				>
					<PlusIcon className="w-[24px] h-[24px]" />
				</Button>
			</div>
			{rolesValue.length !== 0 ? (
				<div className="flex flex-col gap-4 mt-2">
					{rolesValue.map(([role]) => (
						<div key={role} className="flex gap-2 items-start justify-between">
							<Input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									changeRoleCount(role, Number(e.target.value))
								}
								size="sm"
								label={role}
								labelPlacement="outside"
								type="number"
								defaultValue="1"
								min={1}
								max={50}
							/>
							<Button
								size="sm"
								onClick={() => removeRole(role)}
								isIconOnly
								color="danger"
								aria-label="Remove"
							>
								<TrashIcon className="w-[20px] h-[20px]" />
							</Button>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default RolesField;
