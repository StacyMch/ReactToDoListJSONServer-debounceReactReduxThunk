import { createNote } from '../api';
import { setIsAdding, setNewNoteInputValue } from '../actions';

export const addNote = (createdNote) => {
	return async (dispatch) => {
		dispatch(setIsAdding(true));

		try {
			const newNote = await createNote(createdNote);
			dispatch({
				type: 'ADD_NOTE',
				payload: { ...createdNote, ...newNote },
			});
		} catch (error) {
			console.error('Ошибка при добавлении заметки:', error);
		} finally {
			dispatch(setIsAdding(false));
			dispatch(setNewNoteInputValue(''));
		}
	};
};
