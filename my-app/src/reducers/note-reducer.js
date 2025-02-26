export const initialNoteState = {
	idEdited: null,
	textBeforeEditing: '',
	textEdited: '',
	isDeleting: false,
	isCompleting: false,
	isUpdating: false,
};

export const noteReducer = (state = initialNoteState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_ID_EDITED': {
			return {
				...state,
				idEdited: payload,
			};
		}
		case 'SET_TEXT_BEFORE_EDITING': {
			return {
				...state,
				textBeforeEditing: payload,
			};
		}
		case 'SET_TEXT_EDITED': {
			return {
				...state,
				textEdited: payload,
			};
		}
		case 'IS_COMPLETING': {
			return {
				...state,
				isCompleting: payload,
			};
		}
		case 'IS_UPDATING': {
			return {
				...state,
				isUpdating: payload,
			};
		}
		case 'IS_DELETING': {
			return {
				...state,
				isDeleting: payload,
			};
		}
		default:
			return state;
	}
};
