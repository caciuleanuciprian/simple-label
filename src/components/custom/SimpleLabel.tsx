import type { Config } from "@/constants/config";
import { ImageContainer, Tasks } from "@/components/custom";

type SimpleLabelProps = {
	image: string;
	config: Config;
};

export const SimpleLabel = (props: SimpleLabelProps) => {
	const { image, config } = props;
	return (
		<div>
			<ImageContainer image={image} />
			<Tasks config={config} />
		</div>
	);
};
