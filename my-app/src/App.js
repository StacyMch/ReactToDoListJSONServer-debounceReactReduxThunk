import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading } from './selectors';
import { setNotes } from './actions';
import { NewNoteInput, Note, Search, Sorting } from './Components';
import styles from './App.module.css';

export const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setNotes());
	}, [dispatch]);

	const isLoading = useSelector(selectIsLoading);

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<h1>Список дел</h1>
				<div className={styles.filter}>
					<Search />
					<Sorting />
				</div>
				<div className={styles.wrapper}>
					<div className={styles.noteInput}>
						<NewNoteInput />
					</div>
					<ul className={styles.notesContainer}>
						{isLoading ? <div className={styles.loader}></div> : <Note />}
					</ul>
				</div>
			</div>
		</div>
	);
};
