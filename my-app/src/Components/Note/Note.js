import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Note.module.css';
import {
	selectDebouncedSearch,
	selectIdEdited,
	selectIsUpdating,
	selectIsDeleting,
	selectNotes,
	selectSorting,
	selectTextBeforeEditing,
	selectTextEdited,
	selectIsCompleting,
} from '../../selectors';
import {
	editNote,
	completeNote,
	removeNote,
	setTextEdited,
	setIdEdited,
	setTextBeforeEditing,
	setIsUpdating,
} from '../../actions';

export const Note = () => {
	const dispatch = useDispatch();
	const idEdited = useSelector(selectIdEdited);
	const textBeforeEditing = useSelector(selectTextBeforeEditing);
	const textEdited = useSelector(selectTextEdited);
	const notes = useSelector(selectNotes);
	const debouncedSearch = useSelector(selectDebouncedSearch);
	const sorting = useSelector(selectSorting);
	const isUpdating = useSelector(selectIsUpdating);
	const isDeleting = useSelector(selectIsDeleting);
	const isCompleting = useSelector(selectIsCompleting);

	const handleInputChange = (e) => {
		dispatch(setTextEdited(e.target.value));
	};

	const wantToEdit = (id, text) => {
		dispatch(setIdEdited(id)); //назначаем id заметки, которую хотим редактировать, чтобы при отрисовке использовать его в условии
		dispatch(setTextEdited(text));
		dispatch(setTextBeforeEditing(text));
	};

	const prepareUpdatedNote = (id) => {
		if (textEdited === '' || textEdited.trim() === '') {
			alert('Заметка пустая, введите текст');
			return;
		} else if (textEdited.trim() === textBeforeEditing) {
			console.log('Изменений не зафиксировано');
			dispatch(setIsUpdating(false));
			dispatch(setTextEdited(''));
			dispatch(setIdEdited(null));
			return;
		}

		let updatedNote = '';

		updatedNote = {
			id: id,
			content: textEdited,
		};

		return updatedNote;
	};

	const prepareCompletedNote = (id) => {
		let completedNote = '';

		completedNote = {
			id: id,
			completed: true,
		};

		return completedNote;
	};

	const refForCursor = useRef(null);
	const refForResizing = useRef(null);

	useEffect(() => {
		if (refForCursor.current) {
			let end = refForCursor.current.value.length;
			refForCursor.current.setSelectionRange(end, end); //чтобы курсор встал в конец текста
			refForCursor.current.focus();
		}
	}, [idEdited]);

	const filteredAndSortedNotes = notes
		.filter(
			({ content }) =>
				!debouncedSearch ||
				(content &&
					typeof content === 'string' &&
					content.toLowerCase().includes(debouncedSearch?.toLowerCase())),
		)
		.sort(
			(a, b) =>
				sorting
					? a.content.localeCompare(b.content)
					: a.completed === b.completed
						? 0 // если обе одинаковые по 'completed', не меняем порядок
						: a.completed
							? 1
							: -1, // перемещаем 'completed: true' вниз
		);

	return filteredAndSortedNotes.map(({ id, content, completed }) => (
		<li key={id}>
			<div className={styles.note}>
				<textarea
					className={completed ? styles.completed : null}
					value={idEdited === id ? textEdited : content}
					onChange={handleInputChange}
					onBlur={
						idEdited === id
							? () => dispatch(editNote(prepareUpdatedNote(id)))
							: null
					}
					ref={idEdited === id ? refForCursor : refForResizing}
					disabled={completed || idEdited !== id}
				></textarea>
				{idEdited !== id && !completed && (
					<div className={styles.iconContainer + ' ' + styles.absoluteIcon}>
						<div
							className={styles.editBtn}
							disabled={isUpdating}
							onClick={() => wantToEdit(id, content)}
						>
							&#9998;
						</div>
					</div>
				)}
				<div className={styles.iconsContainer}>
					{!completed && (
						<div className={styles.iconContainer}>
							<div
								className={styles.saveBtn}
								disabled={isCompleting}
								onClick={() =>
									dispatch(completeNote(prepareCompletedNote(id)))
								}
							>
								&#10004;
							</div>
						</div>
					)}
					<div className={styles.iconContainer}>
						<div
							className={styles.deleteBtn}
							disabled={isDeleting}
							onClick={() => dispatch(removeNote(id))}
						>
							&#10008;
						</div>
					</div>
				</div>
			</div>
		</li>
	));
};
