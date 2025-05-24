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
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          width={100}
        />
      </Link>

      <ul className="nav-lists">
        <Link to="/" className="link">
          <li>
            <p>Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link">
          <li>
            <p>Jobs</p>
          </li>
          <li></li>
        </Link>
      </ul>
      <button className="logoutBtn" onClick={handleLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default Header
