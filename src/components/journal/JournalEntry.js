import React from 'react'

export const JournalEntry = () => {
	return (
		<div className='journal__entry'>

			<div
				className='journal__entry-picture'
				style={{
					backgroundSize: 'cover',
					backgroundImage: 'url(https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
					backgroundPosition: 'center'
				}}
			>

			</div>

			<div className='journal__entry-body'>
				<p className='journal__entry-title'>
					Un nuevo día
				</p>
				<p className='journal__entry-content'>
					Labore in ipsum veniam enim aliqua excepteur aute adipisicing cupidatat et incididunt.
				</p>
			</div>

			<div className='journal__entry-date-box'>
				<p>Monday</p>
				<span>28</span>
			</div>

		</div>
	)
}
