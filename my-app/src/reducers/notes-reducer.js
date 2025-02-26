export const initialNotesState = {
	notes: [],
	isLoading: false,
};

export const notesReducer = (state = initialNotesState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_NOTES': {
			return {
				...state,
				notes: payload,
			};
		}
		case 'ADD_NOTE': {
			return {
				...state,
				notes: [...state.notes, payload],
			};
		}
		case 'EDIT_NOTE': {
			return {
				...state,
				notes: state.notes.map((note) => {
					if (note.id === payload.id) {
						return { ...note, content: payload.content };
					}
					return note;
				}),
			};
		}
		case 'COMPLETE_NOTE': {
			return {
				...state,
				notes: state.notes.map((note) => {
					if (note.id === payload.id) {
						return { ...note, completed: payload.completed };
					}
					return note;
				}),
			};
		}
		case 'DELETE_NOTE': {
			return {
				...state,
				notes: state.notes.filter((note) => note.id !== payload.id),
			};
		}
		case 'IS_LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		default:
			return state;
	}
};
