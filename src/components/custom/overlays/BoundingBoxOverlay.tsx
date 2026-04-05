import { useBoundingBox } from "@/hooks/useBoundingBox";
import React from "react";

type BoundingBoxOverlayProps = {
	width: number;
	height: number;
};

export const BoundingBoxOverlay = (props: BoundingBoxOverlayProps) => {
	const { width, height } = props;
	const overlayCanvasRef = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (!overlayCanvasRef.current) return;
		overlayCanvasRef.current.width = width;
		overlayCanvasRef.current.height = height;
	}, [width, height]);

	useBoundingBox({
		canvasRef: overlayCanvasRef,
	});

	return (
		<canvas
			ref={overlayCanvasRef}
			className="w-full h-full absolute top-0 left-0 z-10"
		/>
	);
};
