// tslint:disable-next-line: import-name
import React from 'react';
import AdoptionRequestCard from './AdoptionRequestCard';
import Emoji from '../Emoji';
import {
  Gender,
  AnimalType,
  IAnimal,
  IAdoptionRequest,
  AdoptionRequestStatus,
} from 'dc2410-coursework-common';

const animal1: IAnimal = {
  name: 'Holly',
  description: 'Loved black and white short haired cat.',
  gender: Gender.Female,
  dob: new Date(2006, 11, 5),
  type: AnimalType.Cat,
  picture:
    'http://localtvkfor.files.wordpress.com/2012/08/dog-pet-adoption.jpg',
};

const allRequests: IAdoptionRequest[] = [
  {
    animal: animal1,
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Pending,
  },
  {
    animal: animal1,
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Approved,
  },
  {
    animal: animal1,
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Denied,
  },
  {
    animal: animal1,
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Approved,
  },
];

interface IProps {
  title: string;
  emptyMessge: string;
  cardClass: typeof AdoptionRequestCard;
  animal?: IAnimal;
}

interface IState {
  allRequests: IAdoptionRequest[];
  showPending: boolean;
  showApproved: boolean;
  showDenied: boolean;
}

class AdoptionRequestsSection extends React.Component<IProps, IState> {
  public state: IState = {
    allRequests: [],
    showPending: true,
    showApproved: false,
    showDenied: false,
  };

  public componentDidMount = () => this.setState({ allRequests });

  public render = () => {
    // Show empty message when there are not requests.
    if (this.state.allRequests.length === 0) return <this.EmptyMessage />;

    return (
      <section className="col-md-12 col-lg-4" id="animal-requests">
        <h4>{this.props.title}</h4>
        <this.RequestFilters />
        <this.RequestCards />
        <this.ViewAllButton />
      </section>
    );
  }

  private getFilterRequests = (): IAdoptionRequest[] => {
    const ARS = AdoptionRequestStatus;

    const showApproved = (request: IAdoptionRequest) =>
      this.state.showApproved && request.status === ARS.Approved;
    const showDenied = (request: IAdoptionRequest) =>
      this.state.showDenied && request.status === ARS.Denied;
    const showPending = (request: IAdoptionRequest) =>
      this.state.showPending && request.status === ARS.Pending;

    return this.state.allRequests
      .filter(
        req => showApproved(req) || showDenied(req) || showPending(req),
      )
      .sort((request1, request2) => request1.status! - request2.status!);
  }

  // tslint:disable-next-line: variable-name
  private EmptyMessage = () => (
    <section className="col-md-12 col-lg-4" id="animal-requests">
      <h4>{this.props.title}}</h4>
      <p>{this.props.emptyMessge}</p>
    </section>
  )

  // tslint:disable-next-line: variable-name
  private RequestFilters = () => (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text bg-primary text-light mb-3">
          Filter By
        </span>
      </div>
      <label
        htmlFor="filter-requests-pending"
        className={`form-control d-flex justify-content-around ${
          !this.state.showPending ? 'bg-secondary' : ''
          }`}
      >
        <Emoji symbol="⏳" />
      </label>
      <label
        htmlFor="filter-requests-approved"
        className={`form-control d-flex justify-content-around ${
          !this.state.showApproved ? 'bg-secondary' : ''
          }`}
      >
        <Emoji symbol="✔" />
      </label>
      <label
        htmlFor="filter-requests-denied"
        className={`form-control d-flex justify-content-around ${
          !this.state.showDenied ? 'bg-secondary' : ''
          }`}
      >
        <Emoji symbol="❌" />
      </label>
      <input
        id="filter-requests-pending"
        type="checkbox"
        className="d-none"
        onChange={() => this.setState({ showPending: !this.state.showPending })}
      />
      <input
        id="filter-requests-approved"
        type="checkbox"
        className="d-none"
        onChange={() =>
          this.setState({ showApproved: !this.state.showApproved })
        }
      />
      <input
        id="filter-requests-denied"
        type="checkbox"
        className="d-none"
        onChange={() => this.setState({ showDenied: !this.state.showDenied })}
      />
    </div>
  )

  // tslint:disable-next-line: variable-name
  private RequestCards = () => {
    const visibleRequests = this.getFilterRequests();

    return (
      <div className="list-group mb-3">
        {visibleRequests.map((request) => (
          <this.props.cardClass key={request.id!} request={request} />
        ))}
      </div>
    );
  }

  // tslint:disable-next-line: variable-name
  private ViewAllButton = () =>
    !(
      this.state.showApproved &&
      this.state.showDenied &&
      this.state.showPending
    ) ? (
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() =>
            this.setState({
              showApproved: true,
              showDenied: true,
              showPending: true,
            })
          }
        >
          View all requests
      </button>
      ) : null
}

export default AdoptionRequestsSection;
