// tslint:disable-next-line: import-name
import React from 'react';
import AdoptionRequestCard from './AdoptionRequestCard';
import Emoji from '../Emoji';
import {
  IAnimal,
  IAdoptionRequest,
  AdoptionRequestStatus,
  UserType,
} from 'dc2410-coursework-common';
import { IAppContextInterface, withAppContext } from '../../AppContext';
import API from '../../helpers/API';
import AdoptionRequestInternalCard from './AdoptionRequestInternalCard';
import AdoptionRequestPersonalCard from './AdoptionRequestPersonalCard';
import AdoptionRequestMakeCard from './AdoptionRequestMakeCard';

interface IProps {
  AppContext?: IAppContextInterface;
  animal?: IAnimal;
}

interface IState {
  allRequests: IAdoptionRequest[];
  showPending: boolean;
  showApproved: boolean;
  showDenied: boolean;
  config: {
    title: string;
    emptyMessage: string;
    cardClass: typeof AdoptionRequestCard;
  };
}

class AdoptionRequestsSection extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    const internalUserConfig = {
      title: 'Adoption Requests',
      emptyMessage: 'No adoption requests have been made.',
      cardClass: AdoptionRequestInternalCard,
    };

    const externalUserConfig = {
      title: 'Your Adoption Requests',
      emptyMessage: "You've made no adoption requests.",
      cardClass: AdoptionRequestPersonalCard,
    };

    this.state = {
      allRequests: [],
      showPending: true,
      showApproved: false,
      showDenied: false,
      config: props.AppContext!.user!.type === UserType.Internal ? internalUserConfig : externalUserConfig,
    };
  }

  public async componentDidMount() {
    this.setState({ allRequests: await (this.props.animal ? API.requests.forAnimal(this.props.animal.id) : API.requests.listAll()) });
  }

  public render = () => {
    if (this.state.allRequests.length === 0) return (<this.Template><p>{this.state.config.emptyMessage}</p></ this.Template>);

    return (
      <this.Template>
        <this.RequestFilters />
        <this.RequestCards />
        <this.ViewAllButton />
      </ this.Template>
    );
  }

  // tslint:disable-next-line: variable-name
  private Template = (props: { children?: React.ReactNode }) => (
    <section className="col-md-12 col-lg-4" id="animal-requests">
      <h4>{this.state.config.title}</h4>

      {(
        this.props.animal &&
        this.props.AppContext!.user!.type === UserType.External
      ) ? (
          <AdoptionRequestMakeCard animal={this.props.animal} />
        ) : null}

      {props.children}
    </section>
  )

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
  private RequestFilters = () => (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text bg-primary text-light mb-3">
          Filter By
        </span>
      </div>
      <this.FilterButton
        id="filter-requests-pending"
        emoji="⏳"
        isActive={this.state.showPending}
        onChange={() => this.setState({ showPending: !this.state.showPending })}
      />
      <this.FilterButton
        id="filter-requests-approved"
        emoji="✔"
        isActive={this.state.showApproved}
        onChange={() => this.setState({ showApproved: !this.state.showApproved })}
      />
      <this.FilterButton
        id="filter-requests-denied"
        emoji="❌"
        isActive={this.state.showDenied}
        onChange={() => this.setState({ showDenied: !this.state.showDenied })}
      />
    </div>
  )

  // tslint:disable-next-line: variable-name
  private FilterButton = (props: {
    id: string;
    emoji: string;
    isActive: boolean;
    onChange: () => void;
  }) => (
      <div>
        <label
          htmlFor={props.id}
          className={`form-control d-flex justify-content-around ${!props.isActive ? 'bg-secondary' : ''}`}
        >
          <Emoji symbol={props.emoji} />
        </label>
        <input
          id={props.id}
          type="checkbox"
          className="d-none"
          onChange={props.onChange}
        />
      </div>
    )

  // tslint:disable-next-line: variable-name
  private RequestCards = () => {
    const visibleRequests = this.getFilterRequests();

    return (
      <div className="list-group mb-3">
        {visibleRequests.map(request => (
          <this.state.config.cardClass key={request.id!} request={request} />
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

export default withAppContext(AdoptionRequestsSection);
