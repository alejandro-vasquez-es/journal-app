import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

	const dispatch = useDispatch();
	const { active } = useSelector(state => state.notes);

	const handleSave = () => {
		dispatch(startSaveNote(active));
	}

	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		file && dispatch(startUploading(file));
	}

	return (
		<div className="notes__appbar">
			<span> 16 de febrero del 2022 </span>

			<input
				id="fileSelector"
				type="file"
				style={{ display: 'none' }}
				onChange={handleFileChange}
				name='file'
			/>

			<div className='notes__btn-container'>
				<button
					className='btn'
					onClick={handlePictureClick}
				>
					Picture
				</button>
				<button
					onClick={handleSave}
					className='btn'>
					Save
				</button>
			</div>
		</div>
	)
}
