import React from 'react'
import { NoteScreen } from '../notes/NoteScreen'
import { Sidebar } from './Sidebar'
// import { NothingSelected } from '../auth/NothingSelected'

export const JournalScreen = () => {
	return (
		<div className="journal__main-content">


			<Sidebar />

			<main>

				<NoteScreen />
				{/* <NothingSelected /> */}

			</main>

		</div>
	)
}
