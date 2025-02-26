export const initialSearchState = {
	searchValue: '',
	debouncedSearch: '',
};

export const searchReducer = (state = initialSearchState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_SEARCH_VALUE': {
			return {
				...state,
				searchValue: payload,
			};
		}
		case 'SET_DEBOUNCED_SEARCH': {
			return {
				...state,
				debouncedSearch: payload,
			};
		}
		default:
			return state;
	}
};
