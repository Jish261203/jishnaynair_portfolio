import { useEffect, useMemo } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesContainer = (props) => {
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		});
	}, []);

	const particlesLoaded = (container) => {
		console.log(container);
	};

	const options = useMemo(
        () => ({
            fullscreen:{enable:false},
			background: {
				color: {
					value: "transparent",
				},
			},
			fpsLimit: 120,
			interactivity: {
				detectsOn: "window",
				events: {
					onClick: {
						enable: true,
						mode: "repulse",
					},
					onHover: {
						enable: true,
						mode: "repulse",
					},
				},
				modes: {
					repulse: {
						distance: 100,
						duration: 0.4,
						speed: 1,
					},
				},
			},
			particles: {
				color: {
					value: "#FFFFFF",
				},
				links: {
					color: "#FFFFFF",
					distance: 150,
					enable: true,
					opacity: 0.3,
					width: 1,
				},
				move: {
					direction: "none",
					enable: true,
					outModes: {
						default: "bounce",
					},
					random: true,
					speed: 1,
					straight: false,
				},
				number: {
					density: {
						enable: true,
					},
					value: 150,
				},
				opacity: {
					value: 0.3,
				},
				shape: {
					type: "circle",
				},
				size: {
					value: { min: 1, max: 3 },
				},
			},
			detectRetina: true,
		}),
		[]
	);

	return (
		<div className="particles-container">
			<Particles id={props.id} init={particlesLoaded} options={options} />
		</div>
	);
};

export default ParticlesContainer;
