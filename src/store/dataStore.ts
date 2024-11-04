import { create } from 'zustand';
import { Data } from '../App';
import { devtools, persist } from 'zustand/middleware';

interface DataStoreI {
	data: Data[] | [];
	setData: (data: Data) => void;
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
			}),
			{ name: 'dataStore' }
		)
	)
);
