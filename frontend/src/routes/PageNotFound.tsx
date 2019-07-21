import React from 'react';

class PageNotFound extends React.Component<{}> {
  public render() {
    return (
      <main className="container mt-5">
        <section
          className="jumbotron card"
          style={{ background: 'white', color: 'black' }}
        >
          <h1 className="display-4">404: Page Not Found</h1>
          <hr className="my-4" />
          <p className="lead">
            Location <code>{window.location.href}</code> is not valid on this
            site.
          </p>
          <a
            className="btn btn-primary mt-4 w-25"
            href="/"
            style={{ textDecoration: 'none' }}
          >
            Go home
          </a>
        </section>
      </main>
    );
  }
}

export default PageNotFound;
