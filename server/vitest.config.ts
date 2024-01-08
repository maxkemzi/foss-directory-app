import {defineConfig} from "vitest/config";

export default defineConfig({
	test: {
		globalSetup: "./__tests__/globalSetup.js",
		setupFiles: ["./__tests__/setup.js"],
		poolOptions: {
			forks: {
				singleFork: true
			}
		}
	}
});
