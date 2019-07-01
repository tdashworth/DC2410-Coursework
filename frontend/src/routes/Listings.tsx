// tslint:disable-next-line: import-name
import React from 'react';
import AnimalSummarySection from '../components/Animal/AnimalSummarySection';
import AdoptionRequestsSection from '../components/AdoptionRequests/AdoptionRequestsSection';

class Listings extends React.Component<{}> {
  public render() {
    return (
      <main className="container mt-3">
        <div className="row">
          <AnimalSummarySection />
          <AdoptionRequestsSection />
        </div>
      </main>
    );
  }
}

export default Listings;
