// tslint:disable-next-line: import-name
import React from "react";

export interface AnimalState {
  error: string;
}

class Animal extends React.Component<{}, AnimalState> {
  public state = {
    error: ""
  };

  public componentDidMount() {
    // this.setState({ isLoggedIn: isSessionValid() });
  }

  public render() {
    return (
      <main className="container mt-3">
        <div className="row">
          <section className="col-md-12 col-lg-8" id="animal-details">
            <h3>[Animal Name]</h3>
          </section>

          <section className="col-md-12 col-lg-4" id="animal-requests">
            <h4>Your Adoption Requests</h4>

            <div className="list-group list-group-item list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Animal Name</h5>
                <small>Pending...</small>
              </div>
              <p className="mb-1">
                Animal description: Donec id elit non mi porta gravida at eget
                metus. Maecenas sed diam eget risus varius blandit.
              </p>
            </div>
            <div className="list-group list-group-item list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Animal Name</h5>
                <small>Pending...</small>
              </div>
              <p className="mb-1">
                Animal description: Donec id elit non mi porta gravida at eget
                metus. Maecenas sed diam eget risus varius blandit.
              </p>
            </div>
            <div className="list-group list-group-item list-group-item-danger">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Animal Name</h5>
                <small>Denied</small>
              </div>
              <p className="mb-1">
                Animal description: Donec id elit non mi porta gravida at eget
                metus. Maecenas sed diam eget risus varius blandit.
              </p>
            </div>
            <div className="list-group list-group-item list-group-item-success">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Animal Name</h5>
                <small>Approved</small>
              </div>
              <p className="mb-1">
                Animal description: Donec id elit non mi porta gravida at eget
                metus. Maecenas sed diam eget risus varius blandit.
              </p>
            </div>

            <h4>Adoption Requests</h4>

            <div className="list-group">
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">User Display Name</h5>
                  <small>Pending...</small>
                </div>
                <div className="d-flex w-100 justify-content-between reply">
                  <button type="button" className="btn btn-success">
                    Approve
                  </button>
                  <button type="button" className="btn btn-danger">
                    Deny
                  </button>
                </div>
              </div>
            </div>

            <div className="list-group">
              <div className="list-group-item list-group-item-success">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">User Display Name</h5>
                  <small>Approved</small>
                </div>
              </div>
              <div className="list-group-item list-group-item-danger">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">User Display Name</h5>
                  <small>Denied</small>
                </div>
              </div>
              <div className="list-group-item list-group-item-danger">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">User Display Name</h5>
                  <small>Denied</small>
                </div>
              </div>
              <div className="list-group-item list-group-item-danger">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">User Display Name</h5>
                  <small>Denied</small>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // private logout = (): void => {
  //   clearSession();
  //   this.setState({ isLoggedIn: false });
  // }

  // private getTestData = async (): Promise<void> => {
  //   try {
  //     this.setState({ error: '' });
  //     const response = await axios.get<App.Item[]>('/api/items', { headers: getAuthHeaders() });
  //     this.setState({ data: response.data });
  //   } catch (error) {
  //     this.setState({ error: 'Something went wrong' });
  //   } finally {
  //     this.setState({ isRequesting: false });
  //   }
  // }
}

export default Animal;
