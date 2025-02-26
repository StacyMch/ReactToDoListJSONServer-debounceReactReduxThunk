import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDebouncedSearch } from '../selectors';
import { setDebouncedSearch } from '../actions';

export const useDebounce = (value, delay = 1000) => {
	const dispatch = useDispatch();
	const debouncedValue = useSelector(selectDebouncedSearch);

	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch(setDebouncedSearch(value));
		}, delay);
		return () => clearTimeout(timeout);
	}, [value, delay, dispatch]);

	return debouncedValue;
};
