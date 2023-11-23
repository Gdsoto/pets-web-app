import { useEffect, useState } from 'react';

const useAnimation = (time) => {
	const [animation, setAnimation] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAnimation(false);
		}, time);
	}, [time]);
	return {
		animation,
	};
};

export default useAnimation;
