import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout());

	}

	return (
		<aside className='journal__sidebar'>

			<div className="journal__sidebar-navbar">

				<h1 className=' journal__sidebar-navbar-title mt-5'>
					<i className="far fa-moon"></i>
					<span>  Alejandro</span>
				</h1>

				<button
					className='btn'
					onClick={handleLogout}
				>
					Logout
				</button>

			</div>

			<div className="journal__new-entry">

				<i className="far fa-calendar-plus fa-5x"></i>
				<p className="mt-5 mb-5">
					New entry
				</p>

			</div>

			<JournalEntries />

		</aside>
	)
}
