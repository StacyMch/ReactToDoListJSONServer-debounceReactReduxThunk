import { useSelector, useDispatch } from 'react-redux';
import styles from './Sorting.module.css';
import { selectChecked, selectSorting } from '../../selectors';
import { setChecked, setSorting } from '../../actions';

export const Sorting = () => {
	const dispatch = useDispatch();
	// const [checked, setChecked] = useState(false);
	const checked = useSelector(selectChecked);
	// const { sorting, setSorting } = useContext(SortingContext);
	const sorting = useSelector(selectSorting);

	const toggleAlphabetSorting = () => {
		dispatch(setChecked(checked));
		dispatch(setSorting(sorting));
	};

	return (
		<div className={styles.checkboxContainer}>
			по алфавиту
			<input
				type="checkbox"
				className={styles.check}
				checked={checked}
				onChange={toggleAlphabetSorting}
			/>
		</div>
	);
};
