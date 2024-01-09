import {defineConfig} from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		globals: true,
		globalSetup: "./__tests__/globalSetup.ts",
		setupFiles: ["./__tests__/setup.ts"],
		poolOptions: {
			forks: {
				singleFork: true
			}
		}
	},
	plugins: [tsconfigPaths()]
});
