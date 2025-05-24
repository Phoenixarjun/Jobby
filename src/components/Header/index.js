import './index.css'
import Cookies from 'js-cookie'
import {Link, useHistory} from 'react-router-dom'

const Header = () => {
  const history = useHistory()
  const handleLogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="logo-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="site-logo"
        />
      </Link>
      <ul className="nav-lists">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button className="logoutBtn" onClick={handleLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default Header
