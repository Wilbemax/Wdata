import { create } from 'zustand';
import { Data } from '../App';
import { devtools, persist } from 'zustand/middleware';

interface DataStoreI {
	data: Data[] | [];
	setData: (data: Data) => void;
	removeData: (dataName: string) => void;
	toggleSelected: (dataName: string) => void;
}

export const dataStore = create<DataStoreI>()(
	devtools(
		persist(
			(set) => ({
				data: [],
				setData: (data) =>
					set((state) => ({
						data: [...state.data, data],
					})),
				removeData: (dataName: string) => {
					set((state) => ({
						data: state.data.filter((data) => data.fileName !== dataName),
					}));
				},
				toggleSelected: (dataName: string) => {
					set((state) => ({
						data: state.data.map((item) =>
							item.fileName === dataName
								? { ...item, selected: !item.selected }
								: item
						),
					}));
				},
			}),
			{ name: 'dataStore' }
		)
	)
);
