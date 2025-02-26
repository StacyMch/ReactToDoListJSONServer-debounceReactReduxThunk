import { updateNote } from '../api';
import { setIsCompleting } from '../actions';

export const completeNote = (id) => {
	return async (dispatch) => {
		dispatch(setIsCompleting(true));

		try {
			const completedNote = await updateNote(id);
			console.log(completedNote);
			dispatch({
				type: 'COMPLETE_NOTE',
				payload: completedNote,
			});
		} catch (error) {
			console.error('Ошибка при завершении заметки:', error);
		} finally {
			dispatch(setIsCompleting(false));
		}
	};
};
