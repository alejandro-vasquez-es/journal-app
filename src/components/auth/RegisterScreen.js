import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForms'

export const RegisterScreen = () => {

	// name: 'Alejandro',
	// email: 'correo@correo.com',
	// password: '123456',
	// password2: '123456' 

	const [formValues, handleInputChange] = useForm({
		name: 'Alejandro',
		email: 'correo@correo.com',
		password: '123456',
		password2: '123456'

	});

	const { name, email, password, password2 } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(formValues);
	}

	const isFormValid = () => {
		//TODO:
	}

	return (
		<>
			<h2 className="auth__title">Register</h2>

			<form className="auth__form">

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
					onClick={handleLogin}
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
