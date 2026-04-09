import React from "react";
import {
	drawBox,
	drawBoxOverlay,
	drawBoxSelected,
	loadConfigAnnotations,
} from "./utils";
import { randomUUID } from "@/utils/general";
import { useActions } from "@/providers/ActionsProvider";
import type { Config, ObjectDetectionTaskValue } from "@/constants/config";

type UseBoundingBoxProps = {
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	config: Config;
	withDebug?: boolean;
};

// type BoundingBox = {
// 	id: string;
// 	x: number;
// 	y: number;
// 	width: number;
// 	height: number;
// };

export const useBoundingBox = (props: UseBoundingBoxProps) => {
	const { annotations } = useActions();
	const { canvasRef, config, withDebug } = props;
	const [dragging, setDragging] = React.useState(false);
	const [boundingBoxes, setBoundingBoxes] = React.useState<
		ObjectDetectionTaskValue[]
	>(
		loadConfigAnnotations(
			config,
			"OBJECT_DETECTION",
		) as ObjectDetectionTaskValue[],
	);
	const [dragStart, setDragStart] = React.useState<Pick<
		ObjectDetectionTaskValue,
		"x" | "y"
	> | null>(null);
	const [selectedBoundingBox, setSelectedBoundingBox] =
		React.useState<ObjectDetectionTaskValue | null>(null);

	const clearAllCanvas = () => {
		setSelectedBoundingBox(null);
		setBoundingBoxes([]);
		clearCanvas();
	};

	const clearSelectedAnnotation = () => {
		if (!selectedBoundingBox) return;
		setBoundingBoxes((prev) =>
			prev.filter((box) => box.id !== selectedBoundingBox.id),
		);
		setSelectedBoundingBox(null);
		redrawCanvas();
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	const redrawCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		clearCanvas();

		const filteredBoundingBoxes = boundingBoxes.filter(
			(box) => box.id !== selectedBoundingBox?.id,
		);

		if (selectedBoundingBox) {
			drawBoxSelected(context, selectedBoundingBox, "blue", 2, withDebug);
		}
		filteredBoundingBoxes.forEach((box) => {
			drawBox(context, box, "red", 2, withDebug);
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Intended
	React.useEffect(() => {
		redrawCanvas();
		annotations.setNumOfAnnotations(boundingBoxes.length);
		annotations.setSelectedAnnotation(selectedBoundingBox);
	}, [boundingBoxes, selectedBoundingBox]);

	const handleDragCreateStart = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) return;
		setDragging(true);
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const startX = event.clientX - rect.left;
		const startY = event.clientY - rect.top;
		setDragStart({
			x: startX,
			y: startY,
		});
	};

	const handleDragCreateEnd = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) return;
		setDragging(false);
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const endX = event.clientX - rect.left;
		const endY = event.clientY - rect.top;
		if (!dragStart) return;
		const diff = {
			x: endX > dragStart.x ? endX - dragStart.x : dragStart.x - endX,
			y: endY > dragStart.y ? endY - dragStart.y : dragStart.y - endY,
		};
		const boundingBox = {
			id: randomUUID(),
			x: dragStart.x > endX ? endX : dragStart.x,
			y: dragStart.y > endY ? endY : dragStart.y,
			width: diff.x,
			height: diff.y,
		};
		if (boundingBox.width < 1 || boundingBox.height < 1) {
			setDragStart(null);
			return;
		}
		setBoundingBoxes((prev) => [...prev, boundingBox]);
		setDragStart(null);
		redrawCanvas();
	};

	const handleDragCreateOverlay = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) return;
		if (!dragging || !dragStart) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
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
		const context = canvas.getContext("2d");
		if (!context) return;
		drawBoxOverlay(
			context,
			{
				x: dragStart.x,
				y: dragStart.y,
				width: diff.x,
				height: diff.y,
			},
			"red",
			2,
			withDebug,
		);
	};

	const handleDragCreateOutside = (
		_event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) return;
		if (!dragging) return;
		setDragging(false);
		redrawCanvas();
		setDragStart(null);
	};

	// BUG: If user drags box over another box, the other box will be selected.
	const handleSelectBoundingBox = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const clickY = event.clientY - rect.top;
		const selectedBox = boundingBoxes.find(
			(box) =>
				clickX >= box.x &&
				clickX <= box.x + box.width &&
				clickY >= box.y &&
				clickY <= box.y + box.height,
		);
		if (selectedBox) {
			setSelectedBoundingBox(selectedBox);
		} else {
			setSelectedBoundingBox(null);
		}
	};

	const isMouseOnSelectedBox = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (!selectedBoundingBox) return false;
		const canvas = canvasRef.current;
		if (!canvas) return false;
		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;
		return (
			mouseX >= selectedBoundingBox.x &&
			mouseX <= selectedBoundingBox.x + selectedBoundingBox.width &&
			mouseY >= selectedBoundingBox.y &&
			mouseY <= selectedBoundingBox.y + selectedBoundingBox.height
		);
	};

	const handleDragSelectedStart = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (!selectedBoundingBox || !isMouseOnSelectedBox(event)) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const startX = event.clientX - rect.left;
		const startY = event.clientY - rect.top;
		setDragStart({
			x: startX,
			y: startY,
		});
	};

	const handleDragSelectedEnd = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (!selectedBoundingBox || !dragStart) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const endX = event.clientX - rect.left;
		const endY = event.clientY - rect.top;
		const diff = {
			x: endX - dragStart.x,
			y: endY - dragStart.y,
		};
		const updatedBox = {
			...selectedBoundingBox,
			x: selectedBoundingBox.x + diff.x,
			y: selectedBoundingBox.y + diff.y,
		};
		setBoundingBoxes((prev) =>
			prev.map((box) => (box.id === selectedBoundingBox.id ? updatedBox : box)),
		);
		setSelectedBoundingBox(updatedBox);
		setDragStart(null);
	};

	const handleDragSelectedOverlay = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (!selectedBoundingBox || !dragStart) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
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
		drawBoxOverlay(
			context,
			{
				x: selectedBoundingBox.x + diff.x,
				y: selectedBoundingBox.y + diff.y,
				width: selectedBoundingBox.width,
				height: selectedBoundingBox.height,
			},
			"blue",
			2,
			withDebug,
		);
	};

	const handleDragSelectedOutside = (
		_event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (!selectedBoundingBox) return;
		setDragStart(null);
		redrawCanvas();
	};

	const handleDragStart = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) {
			handleDragSelectedStart(event);
		} else {
			handleDragCreateStart(event);
		}
	};

	const handleDragEnd = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) {
			handleDragSelectedEnd(event);
		} else {
			handleDragCreateEnd(event);
		}
	};

	const handleDragOverlay = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) {
			handleDragSelectedOverlay(event);
		} else {
			handleDragCreateOverlay(event);
		}
	};

	const handleDragOutside = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (selectedBoundingBox) {
			handleDragSelectedOutside(event);
		} else {
			handleDragCreateOutside(event);
		}
	};

	return {
		handleDragStart,
		handleDragEnd,
		handleDragOverlay,
		handleDragOutside,
		handleSelectBoundingBox,
		clearAll: clearAllCanvas,
		clearSelected: clearSelectedAnnotation,
		selectedBoundingBox,
	};
};
