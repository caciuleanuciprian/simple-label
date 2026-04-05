import { useBoundingBox } from "@/hooks/useBoundingBox";
import React from "react";
import { BoundingBoxOverlay } from "./overlays/BoundingBoxOverlay";

type CanvasProps = {
	image: string;
	width?: number;
	height?: number;
};

export const Canvas = (props: CanvasProps) => {
	const { image, width = 500, height = 500 } = props;
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);

	React.useEffect(() => {
		if (!canvasRef.current) return;
		const context = canvasRef.current.getContext("2d");
		contextRef.current = context;
		if (!context) return;

		const img = new Image(width, height);
		img.src = image;
		img.onload = () => {
			if (!canvasRef.current) return;
			canvasRef.current.width = img.width;
			canvasRef.current.height = img.height;
			context.drawImage(img, 0, 0, img.width, img.height);
		};
	}, [image, width, height]);

	return (
		<div style={{ width: width, height: height }} className="rounded relative">
			<BoundingBoxOverlay width={width} height={height} />
			<canvas ref={canvasRef} className="w-full h-full relative" />
		</div>
	);
};
