import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.css';
import { useDebounce } from '../../hooks';
import { selectSearchValue } from '../../selectors';
import { setSearchValue, setDebouncedSearch } from '../../actions';

export const Search = () => {
	const dispatch = useDispatch();
	// const [searchValue, setSearchValue] = useState('');
	const searchValue = useSelector(selectSearchValue);

	const searchHandle = (input) => {
		dispatch(setSearchValue(input));
	};

	dispatch(setDebouncedSearch(useDebounce(searchValue)));

	return (
		<input
			className={styles.search}
			placeholder="Поиск"
			value={searchValue}
			onChange={(e) => searchHandle(e.target.value)}
		></input>
	);
};
