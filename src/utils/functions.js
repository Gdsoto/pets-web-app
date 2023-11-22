export const changeIdToLabel = (objects) =>
	objects.map(({ id, name }) => ({
		value: id,
		label: name,
	}));
