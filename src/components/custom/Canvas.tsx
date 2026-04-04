import React from "react";

type CanvasProps = {
	image: string;
	width?: number;
	height?: number;
};

export const Canvas = (props: CanvasProps) => {
	const { image, width = 500, height = 500 } = props;
	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (!canvas.current) return;
		const context = canvas.current.getContext("2d");
		if (!context) return;

		const img = new Image(width, height);
		img.src = image;
		img.onload = () => {
			canvas.current!.width = img.width;
			canvas.current!.height = img.height;
			context.drawImage(img, 0, 0, img.width, img.height);
		};
	}, [image, width, height]);

	return <canvas ref={canvas} className={`w-${width} h-${height} rounded`} />;
};
