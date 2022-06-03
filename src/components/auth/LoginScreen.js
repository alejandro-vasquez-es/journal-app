import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForms';

export const LoginScreen = () => {

	const dispatch = useDispatch();
	const { msgError, loading } = useSelector(state => state.ui);


	const [formValues, handleInputChange] = useForm({ email: '', password: '' });

	const { email, password } = formValues;

	const handleLogin = async (e) => {
		e.preventDefault();
		if (isFormValid())
			await dispatch(startLoginEmailPassword(email, password));
	}

	const handleGoogleLogin = () => {

		dispatch(startGoogleLogin());

	}

	const isFormValid = () => {

		if (!validator.isEmail(email)) {
			dispatch(setError('Email is invalid'));
			return false;
		} else if (password.length < 5) {
			dispatch(setError('Password should be at least 5 characters'));
			return false;
		}

		dispatch(removeError());
		return true;
	}

	return (
		<>
			<h2 className="auth__title">Login</h2>

			<form
				className="auth__form animate__animated animate__fadeIn animate__faster"
				onSubmit={handleLogin}
			>

				{msgError &&
					(<div className="auth__alert-error">
						{msgError}
					</div>)
				}

				<input
					type="text"
					placeholder="email"
					name="email"
					className="auth__input"
					autoComplete='off'
					value={email}
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					value={password}
					onChange={handleInputChange}
				/>

				<button
					className="button"
					type="submit"
					disabled={loading}
				>
					Login
				</button>

				<div className="google__container">

					<p><b>Login with social networks </b></p>

					<div
						className="google-btn"
						onClick={handleGoogleLogin}
					>
						<div className="google-icon-wrapper">
							<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>

				</div>

				<Link
					className='link'
					to="/auth/register"
				>
					Create new account
				</Link>

			</form>

		</>
	)
}
