import React from "react";

type UseBoundingBoxProps = {
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

type BoundingBox = {
	id: number;
	x: number;
	y: number;
	width: number;
	height: number;
};

export const useBoundingBox = (props: UseBoundingBoxProps) => {
	const { canvasRef } = props;
	const [dragging, setDragging] = React.useState(false);
	const [boundingBoxes, setBoundingBoxes] = React.useState<BoundingBox[]>([]);
	const [dragStart, setDragStart] = React.useState<Pick<
		BoundingBox,
		"x" | "y"
	> | null>(null);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		const clearCanvas = () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
		};

		const redrawCanvas = () => {
			console.log("Redrawing canvas with bounding boxes:", boundingBoxes);
			clearCanvas();

			boundingBoxes.forEach(function (box) {
				context.strokeStyle = "red";
				context.lineWidth = 2;
				context.strokeRect(box.x, box.y, box.width, box.height);
			});
		};

		const handleDragStart = (event: MouseEvent) => {
			console.log("Starting drag...");
			setDragging(true);
			const rect = canvas.getBoundingClientRect();
			console.log("Canvas rect:", rect);
			const startX = event.clientX - rect.left;
			const startY = event.clientY - rect.top;
			setDragStart({
				x: startX,
				y: startY,
			});
		};

		const handleDragEnd = (event: MouseEvent) => {
			console.log("Ending drag...", dragStart);
			setDragging(false);
			const rect = canvas.getBoundingClientRect();
			const endX = event.clientX - rect.left;
			const endY = event.clientY - rect.top;
			if (!dragStart) return;
			const diff = {
				x: endX - dragStart.x,
				y: endY - dragStart.y,
			};
			const boundingBox = {
				id: boundingBoxes.length,
				x: dragStart.x,
				y: dragStart.y,
				width: diff.x,
				height: diff.y,
			};
			boundingBoxes.push(boundingBox);
			setBoundingBoxes((prev) => [...prev, boundingBox]);
			setDragStart(null);
			redrawCanvas();
		};

		const handleDragOverlay = (event: MouseEvent) => {
			if (!dragging || !dragStart) return;
			const rect = canvas.getBoundingClientRect();
			const currentPos = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			};
			const diff = {
				x: currentPos.x - dragStart.x,
				y: currentPos.y - dragStart.y,
			};
			redrawCanvas();
			context.save();
			context.beginPath();
			context.lineWidth = 0.5;
			context.setLineDash([7, 2]);
			context.rect(dragStart.x, dragStart.y, diff.x, diff.y);
			context.strokeStyle = "rgb(255, 82, 0)";
			context.stroke();
			context.restore();
		};

		const handleDragOutside = (_event: MouseEvent) => {
			console.log("Dragging outside...");
			if (!dragging) return;
			setDragging(false);
			redrawCanvas();
			setDragStart(null);
		};

		canvas.addEventListener("mousedown", handleDragStart);
		canvas.addEventListener("mouseup", handleDragEnd);
		canvas.addEventListener("mousemove", handleDragOverlay);
		canvas.addEventListener("mouseleave", handleDragOutside);
		return () => {
			canvas.removeEventListener("mousedown", handleDragStart);
			canvas.removeEventListener("mouseup", handleDragEnd);
			canvas.removeEventListener("mousemove", handleDragOverlay);
			canvas.removeEventListener("mouseleave", handleDragOutside);
		};
	}, [dragging, dragStart, canvasRef.current, boundingBoxes]);
};
