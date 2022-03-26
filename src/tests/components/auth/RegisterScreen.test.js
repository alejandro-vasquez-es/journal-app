import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { types } from '../../../types/types';

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
const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe('Tests in <RegisterScreen />', () => {


	test('should display propertly', () => {

		expect(wrapper).toMatchSnapshot();

	});

	test('should dispatch the needed action', () => {

		wrapper.find('.auth__form').simulate('submit', {
			preventDefault() { }
		});

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiSetError,
			payload: 'Name is require'
		})
	})

	test('should display the msgError div', () => {

		const errorMessage = 'Name is require';

		const initState = {
			auth: {},
			ui: {
				loading: false,
				msgError: errorMessage,
			}
		};
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<RegisterScreen />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find('.auth__alert-error').exists()).toBeTruthy();
		expect(wrapper.find('.auth__alert-error').text().trim()).toBe(errorMessage);

	})

})