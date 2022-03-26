import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { Sidebar } from '../../../components/journal/Sidebar';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
	id: 18,
	date: new Date(),
	title: 'TITLE',
	body: 'BODY',
	url: 'https://someplace.com/photo.png'
}

const wrapper = mount(
	<Provider store={store}>
		<JournalEntry {...note} />
	</Provider>
);

describe('tests in <JournalEntry/>', () => {

	test('should display propertly', () => {

		expect(wrapper).toMatchSnapshot();

	});

	test('should activate the note', () => {

		wrapper.find('.journal__entry').simulate('click');

		expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, { ...note }));

	})

})