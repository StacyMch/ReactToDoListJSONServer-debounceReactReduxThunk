import { updateNote } from '../api';
import { setIsUpdating } from '../actions';

export const editNote = (updatedNote) => {
	return async (dispatch) => {
		if (!updatedNote) {
			return;
		}
		dispatch(setIsUpdating(true));

		try {
			const editedNote = await updateNote(updatedNote);
			dispatch({
				type: 'EDIT_NOTE',
				payload: editedNote,
			});
		} catch (error) {
			console.error('Ошибка при обновлении заметки:', error);
		} finally {
			dispatch(setIsUpdating(false));
		}
	};
};
