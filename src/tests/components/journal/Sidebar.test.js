import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth'
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
	startLogout: jest.fn()
}));
jest.mock('../../../actions/notes', () => ({
	startNewNote: jest.fn()
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
		active: null,
	}
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<Sidebar />
		</MemoryRouter>
	</Provider>
);

describe('Tests in <Sidebar />', () => {

	test('should display propertly', () => {

		expect(wrapper).toMatchSnapshot();

	})

	test('should call the startLogout', () => {

		wrapper.find('button').simulate('click');

		expect(startLogout).toHaveBeenCalled();

	});

	test('should call the startNewNote', () => {

		wrapper.find('.journal__new-entry').simulate('click');

		expect(startNewNote).toHaveBeenCalled();

	})

})