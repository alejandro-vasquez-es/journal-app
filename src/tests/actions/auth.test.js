import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

describe('tests in auth actions', () => {

	const middlewares = [thunk];
	const mockStore = configureStore(middlewares);

	const initState = {};

	let store = mockStore(initState);

	beforeEach(() => {

		store = mockStore(initState);

	});

	test('should create the respective function with login and logout', () => {

		const uid = 'TESTING';
		const displayName = 'Tester'

		const expectedLoginAction = {
			type: types.login,
			payload: {
				uid: uid,
				displayName: displayName,
			}
		};

		const expectedLogoutAction = {
			type: types.logout
		}

		const loginAction = login(uid, displayName);
		const logoutAction = logout();

		expect(loginAction).toEqual(expectedLoginAction);
		expect(logoutAction).toEqual(expectedLogoutAction);
	});


	test('should realize the logout', async () => {

		await store.dispatch(startLogout());

		const actions = store.getActions();
		console.log(actions);

		expect(actions[0]).toEqual({
			type: types.logout
		});

		expect(actions[1]).toEqual({
			type: types.notesLogoutCleaning
		});

	});

	test('should call startLoginEmailPassword', async () => {

		await store.dispatch(startLoginEmailPassword('test@email.com', '123456'));

		const actions = store.getActions();
		console.log(actions);

		expect(actions[1]).toEqual({
			type: types.login,
			payload: {
				uid: expect.any(String),
				displayName: null
			}
		})

	});

})