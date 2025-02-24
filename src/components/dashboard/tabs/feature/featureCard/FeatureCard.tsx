"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
	id: string;
	x: number;
	y: number;
	content: string;
	currentScale: number;
	isBeingDragged?: boolean;
}

export function FeatureCard({
	id,
	x,
	y,
	content,
	currentScale,
	isBeingDragged = false,
}: FeatureCardProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
	});

	const style = {
		left: x,
		top: y,
		transition: isBeingDragged ? "none" : "transform 0.2s ease",
		zIndex: isBeingDragged ? 10 : 1,
	};

	return (
		<Card
			ref={setNodeRef}
			id={id}
			className="absolute p-4 w-64 cursor-move bg-white shadow-lg hover:shadow-xl"
			style={style}
			{...listeners}
			{...attributes}
		>
			<div className="font-medium">{content}</div>
		</Card>
	);
}
