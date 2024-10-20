import { Data } from '../App';

const countElements = (data: Data): number => {
	if (Array.isArray(data)) {
		return data.reduce((total, item) => total + countElements(item), 0);
	} else if (typeof data === 'object' && data !== null) {
		return Object.values(data).reduce(
			(total, value) => total + countElements(value),
			0
		);
	}
	return 1;
};


const countSize = (item: Data): number => {
	return countElements(item);
};

export const mapDataForTable = (data: Data[]) => {
	const newMapData = data.map((item, index) => {
		const parts = item.fileName.split('.');
		const extension = parts.pop();
		const name = parts.join('.');
		const size = countSize(item);

		return {
			key: String(index),
			name: name,
			size: size,
			type: extension!,
		};
	});

	return newMapData;
};
