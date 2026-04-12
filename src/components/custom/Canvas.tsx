import React from "react";
import { BoundingBoxOverlay } from "./overlays/BoundingBoxOverlay";
import { CanvasActions, type ActionsRef } from "./CanvasActions";

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

	// TODO: Replace with Context for better state management

	const actionsRef = React.useRef<ActionsRef>(null);

	const clearAnnotations = () => {
		actionsRef.current?.clearAnnotations();
	};

	const clearSelectedAnnotation = () => {
		actionsRef.current?.clearSelectedAnnotation();
	};

	return (
		<div style={{ width: width, height: height }} className="rounded relative">
			<CanvasActions
				clearAnnotations={clearAnnotations}
				clearSelectedAnnotation={clearSelectedAnnotation}
			/>
			<BoundingBoxOverlay ref={actionsRef} width={width} height={height} />
			<canvas ref={canvasRef} className="w-full h-full relative" />
		</div>
	);
};
