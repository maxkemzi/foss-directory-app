const checkEnvVars = (vars: Record<string, string | undefined>) => {
	Object.entries(vars).forEach(([key, value]) => {
		if (!value) {
			throw new Error(`${key} environment variable is not set.`);
		}
	});
};

export default checkEnvVars;
