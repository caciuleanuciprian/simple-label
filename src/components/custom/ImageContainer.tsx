import { Canvas } from "./Canvas";
import { useConfig } from "@/providers/ConfigProvider";

export const ImageContainer = () => {
	const { image } = useConfig();

	return (
		<div className="bg-gray-300 p-2 w-fit h-fit">
			<Canvas image={image} />
		</div>
	);
};
