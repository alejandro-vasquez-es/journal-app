import React, { useEffect } from 'react';

import { firebase } from '../firebase/firebase-config';
import {
	BrowserRouter as Router,
	Switch,
	Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth';
import { useState } from 'react';
import { Spinner } from '../components/auth/loader/Spinner';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {

		firebase.auth().onAuthStateChanged((user) => {

			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setChecking(false);

		});

	}, [dispatch, setChecking, setIsLoggedIn])


	if (checking) {
		return (
			<Spinner speed={4} />
		)
	}


	return (
		<Router>
			<div>
				<Switch>

					<PublicRoute
						path="/auth"
						component={AuthRouter}
						isLoggedIn={isLoggedIn}
					/>

					<PrivateRoute
						exact
						path="/"
						isLoggedIn={isLoggedIn}
						component={JournalScreen}
					/>

					<Redirect to="/auth/login" />


				</Switch>
			</div>
		</Router>
	)
}

