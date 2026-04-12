import { Button } from "@/components/ui";
import { useConfig } from "@/providers/ConfigProvider";

export const SideMenuActions = () => {
	const { actions } = useConfig();
	if (actions) {
		return actions;
	}

	return (
		<div className="flex w-full h-full ">
			{/* TODO: Change to dropdown menu */}
			<Button>Submit</Button>
			<Button>Submit with Action 1</Button>
			<Button>Submit with Action 2</Button>
		</div>
	);
};
