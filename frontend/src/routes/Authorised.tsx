// tslint:disable-next-line: import-name
import React from 'react';
import { Gender, AnimalType, Animal, UserType } from 'dc2410-coursework-common';

import AnimalSummarySection from '../components/Animal/AnimalSummarySection';
import AdoptionRequestsSection from '../components/AdoptionRequests/AdoptionRequestsSection';
import AdoptionRequestInternalCard from '../components/AdoptionRequests/AdoptionRequestInternalCard';
import AdoptionRequestPersonalCard from '../components/AdoptionRequests/AdoptionRequestPersonalCard';
import { withAppContext, IAppContext } from '../AppContext';

class Authorised extends React.Component<{ AppContext?: IAppContext }> {
  public render() {
    const animals: Animal[] = [
      {
        name: 'Holly',
        description: 'Loved black and white short haired cat.',
        gender: Gender.Female,
        dob: new Date(2006, 11, 5),
        type: AnimalType.Cat,
        picture:
          'http://localtvkfor.files.wordpress.com/2012/08/dog-pet-adoption.jpg',
      },
      {
        name: 'Example Animal',
        description:
          "Animal Description: Some quick example text to build on the card title and make up the bulk of the card's content.",
        gender: Gender.Male,
        dob: new Date(2017, 5, 17),
        type: AnimalType.Dog,
        picture:
          'https://www.greenepet.org/wp-content/uploads/2012/12/dog-adopt-1024x680.jpg',
      },
    ];

    return (
      <main className="container mt-3">
        <div className="row">
          <AnimalSummarySection animals={animals} />
          {this.props.AppContext!.user!.type === UserType.Internal ? (
            <AdoptionRequestsSection
              title="Adoption Requests"
              emptyMessge="No adoption requests have been made."
              cardClass={AdoptionRequestInternalCard}
            />
          ) : (
            <AdoptionRequestsSection
              title="Your Adoption Requests"
              emptyMessge="You haven't made any adoption requests yet."
              cardClass={AdoptionRequestPersonalCard}
            />
          )}
        </div>
      </main>
    );
  }
}

export default withAppContext(Authorised);
