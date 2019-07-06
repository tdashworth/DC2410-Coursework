import {
  IAnimal,
  IAdoptionRequestDB,
  Gender,
  AnimalType,
  AdoptionRequestStatus,
  IUser,
  UserType,
} from 'dc2410-coursework-common';
import Users from './users/users.model';
import Animals from './animals/animals.model';
import AdoptionRequests from './adoptionRequests/adoptionRequests.model';

let users: IUser[];
let animals: IAnimal[];
let adoptionRequests: IAdoptionRequestDB[];

const deleteAll = false;

export const populateUsers = async () => {
  if (deleteAll) await Users.deleteAll();
  const retrievedData = await Users.listAll();
  if (retrievedData.length > 0) {
    users = retrievedData;
    return console.log('Users population: already loaded.');
  }

  users = [
    {
      username: 'admin',
      displayName: 'Admin',
      passwordHash: 'Password for Admin 🔑',
      type: UserType.Internal,
    },
    {
      username: 'tdashworth',
      displayName: 'Tom Ashworth',
      passwordHash: 'Password for Tom 🗝',
      type: UserType.Internal,
    },
    {
      username: 'user1',
      displayName: 'User 1',
      passwordHash: 'Password for User 1 🐈',
      type: UserType.External,
    },
    {
      username: 'user2',
      displayName: 'User 2',
      passwordHash: 'Password for User 2 🐕‍',
      type: UserType.External,
    },
  ];

  console.log('Users population: loading data...');
  await Promise.all(users.map(item => Users.create(item)));
  users = await Users.listAll();
  console.log('Users population: loaded data.');
};

export const populateAnimals = async () => {
  if (deleteAll) await Animals.deleteAll();
  const retrievedData = await Animals.listAll();
  if (retrievedData.length > 0) {
    animals = retrievedData;
    return console.log('Animals population: already loaded.');
  }

  animals = [
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
      description:
        'Engineering masterpiece that glides elegantly through the sky',
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
      description:
        'Kind and compassionate but brave on occasion who loves acorns',
      gender: Gender.Male,
      dob: new Date(2018, 8, 17),
      type: AnimalType.Pig,
      picture: '...',
    },
  ];

  console.log('Animals population: loading data...');
  await Promise.all(animals.map(item => Animals.create(item)));
  animals = await Animals.listAll();
  console.log('Animals population: loaded data.');
};

export const populateRequests = async () => {
  if (deleteAll) await AdoptionRequests.deleteAll();
  const retrievedData = await AdoptionRequests.listAll();
  if (retrievedData.length > 0) {
    adoptionRequests = retrievedData;
    return console.log('Adoption Requests population: already loaded.');
  }

  adoptionRequests = [
    {
      animal: animals[0].id,
      user: users[2].id,
      status: AdoptionRequestStatus.Pending,
    },
    {
      animal: animals[4].id,
      user: users[2].id,
      status: AdoptionRequestStatus.Approved,
    },
    {
      animal: animals[6].id,
      user: users[3].id,
      status: AdoptionRequestStatus.Denied,
    },
    {
      animal: animals[2].id,
      user: users[3].id,
      status: AdoptionRequestStatus.Approved,
    },
    {
      animal: animals[0].id,
      user: users[3].id,
      status: AdoptionRequestStatus.Pending,
    },
  ];

  console.log('Adoption Requests population: loading data...');
  await Promise.all(
    adoptionRequests.map(async (item) => {
      const result = await AdoptionRequests.create(item);

      switch (item.status) {
        case AdoptionRequestStatus.Approved:
          AdoptionRequests.approve(result.id);
          break;
        case AdoptionRequestStatus.Denied:
          AdoptionRequests.deny(result.id);
          break;
      }
    }),
  );
  adoptionRequests = await AdoptionRequests.listAll();
  console.log('Adoption Requests population: loaded data.');
};
