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
}

export function FeatureCard({
	id,
	x,
	y,
	content,
	currentScale,
}: FeatureCardProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x / currentScale}px, ${
					transform.y / currentScale
				}px, 0)`,
		  }
		: undefined;

	return (
		<Card
			ref={setNodeRef}
			id={id}
			className="absolute p-4 w-64 cursor-move bg-white shadow-lg hover:shadow-xl transition-shadow"
			style={{ ...style, top: y, left: x }}
			{...attributes}
			{...listeners}
		>
			<div className="font-medium">{content}</div>
		</Card>
	);
}
