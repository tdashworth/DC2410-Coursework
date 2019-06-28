// tslint:disable-next-line: import-name
import React from "react";
import AdoptionRequestCard from "./AdoptionRequestCard";
import Emoji from "../Emoji";
import {
  Gender,
  AnimalType,
  Animal,
  AdoptionRequest,
  AdoptionRequestStatus
} from "dc2410-coursework-common";

const animal1 = {
  name: "Holly",
  description: "Loved black and white short haired cat.",
  gender: Gender.Female,
  dob: new Date(2006, 11, 5),
  type: AnimalType.Cat,
  picture: "http://localtvkfor.files.wordpress.com/2012/08/dog-pet-adoption.jpg"
};

interface Props {
  title: string;
  emptyMessge: string;
  cardClass: typeof AdoptionRequestCard;
  animal?: Animal;
}

interface State {
  allRequests: AdoptionRequest[];
  showPending: boolean;
  showved: boolean;
  showDenied: boolean;
}

export class AdoptionRequestsSection extends React.Component<Props, State> {
  public state: State = {
    allRequests: [],
    showPending: true,
    showved: false,
    showDenied: false
  };

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    const allRequests: AdoptionRequest[] = [
      {
        animal: animal1,
        user: { username: "tom", displayName: "Tom", hash: "" },
        status: AdoptionRequestStatus.Pending
      },
      {
        animal: animal1,
        user: { username: "tom", displayName: "Tom", hash: "" },
        status: AdoptionRequestStatus.Approved
      },
      {
        animal: animal1,
        user: { username: "tom", displayName: "Tom", hash: "" },
        status: AdoptionRequestStatus.Denied
      },
      {
        animal: animal1,
        user: { username: "tom", displayName: "Tom", hash: "" },
        status: AdoptionRequestStatus.Approved
      }
    ];

    this.setState({ allRequests });
  }

  public render = () => {
    if (this.state.allRequests.length === 0) {
      return (
        <section className="col-md-12 col-lg-4" id="animal-requests">
          <h4>{this.props.title}}</h4>
          <p>{this.props.emptyMessge}</p>
        </section>
      );
    }

    const visibleRequests = this.getFilterRequests();

    return (
      <section className="col-md-12 col-lg-4" id="animal-requests">
        <h4>{this.props.title}</h4>

        <this.RequestFilters />

        <div className="list-group mb-3">
          {visibleRequests.map(request => (
            <this.props.cardClass key={request.id!} request={request} />
          ))}
        </div>

        {!(
          this.state.showved &&
          this.state.showDenied &&
          this.state.showPending
        ) ? (
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={() =>
              this.setState({
                showved: true,
                showDenied: true,
                showPending: true
              })
            }
          >
            View all requests
          </button>
        ) : null}
      </section>
    );
  };

  private getFilterRequests = (): AdoptionRequest[] => {
    const showved = (request: AdoptionRequest) =>
      this.state.showved && request.status === AdoptionRequestStatus.Approved;
    const showDenied = (request: AdoptionRequest) =>
      this.state.showDenied && request.status === AdoptionRequestStatus.Denied;
    const showPending = (request: AdoptionRequest) =>
      this.state.showPending &&
      request.status === AdoptionRequestStatus.Pending;

    return this.state.allRequests
      .filter(
        request =>
          showved(request) || showDenied(request) || showPending(request)
      )
      .sort((request1, request2) => request1.status! - request2.status!);
  };

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
          !this.state.showPending ? "bg-secondary" : ""
        }`}
      >
        <Emoji symbol="⏳" />
      </label>
      <label
        htmlFor="filter-requests-oved"
        className={`form-control d-flex justify-content-around ${
          !this.state.showved ? "bg-secondary" : ""
        }`}
      >
        <Emoji symbol="✔" />
      </label>
      <label
        htmlFor="filter-requests-denied"
        className={`form-control d-flex justify-content-around ${
          !this.state.showDenied ? "bg-secondary" : ""
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
        id="filter-requests-oved"
        type="checkbox"
        className="d-none"
        onChange={() => this.setState({ showved: !this.state.showved })}
      />
      <input
        id="filter-requests-denied"
        type="checkbox"
        className="d-none"
        onChange={() => this.setState({ showDenied: !this.state.showDenied })}
      />
    </div>
  );
}

export default AdoptionRequestsSection;
