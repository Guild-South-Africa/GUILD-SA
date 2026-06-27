import { Link } from 'react-router-dom'

export default function AppLink({ to, className, children, ...props }) {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  )
}
