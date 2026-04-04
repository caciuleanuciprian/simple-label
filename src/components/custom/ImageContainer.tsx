import { Canvas } from "./Canvas";

type ImageContainerProps = {
	image: string;
};

export const ImageContainer = (props: ImageContainerProps) => {
	const { image } = props;
	return (
		<div className="bg-gray-300 p-2 ">
			<Canvas image={image} />
		</div>
	);
};
