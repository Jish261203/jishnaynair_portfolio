import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	envPrefix: "REACT_APP_",
	plugins: [react(), envCompatible()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), // Add alias for '@' to point to 'src' directory
		},
	},
});
