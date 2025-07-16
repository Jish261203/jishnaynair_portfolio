"use client";
import { cn } from "@/lib/utils";
import { createContext, useState, useRef, useEffect } from "react";
import { useMouseEnter } from "./useMouseEnter";

export const MouseEnterContext = createContext(undefined);

export const CardContainer = ({ children, className, containerClassName }) => {
	const containerRef = useRef(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);
	const [shadow, setShadow] = useState('0px 8px 32px rgba(0,0,0,0.15)');

	const handleMouseMove = (e) => {
		if (!containerRef.current) return;
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		// Dramatic 3D: increase divisor for more tilt
		const x = (e.clientX - left - width / 2) / 8;
		const y = (e.clientY - top - height / 2) / 8;
		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.07)`;

		// Dynamic shadow
		const shadowX = -x * 2;
		const shadowY = -y * 2;
		setShadow(`${shadowX}px ${40 + shadowY}px 60px 0px rgba(0,0,0,0.25)`);

		// Glare effect
		const glare = containerRef.current.querySelector('.glare');
		if (glare) {
			const px = ((e.clientX - left) / width) * 100;
			const py = ((e.clientY - top) / height) * 100;
			glare.style.setProperty('--glare-x', `${px}%`);
			glare.style.setProperty('--glare-y', `${py}%`);
			glare.style.opacity = '1';
		}
	};

	const handleMouseEnter = () => {
		setIsMouseEntered(true);
		if (!containerRef.current) return;
		containerRef.current.style.transition = 'transform 0.15s cubic-bezier(.17,.67,.83,.67)';
	};

	const handleMouseLeave = () => {
		if (!containerRef.current) return;
		setIsMouseEntered(false);
		containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
		containerRef.current.style.transition = 'transform 0.35s cubic-bezier(.17,.67,.83,.67)';
		setShadow('0px 8px 32px rgba(0,0,0,0.15)');
		const glare = containerRef.current.querySelector('.glare');
		if (glare) glare.style.opacity = '0.5';
	};
	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn(
					"py-20 flex items-center justify-center",
					containerClassName
				)}
				style={{
					perspective: "1200px",
				}}>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(
						"flex items-center justify-center relative transition-all duration-200 ease-linear",
						className
					)}
					style={{
						transformStyle: "preserve-3d",
						boxShadow: shadow,
					}}>
					{children}
				</div>
			</div>
		</MouseEnterContext.Provider>
	);
};

export const CardBody = ({ children, className }) => {
	return (
		<div
			className={cn(
				"h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d] relative overflow-hidden",
				className
			)}>
			{children}
			<div className="glare" />
		</div>
	);
};

export const CardItem = ({
	as: Tag = "div",
	children,
	className,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}) => {
	const ref = useRef(null);
	const [isMouseEntered] = useMouseEnter();

	useEffect(() => {
		if (!ref.current) return;
		if (isMouseEntered) {
			ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		} else {
			ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
		}
	}, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

	return (
		<Tag
			ref={ref}
			className={cn("w-fit transition duration-200 ease-linear", className)}
			{...rest}>
			{children}
		</Tag>
	);
};
