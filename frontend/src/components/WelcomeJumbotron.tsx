import React from 'react';

class WelcomeJumbotron extends React.Component {
  public render = () => (
    <section
      className="jumbotron card"
      style={{ background: 'white', color: 'black' }}
    >
      <h1 className="display-4">Welcome!</h1>
      <p className="lead">
        Aston Animal Sanctuary is a charity that cares for the animal neglected
        in the Aston area and surroundings.
      </p>
      <hr className="my-4" />
      <p>
        This site can only be used if your a member. Please sign in below or
        become a member by creating an account.
      </p>
    </section>
  )
}

export default WelcomeJumbotron;
