const convertFormDataToObject = <T>(formData: FormData) => {
	return Array.from(formData.entries()).reduce<Partial<T>>((prev, curr) => {
		let [key, value] = curr;

		try {
			value = JSON.parse(value.toString());
		} catch (e) {
			value = value.toString();
		}

		return {...prev, [key]: value};
	}, {});
};

export {convertFormDataToObject};
