import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { firebase } from '../../firebase/firebase-config'
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
	login: jest.fn(),
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null
	},
	notes: {
		active: {
			id: 'ABC'
		},
		notes: []
	}
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests in <AppRouter', () => {

	test('should call the login if it\'s authenticated', async () => {

		let user;

		await act(async () => {

			const userCred = await firebase.auth().signInWithEmailAndPassword('test@email.com', '123456');
			user = userCred.user;

			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
		})

		expect(login).toHaveBeenCalledWith('FtdFZ3tvH9NQSShX1WKD6jEPoVN2', null);

	})

})