import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom'
import { login, startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForms';

export const LoginScreen = () => {

	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		email: 'correo@gmail.com',
		password: 'test'
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailPassword(email, password))
	}

	const handleGoogleLogin = () => {
		dispatch(startGoogleLogin());
	}

	return (
		<>
			<h2 className="auth__title">Login</h2>

			<form
				className="auth__form"
				onSubmit={handleLogin}
			>

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
