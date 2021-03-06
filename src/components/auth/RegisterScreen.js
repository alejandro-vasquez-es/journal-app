import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForms';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

	const dispatch = useDispatch();
	const { msgError } = useSelector(state => state.ui);

	const [formValues, handleInputChange] = useForm({
		name: '', email: '', password: '', password2: ''
	});

	const { name, email, password, password2 } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	}

	const isFormValid = () => {

		if (name.trim().length === 0) {
			dispatch(setError('Name is require'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is invalid'));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError('Password should be at least 5 characters and match each'));
			return false;
		}

		dispatch(removeError());
		return true;
	}

	return (
		<>
			<h2 className="auth__title">Register</h2>

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
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete='off'
					value={name}
					onChange={handleInputChange}
				/>

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

				<input
					type="password"
					placeholder="Confirm password"
					name="password2"
					className="auth__input"
					value={password2}
					onChange={handleInputChange}
				/>

				<button
					className="button mb-5"
					type="submit"
				>
					Register
				</button>

				<Link
					className='link mt-1'
					to="/auth/login"
				>
					Already registered?
				</Link>

			</form>

		</>
	)
}
