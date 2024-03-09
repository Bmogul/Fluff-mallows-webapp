import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <Metadata title="About Us" description="About page" />

      <header>
        <h1>About Me</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <p>
          Hello!! I CREATE THE BEST MARSHMALLOWS IN THE WORLD!!! MWAHAHAHAHA
        </p>
        <Link to={routes.home()}>Return home</Link>
      </main>
    </>
  )
}

export default AboutPage
