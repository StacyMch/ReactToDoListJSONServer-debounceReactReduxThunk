export const initialNewNoteInputState = {
	value: '',
	isAdding: false,
};

export const newNoteInputReducer = (state = initialNewNoteInputState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_VALUE': {
			return {
				...state,
				value: payload,
			};
		}
		case 'SET_IS_ADDING': {
			return {
				...state,
				isAdding: payload,
			};
		}
		default:
			return state;
	}
};
