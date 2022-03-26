import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('tests in authReducer', () => {

	test('should return the user data', () => {

		const action = {
			type: types.login,
			payload: {
				uid: '123456',
				displayName: 'Alejandro',
			}
		}

		const state = authReducer({}, action);

		expect(state).toEqual({
			uid: '123456',
			name: 'Alejandro'
		})

	});

	test('should return an empty state', () => {

		const state = {
			uid: '123456',
			displayName: 'Alejandro',
		}

		const action = {
			type: types.logout
		}

		const newState = authReducer(state, action);

		expect(newState).not.toEqual(state);
		expect(newState).toEqual({});

	});

	test('should return the initial state', () => {

		const state = {
			uid: '123456',
			displayName: 'Alejandro',
		}

		const action = {
			type: 'non existent action'
		}

		const newState = authReducer(state, action);

		expect(newState).toEqual(state);

	});
})