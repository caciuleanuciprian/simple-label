import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "./providers/ConfigProvider.tsx";
import { exampleConfig } from "./constants/config.ts";
import image from "@/images/test1.jpg";
import { TooltipProvider } from "./components/ui";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<TooltipProvider>
			<ConfigProvider
				value={{
					image: image,
					config: exampleConfig,
					actions: undefined,
					withDebug: true,
				}}
			>
				<App />
			</ConfigProvider>
		</TooltipProvider>
	</StrictMode>,
);
