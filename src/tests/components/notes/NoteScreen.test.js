import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
	activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {
		uid: 'ABCDEF',
		name: 'TESTER'
	},
	ui: {
		loading: false,
		msgError: null
	},
	notes: {
		notes: [{
			id: '123',
			date: 1646876753881,
			title: "TITLE",
			url: "https://res.cloudinary.com/dj54vlrsd/image/upload/v1646877128/su5hfvcu8mkmwn48ca6w.jpg",
			body: 'BODY'
		}],
		active: {
			id: '123',
			date: 1646876753881,
			title: "TITLE",
			url: "https://res.cloudinary.com/dj54vlrsd/image/upload/v1646877128/su5hfvcu8mkmwn48ca6w.jpg",
			body: 'BODY'
		},
	}
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<NoteScreen />
	</Provider>
);


describe('Tests in <NoteScreen />', () => {

	test('should display propertly', () => {

		expect(wrapper).toMatchSnapshot();

	})

	test('should dispatch the activeNote', () => {

		wrapper.find('input[name="title"]').simulate('change', {
			targe: {
				name: 'title',
				value: 'TESTER TITLE'
			}
		});

		expect(activeNote).toHaveBeenLastCalledWith(
			'123', {
			date: 1646876753881,
			id: '123',
			title: "TITLE",
			url: "https://res.cloudinary.com/dj54vlrsd/image/upload/v1646877128/su5hfvcu8mkmwn48ca6w.jpg",
			body: 'BODY'
		}
		);

	})

})