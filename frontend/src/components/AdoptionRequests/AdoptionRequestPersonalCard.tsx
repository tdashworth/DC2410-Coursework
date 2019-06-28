// tslint:disable-next-line: import-name
import React from "react";
import AdoptionRequestCard from "./AdoptionRequestCard";

class AdoptionRequestPersonalCard extends AdoptionRequestCard {
  public render = () => (
    <div className={`list-group-item text-dark ${this.getItemTheme()}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <a href="/animal/">{this.props.request.animal.name}</a>
        </h5>
        <small>{this.getStatusText()}</small>
      </div>
      <p className="mb-1">{this.props.request.animal.description}</p>
    </div>
  );
}

export default AdoptionRequestPersonalCard;
