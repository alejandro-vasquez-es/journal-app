import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
	startGoogleLogin: jest.fn(),
	startLoginEmailPassword: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null
	}
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<LoginScreen />
		</MemoryRouter>
	</Provider>
);


describe('Tests in <LoginScreen />', () => {

	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks()
	});

	test('should display propertly', () => {

		expect(wrapper).toMatchSnapshot();

	});

	test('should dispatch the action with startGoogleLogin', () => {

		wrapper.find('.google-btn').simulate('click');

		expect(startGoogleLogin).toHaveBeenCalled();

	});


	test('should dispatch the startLogin with the arguments', () => {

		const email = 'test@email.com';
		const password = '123456'

		wrapper.find('input[name="email"]').simulate('change', {
			target: {
				name: "email",
				value: email,
			}
		});

		wrapper.find('input[name="password"]').simulate('change', {
			target: {
				name: "password",
				value: password,
			}
		});


		wrapper.find('.auth__form').prop('onSubmit')({
			preventDefault() { }
		});

		expect(startLoginEmailPassword).toHaveBeenCalled();
		expect(startLoginEmailPassword).toHaveBeenCalledWith(email, password);

	});


})