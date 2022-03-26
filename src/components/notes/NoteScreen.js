import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForms';
import { NotesAppBar } from './NotesAppBar'
import { useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import Swal from 'sweetalert2';

export const NoteScreen = () => {

	const dispatch = useDispatch();

	const { active: note } = useSelector(state => state.notes);
	const [formValues, handleInputchange, reset] = useForm(note);
	const { body, title, url, id } = formValues;
	const activeId = useRef(note.id);
	const activeUrl = useRef(note.url);

	useEffect(() => {

		if (note.id !== activeId.current) {
			reset(note);
			activeId.current = note.id;
		}
		if (note.url !== activeUrl.current) {
			reset(note);
			activeUrl.current = note.url;
		}

	}, [note, reset]);

	useEffect(() => {
		dispatch(activeNote(formValues.id, { ...formValues }));

	}, [formValues, dispatch]);

	const handleDelete = () => {
		Swal.fire({
			title: 'Do you want to delete this note?',
			icon: 'warning',
			showDenyButton: true,
			confirmButtonText: 'Do not! Save it!',
			denyButtonText: `Yes, delete`,
		}).then((result) => {
			if (!result.isConfirmed) {

				dispatch(startDeleting(id));

				Swal.fire('your note has been deleted successfully', '', 'success')
			}
		});


	}

	return (
		<div className="notes__main-content">

			<NotesAppBar />

			<div className='notes__content'>

				<input
					type="text"
					placeholder="Title"
					className="notes__title-input"
					value={title}
					name="title"
					onChange={handleInputchange}
				/>

				<textarea
					placeholder='what happened today'
					className='notes__textarea'
					value={body}
					name="body"
					onChange={handleInputchange}
				>

				</textarea>
				<div className="notes__container">
					{url &&
						(<div className='notes__image'>
							<img
								alt='landcape'
								src={url}
							/>
						</div>)
					}

					<i
						className="fa-solid fa-trash-can notes__delete"
						onClick={handleDelete}
					/>
				</div>


			</div>


		</div>
	)
}
