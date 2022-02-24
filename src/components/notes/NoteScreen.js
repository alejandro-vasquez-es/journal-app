import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
	return (
		<div className="notes__main-content">

			<NotesAppBar />

			<div className='notes__content'>

				<input
					type="text"
					placeholder="jijijajaja"
					className="notes__title-input"
				/>

				<textarea
					placeholder='what happened today'
					className='notes__textarea'
				>

				</textarea>

				<div className='notes__image'>
					<img
						alt='landcape'
						src='https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
					/>
				</div>

			</div>

		</div>
	)
}
