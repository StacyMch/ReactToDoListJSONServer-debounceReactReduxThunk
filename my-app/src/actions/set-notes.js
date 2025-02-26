import { readNotes } from '../api';
import { setIsLoading } from './set-is-loading';

export const setNotes = () => {
	return async (dispatch) => {
		dispatch(setIsLoading(true));
		try {
			const loadedNotes = await readNotes();
			dispatch({
				type: 'SET_NOTES',
				payload: loadedNotes,
			});
		} catch (error) {
			console.error('Ошибка при загрузке заметок:', error);
		} finally {
			dispatch(setIsLoading(false));
		}
	};
};

// export const setNotes = (notes) => ({
// 	type: 'SET_NOTES',
// 	payload: notes,
// });
