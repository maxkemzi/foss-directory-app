import {RoleFromApi} from "#src/types/apis";
import {TrashIcon} from "@heroicons/react/20/solid";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {getRoles} from "../actions";

interface Props {
	isInvalid: boolean;
	errorMessage?: string;
	isDisabled?: boolean;
	defaultValue?: {[role: string]: number};
}

const RolesField: FC<Props> = ({
	isInvalid,
	errorMessage,
	isDisabled,
	defaultValue
}) => {
	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);

	const [roles, setRoles] = useState<RoleFromApi[]>([]);
	const [rolesAreFetching, setRolesAreFetching] = useState(false);

	const [addedRoles, setAddedRoles] = useState<{[role: string]: number}>(
		defaultValue || {}
	);
	const [inputValue, setInputValue] = useState<string>("");

	// todo: implement infinite scroll
	const [, scrollRef] = useInfiniteScroll({
		hasMore: false,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => {}
	});

	useEffect(() => {
		const fetchRoles = async () => {
			setRolesAreFetching(true);
			setRoles(await getRoles());
			setRolesAreFetching(false);
		};
		fetchRoles();
	}, []);

	const addRole = () => {
		setAddedRoles(prev => ({...prev, [inputValue]: 1}));
		setInputValue("");
	};

	const removeRole = (value: string) =>
		setAddedRoles(prev => {
			const newData = {...prev};
			delete newData[value];
			return newData;
		});

	const handleRoleCountChange = (role: string) => {
		return (e: ChangeEvent<HTMLInputElement>) => {
			setAddedRoles(prev => {
				const newData = {...prev};
				newData[role] = Number(e.target.value);
				return newData;
			});
		};
	};

	return (
		<div>
			<div className="flex items-start gap-4">
				<Autocomplete
					label="Roles"
					placeholder="Enter role"
					isLoading={rolesAreFetching}
					defaultItems={roles}
					allowsCustomValue
					scrollRef={scrollRef}
					onOpenChange={setAutocompleteIsOpen}
					inputValue={inputValue}
					onInputChange={setInputValue}
					isInvalid={isInvalid}
					errorMessage={errorMessage}
					isDisabled={isDisabled}
				>
					{item => (
						<AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
					)}
				</Autocomplete>
				<Button
					isIconOnly
					onClick={addRole}
					isDisabled={
						inputValue.length === 0 ||
						Object.keys(addedRoles).includes(inputValue)
					}
					color="primary"
				>
					<PlusIcon className="w-[24px] h-[24px]" />
				</Button>
			</div>
			{addedRoles.length !== 0 ? (
				<div className="flex flex-col gap-4 mt-2">
					{Object.keys(addedRoles).map(role => (
						<div key={role} className="flex gap-2 items-start justify-between">
							<Input
								onChange={handleRoleCountChange(role)}
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
			<input type="hidden" name="roles" value={JSON.stringify(addedRoles)} />
		</div>
	);
};

export default RolesField;
