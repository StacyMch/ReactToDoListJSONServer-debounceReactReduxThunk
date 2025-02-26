import styles from './NewNoteInput.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectNewNoteInput, selectIsAdding } from '../../selectors';
import { setNewNoteInputValue, addNote } from '../../actions';

export const NewNoteInput = () => {
	const dispatch = useDispatch();
	const value = useSelector(selectNewNoteInput);
	const isAdding = useSelector(selectIsAdding);

	const handleInputChange = (e) => {
		dispatch(setNewNoteInputValue(e.target.value));
	};

	const prepareNewNote = () => {
		if (value === '' || value.trim() === '') {
			alert('Заметка пустая, введите текст');
			return;
		}

		let newNote = '';

		newNote = {
			content: value,
			completed: false,
		};

		return newNote;
	};

	return (
		<div className={styles.addContainer}>
			<div className={styles.iconContainer}>
				<div
					className={styles.saveBtn}
					disabled={isAdding}
					onClick={() => dispatch(addNote(prepareNewNote()))}
				>
					&#10009;
				</div>
			</div>
			<textarea
				onChange={handleInputChange}
				value={value}
				placeholder="Добавить задачу..."
			></textarea>
			{value && (
				<div className={styles.iconsContainer}>
					<div className={styles.iconContainer}>
						<div
							className={styles.deleteBtn}
							onClick={() => dispatch(setNewNoteInputValue(''))}
						>
							&#10008;
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
