import { useBoundingBox } from "@/hooks/useBoundingBox";
import React from "react";
import type { ActionsRef } from "../Actions";

type BoundingBoxOverlayProps = {
	width: number;
	height: number;
};

export const BoundingBoxOverlay = React.forwardRef<
	ActionsRef,
	BoundingBoxOverlayProps
>((props, ref) => {
	const { width, height } = props;
	const overlayCanvasRef = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (!overlayCanvasRef.current) return;
		overlayCanvasRef.current.width = width;
		overlayCanvasRef.current.height = height;
	}, [width, height]);

	const {
		handleDragStart,
		handleDragEnd,
		handleDragOverlay,
		handleDragOutside,
		handleSelectBoundingBox,
		clearAll,
		clearSelected,
	} = useBoundingBox({
		canvasRef: overlayCanvasRef,
	});

	React.useImperativeHandle(
		ref,
		() => ({
			clearAnnotations: () => {
				clearAll();
			},
			clearSelectedAnnotation: () => {
				clearSelected();
			},
		}),
		[clearAll, clearSelected],
	);

	return (
		<canvas
			ref={overlayCanvasRef}
			className="w-full h-full absolute top-0 left-0 z-10"
			onMouseDown={handleDragStart}
			onMouseMove={handleDragOverlay}
			onMouseUp={handleDragEnd}
			onMouseLeave={handleDragOutside}
			onClick={handleSelectBoundingBox}
		/>
	);
});
