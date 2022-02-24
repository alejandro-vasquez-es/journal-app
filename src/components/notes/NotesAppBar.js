import React from 'react'

export const NotesAppBar = () => {
	return (
		<div className="notes__appbar">
			<span> 16 de febrero del 2022 </span>

			<div className='notes__btn-container'>
				<button className='btn'>
					Picture
				</button>
				<button className='btn'>
					Save
				</button>
			</div>
		</div>
	)
}
