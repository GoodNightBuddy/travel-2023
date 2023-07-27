import { Link } from "react-router-dom"
import briefcase from "../../../images/briefcase.svg";
import user from "../../../images/user.svg";
import './styles.scss'

const HeaderNav: React.FC = () => {
  return (
    <nav data-test-id="header-nav" className="header__nav">
      <ul className="nav-header__list">
        <li className="nav-header__item" title="Bookings">
          <Link to={'bookings'} className="nav-header__inner" data-test-id="header-bookings-link">
            <span className="visually-hidden">Bookings</span>
            <img src={briefcase} alt=" icon" />
          </Link>
        </li>
        <li className="nav-header__item" title="Profile">
          <div className="nav-header__inner profile-nav" tabIndex={0} data-test-id="header-profile-nav">
            <span className="visually-hidden">Profile</span>
            <img src={user} alt="profile icon" />
            <ul className="profile-nav__list" data-test-id="header-profile-nav-list">
              <li className="profile-nav__item profile-nav__username" data-test-id="header-profile-nav-username">John Doe</li>
              <li className="profile-nav__item">
                <Link to={'sign-in'} className="profile-nav__sign-out button" data-test-id="header-profile-nav-sign-out">Sign Out</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNav