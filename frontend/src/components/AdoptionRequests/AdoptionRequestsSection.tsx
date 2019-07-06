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
      config:
        props.AppContext!.user!.type === UserType.Internal
          ? internalUserConfig
          : externalUserConfig,
    };
  }

  public async componentDidMount() {
    this.update();
  }

  public render = () => {
    const isEmpty = this.state.allRequests.length === 0;
    const isAnimal = this.props.animal != null;
    const isUserExternal =
      this.props.AppContext!.user!.type === UserType.External;
    const canUserMakeRequest =
      isAnimal &&
      isUserExternal &&
      !this.state.allRequests.some(
        (request) => request.animal.id === this.props.animal!.id,
      );
    const isShowingAll =
      this.state.showApproved &&
      this.state.showDenied &&
      this.state.showPending;

    return (
      <section className="col-md-12 col-lg-4" id="animal-requests">
        <h4>{this.state.config.title}</h4>

        {/* Show Make card if being render on an animal page and user is external */}
        {canUserMakeRequest && (
          <AdoptionRequestMakeCard
            animal={this.props.animal!}
            user={this.props.AppContext!.user!}
            update={this.update}
          />
        )}
        {isEmpty && <p>{this.state.config.emptyMessage}</p>}
        {!isEmpty && <this.RequestFilters />}
        <this.RequestCards />
        {!isEmpty && !isShowingAll && <this.ViewAllButton />}
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
      .filter((req) => showApproved(req) || showDenied(req) || showPending(req))
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
        onChange={() =>
          this.setState({ showApproved: !this.state.showApproved })
        }
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
    <div
      className={`form-control d-flex justify-content-around ${!props.isActive &&
        'bg-secondary'}`}
    >
      <label htmlFor={props.id}>
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
        {visibleRequests.map((request) => (
          <this.state.config.cardClass
            key={request.id!}
            request={request}
            update={this.update}
            AppContext={this.props.AppContext}
          />
        ))}
      </div>
    );
  }

  // tslint:disable-next-line: variable-name
  private ViewAllButton = () => (
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
  )

  private update = async () => {
    // All updated list of list request.
    // If an internal user and on an animal page, scope to only that animal.
    // If an external user, allways show all
    try {
      this.setState({
        allRequests: await (this.props.animal &&
        this.props.AppContext!.user!.type === UserType.Internal
          ? API.requests.forAnimal(this.props.animal.id)
          : API.requests.listAll()),
      });
    } catch (e) {
      this.props.AppContext!.setError(
        new Error(
          'Something when wrong. Please try again or contact us if this continues to happen.',
        ),
      );
    }
  }
}

export default withAppContext(AdoptionRequestsSection);
