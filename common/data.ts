import {
    IAnimal,
    IAdoptionRequest,
    Gender,
    AnimalType,
    AdoptionRequestStatus,
} from './index';

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

const animals: IAnimal[] = [
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
