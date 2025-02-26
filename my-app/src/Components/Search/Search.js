import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.css';
import { useDebounce } from '../../hooks';
import { selectSearchValue } from '../../selectors';
import { setSearchValue, setDebouncedSearch } from '../../actions';

export const Search = () => {
	const dispatch = useDispatch();
	const searchValue = useSelector(selectSearchValue);
	const debouncedSearchValue = useDebounce(searchValue);

	const searchHandle = (input) => {
		dispatch(setSearchValue(input));
	};

	useEffect(() => {
		dispatch(setDebouncedSearch(debouncedSearchValue));
	}, [debouncedSearchValue, dispatch]);

	return (
		<input
			className={styles.search}
			placeholder="Поиск"
			value={searchValue}
			onChange={(e) => searchHandle(e.target.value)}
		></input>
	);
};
