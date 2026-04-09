import type { Config } from "@/constants/config";
import { createProvider } from "./utils";

type ConfigType = {
	image: string;
	config: Config;
	withDebug?: boolean;
};

export const { provider: ConfigProvider, useValue: useConfig } =
	createProvider<ConfigType>("ConfigProvider");
