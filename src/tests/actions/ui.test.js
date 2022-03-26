import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';


describe('tests in ui action', () => {

	test('should work all the actions', () => {

		const action = setError('Error message');

		expect(action).toEqual({
			type: types.uiSetError,
			payload: 'Error message'
		});

		const removeErrorAction = removeError();
		const startLoadingAction = startLoading();
		const finishLoadingAction = finishLoading();

		expect(removeErrorAction).toEqual({
			type: types.uiRemoveError
		});

		expect(startLoadingAction).toEqual({
			type: types.uiStartLoading
		});

		expect(finishLoadingAction).toEqual({
			type: types.uiFinishLoading
		});


	})

})