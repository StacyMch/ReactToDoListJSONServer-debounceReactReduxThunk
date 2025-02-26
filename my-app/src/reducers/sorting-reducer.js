export const initialSortingState = {
	sorting: false,
	checked: false,
};

export const sortingReducer = (state = initialSortingState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_SORTING': {
			return {
				...state,
				sorting: payload,
			};
		}
		case 'SET_CHECKED': {
			return {
				...state,
				checked: payload,
			};
		}
		default:
			return state;
	}
};
