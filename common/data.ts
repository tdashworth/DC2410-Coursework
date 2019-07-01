import {
  IAnimal,
  IAdoptionRequest,
  Gender,
  AnimalType,
  AdoptionRequestStatus,
} from './index';

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
  {
    name: 'Beau',
    description: 'Loving grey Weimerana breed',
    gender: Gender.Male,
    dob: new Date(2007, 6, 20),
    type: AnimalType.Dog,
    picture: '...',
  },
  {
    name: 'Elvis',
    description: 'Loud colourful cockatoo',
    gender: Gender.Male,
    dob: new Date(2011, 4, 19),
    type: AnimalType.Bird,
    picture: '...',
  },
  {
    name: 'Ralphie',
    description: 'Happy and excitable micro pig',
    gender: Gender.Male,
    dob: new Date(2010, 4, 11),
    type: AnimalType.Pig,
    picture: '...',
  },
  {
    name: 'Pepper',
    description: 'Curious and intelligent adult pig',
    gender: Gender.Female,
    dob: new Date(2004, 3, 31),
    type: AnimalType.Pig,
    picture: '...',
  },
  {
    name: 'Falcon',
    description: 'Engineering masterpiece that glides elegantly through the sky',
    gender: Gender.Female,
    dob: new Date(2019, 4, 25),
    type: AnimalType.Bird,
    picture: '...',
  },
  {
    name: 'Zero',
    description: 'Elegant and loyal white dog',
    gender: Gender.Male,
    dob: new Date(1994, 11, 25),
    type: AnimalType.Dog,
    picture: '...',
  },
  {
    name: "Thomas O'Malley",
    description: "Charming AristoCat that's smooth talking and streetwise",
    gender: Gender.Male,
    dob: new Date(2008, 1, 7),
    type: AnimalType.Cat,
    picture: '...',
  },
  {
    name: 'Grumpy Cat',
    description: 'Miserable looking but famous grey and white cat',
    gender: Gender.Male,
    dob: new Date(2012, 4, 4),
    type: AnimalType.Cat,
    picture: '...',
  },
  {
    name: 'Lassie',
    description: 'Well tempered and loyal best friend',
    gender: Gender.Female,
    dob: new Date(2018, 6, 30),
    type: AnimalType.Dog,
    picture: '...',
  },
  {
    name: 'Tweetie Pie',
    description: 'Round yellow bird, very observant',
    gender: Gender.Female,
    dob: new Date(2003, 5, 3),
    type: AnimalType.Bird,
    picture: '...',
  },
  {
    name: 'Piglet',
    description: 'Kind and compassionate but brave on occasion who loves acorns',
    gender: Gender.Male,
    dob: new Date(2018, 8, 17),
    type: AnimalType.Pig,
    picture: '...',
  },
];

const allRequests: IAdoptionRequest[] = [
  {
    animal: animals[0],
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Pending,
  },
  {
    animal: animals[4],
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Approved,
  },
  {
    animal: animals[6],
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Denied,
  },
  {
    animal: animals[2],
    user: { username: 'tom', displayName: 'Tom', hash: '' },
    status: AdoptionRequestStatus.Approved,
  },
];
