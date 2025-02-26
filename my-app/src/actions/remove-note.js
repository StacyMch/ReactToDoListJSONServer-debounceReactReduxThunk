import { deleteNote } from '../api';
import { setIsDeleting } from '.';

export const removeNote = (id) => {
	return async (dispatch) => {
		dispatch(setIsDeleting(true));

		try {
			await deleteNote(id);
			dispatch({
				type: 'DELETE_NOTE',
				payload: { id: id },
			});
		} catch (error) {
			console.error('Ошибка при удалении заметки:', error);
		} finally {
			dispatch(setIsDeleting(false));
		}
	};
};
