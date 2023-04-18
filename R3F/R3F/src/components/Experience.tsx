import { useRef } from 'react';

import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

extend({ OrbitControls });

export default function Experience() {
	const three = useThree();
	const cubeRef = useRef();
	const groupRef = useRef();
	useFrame((state, delta) => {
		cubeRef.current.rotation.x += delta;
		//groupRef.current.rotation.y += delta;
	});
// console.log comment
	return (
		<>
			{/* <OrbitControls /> */}
			<group ref={groupRef}>
				<mesh position-x={-2}>
					<sphereGeometry />
					<meshBasicMaterial color='orange' />
				</mesh>
				<mesh
					ref={cubeRef}
					rotation={[0, Math.PI * 0.25, 0]}
					position-x={2}
					scale={1.5}
				>
					<boxGeometry args={[1.4, 1, 1]} />
					<meshBasicMaterial args={[{ color: 'blue' }]} />
				</mesh>
			</group>

			<mesh rotation-x={-Math.PI * 0.45} position-y={-1} scale={10}>
				<planeGeometry />
				<meshBasicMaterial args={[{ color: 'green' }]} />
			</mesh>
		</>
	);
}
