import { SideMenuActions } from "./SideMenuActions";
import { Regions } from "./Regions";
import { Separator } from "@/components/ui";

export const SideMenu = () => {
	return (
		<div className="flex flex-col h-full w-full max-w-125">
			<SideMenuActions />
			<Separator />
			<Regions />
		</div>
	);
};
