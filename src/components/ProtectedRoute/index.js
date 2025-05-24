import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const token = Cookie.get('jwt_token')

  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
