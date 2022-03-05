import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export const PublicRoute = ({
	isLoggedIn,
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			component={(props) => (
				(isLoggedIn)
					? (<Redirect to="/" />)
					: (<Component {...props} />)
			)}
		/>
	)
}
 // TODO: