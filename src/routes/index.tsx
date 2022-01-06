import { Link } from 'remix'

export default function Index() {
  return (
    <div>
      <h1 className="text-white bg-primary-900">Welcome to Remix!</h1>
      <nav>
        <Link to="/work/">Work</Link>
        <Link to="/play/">Play</Link>
        <Link to="/i-am-a/">Live</Link>
      </nav>
    </div>
  )
}
