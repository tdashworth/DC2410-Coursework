import React from 'react';

interface IProps {
  images: string[];
}

class Carousel extends React.Component<IProps> {
  public render = () => (
    <div
      id="carouselIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <this.Indicators />
      <this.Pictures />
      <this.Buttons />
    </div>
  );

  // tslint:disable-next-line: variable-name
  private Indicators = () => (
    <ol className="carousel-indicators">
      {this.props.images.map((imageUrl, index) => (
        <li
          key={index}
          data-target="#carouselIndicators"
          data-slide-to={index}
          className={index === 0 ? 'active' : ''}
        />
      ))}
    </ol>
  );

  // tslint:disable-next-line: variable-name
  private Pictures = () => (
    <div className="carousel-inner">
      {this.props.images.map((imageUrl, index) => (
        <div className={`carousel-item ${index === 0 || 'active'}`} key={index}>
          <img src={imageUrl} className="d-block w-100" alt={imageUrl}/>
        </div>
      ))}
    </div>
  );

// tslint:disable-next-line: variable-name
  private Buttons = () => (
    <div>
      <a
        className="carousel-control-prev"
        href="#carouselIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
