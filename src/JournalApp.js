import React from 'react';
import { Provider } from 'react-redux'

import { store } from './store/store.js';
import { AppRouter } from './routers/AppRouter.js'
import './styles/styles.sass'

export const JournalApp = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	)
};