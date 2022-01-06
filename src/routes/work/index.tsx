import { Link } from 'remix'

export default function WorkIndex() {
  return (
    <div>
      <h1 className="text-white bg-primary-900">Work index</h1>
      <p>Currently, there is not an index for work. It returns a 404 page.</p>
      <nav>
        <Link to="/work/audiotheme">AudioTheme</Link>
        <Link to="/work/blazer-six">Blazer Six</Link>
        <Link to="/work/cedaro">Cedaro</Link>
      </nav>
    </div>
  )
}
