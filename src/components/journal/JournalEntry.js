import React from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

	const dispatch = useDispatch();
	const noteDate = moment(date);

	const goToActiveNote = (duration) => {
		const targetPosition = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		var startPosition = window.pageYOffset;
		var distance = targetPosition - startPosition;
		var startTime = null;

		function animation(currentTime) {
			if (startTime === null) startTime = currentTime;
			var timeElapsed = currentTime - startTime;
			var run = easeOutExpo(timeElapsed, startPosition, distance, duration);
			window.scroll(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		}

		function easeOutExpo(t, b, c, d) {
			return c * (-Math.pow(2, -10 * t / d) + 1) + b - 16;
		}

		requestAnimationFrame(animation);
	}

	const handleEntryClick = () => {
		dispatch(activeNote(id, { date, title, body, url }));
		goToActiveNote(500);
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
