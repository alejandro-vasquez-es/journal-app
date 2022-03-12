import React from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

	const dispatch = useDispatch();
	const noteDate = moment(date);

	const handleEntryClick = () => {
		dispatch(activeNote(id, { date, title, body, url }));
	}

	return (
		<div
			className='journal__entry  animate__animated animate__slideInLeft animate__faster'
			onClick={handleEntryClick}
		>

			{
				url &&
				<div
					className='journal__entry-picture'
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url(${url})`,
						backgroundPosition: 'center'
					}}
				>

				</div>
			}

			<div className='journal__entry-body'>
				<p className='journal__entry-title'>
					{title ? title : 'Untitled'}
				</p>
				<p className='journal__entry-content'>
					{body}
				</p>
			</div>

			<div className='journal__entry-date-box'>
				<p>{noteDate.format('dddd')}</p>
				<span>{noteDate.format('DD')}</span>
			</div>

		</div>
	)
}
