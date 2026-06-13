import { Link, Outlet } from 'react-router-dom'

export default function SiteLayout() {
  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <Link to="/" className="brand-lockup" aria-label="GUILD SA home">
            <img
              className="brand-logo"
              src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998013/Master_Logo_buvhmu.png"
              alt=""
              aria-hidden="true"
            />
          </Link>
        </div>
      </nav>

      <Outlet />

      <footer className="footer" data-guild-footer />
    </>
  )
}
