import {
  AdoptionRequestStatus,
  AnimalType,
  Gender,
  IAdoptionRequestDB,
  IAnimal,
  IUser,
  UserType,
} from 'dc2410-coursework-common';
import AdoptionRequests from './adoptionRequests/adoptionRequests.model';
import Animals from './animals/animals.model';
import Users from './users/users.model';

let users: IUser[];
let animals: IAnimal[];
let adoptionRequests: IAdoptionRequestDB[];

const deleteAll = true;

export const populateUsers = async () => {
  if (deleteAll) await Users.deleteAll();
  const retrievedData = await Users.listAll();
  if (retrievedData.length > 0) {
    users = retrievedData;
    // tslint:disable-next-line: no-console
    console.log('Users population: already loaded.');
    return;
  }

  users = [
    {
      displayName: 'Admin',
      passwordHash: 'Password for Admin',
      type: UserType.Internal,
      username: 'admin',
    },
    {
      displayName: 'Tom Ashworth',
      passwordHash: 'Password for Tom 🗝',
      type: UserType.Internal,
      username: 'tdashworth',
    },
    {
      displayName: 'User 1',
      passwordHash: 'Password for User 1',
      type: UserType.External,
      username: 'user1',
    },
    {
      displayName: 'User 2',
      passwordHash: 'Password for User 2',
      type: UserType.External,
      username: 'user2',
    },
  ];

  // tslint:disable-next-line: no-console
  console.log('Users population: loading data...');
  await Promise.all(users.map((item) => Users.create(item)));
  users = await Users.listAll();
  // tslint:disable-next-line: no-console
  console.log('Users population: loaded data.');
};

export const populateAnimals = async () => {
  if (deleteAll) await Animals.deleteAll();
  const retrievedData = await Animals.listAll();
  if (retrievedData.length > 0) {
    animals = retrievedData;
    // tslint:disable-next-line: no-console
    console.log('Animals population: already loaded.');
    return;
  }

  animals = [
    {
      description: 'Loved black and white short haired cat.',
      dob: new Date(2006, 11, 5),
      gender: Gender.Female,
      name: 'Holly',
      pictures: [
        '/uploads/14590997_632538036920287_8526888530838814720_n.jpg',
        '/uploads/15876421_1832360853685427_4689974115363192832_n.jpg',
      ],
      type: AnimalType.Cat,
    },
    {
      description:
        "Animal Description: Some quick example text to build on the card title and make up the bulk of the card's content.",
      dob: new Date(2017, 5, 17),
      gender: Gender.Male,
      name: 'Example Animal',
      pictures: ['/uploads/18879665_797479403761196_7020233313574977536_n.jpg'],
      type: AnimalType.Dog,
    },
    {
      description: 'Loving grey Weimerana breed',
      dob: new Date(2007, 6, 20),
      gender: Gender.Male,
      name: 'Beau',
      type: AnimalType.Dog,
    },
    {
      description: 'Loud colourful cockatoo',
      dob: new Date(2011, 4, 19),
      gender: Gender.Male,
      name: 'Elvis',
      type: AnimalType.Bird,
    },
    {
      description: 'Happy and excitable micro pig',
      dob: new Date(2010, 4, 11),
      gender: Gender.Male,
      name: 'Ralphie',
      type: AnimalType.Pig,
    },
    {
      description: 'Curious and intelligent adult pig',
      dob: new Date(2004, 3, 31),
      gender: Gender.Female,
      name: 'Pepper',
      pictures: ['/uploads/1562512895486.jpg'],
      type: AnimalType.Pig,
    },
    {
      description:
        'Engineering masterpiece that glides elegantly through the sky',
      dob: new Date(2019, 4, 25),
      gender: Gender.Female,
      name: 'Falcon',
      type: AnimalType.Bird,
    },
    {
      description: 'Elegant and loyal white dog',
      dob: new Date(1994, 11, 25),
      gender: Gender.Male,
      name: 'Zero',
      pictures: ['/uploads/10354565_646075105472325_233361634_n.jpg'],
      type: AnimalType.Dog,
    },
    {
      description: "Charming AristoCat that's smooth talking and streetwise",
      dob: new Date(2008, 1, 7),
      gender: Gender.Male,
      name: "Thomas O'Malley",
      type: AnimalType.Cat,
    },
    {
      description: 'Miserable looking but famous grey and white cat',
      dob: new Date(2012, 4, 4),
      gender: Gender.Male,
      name: 'Grumpy Cat',
      type: AnimalType.Cat,
    },
    {
      description: 'Well tempered and loyal best friend',
      dob: new Date(2018, 6, 30),
      gender: Gender.Female,
      name: 'Lassie',
      pictures: [
        '/uploads/15258572_1191283014270712_6819793761170620416_n.jpg',
      ],
      type: AnimalType.Dog,
    },
    {
      description: 'Round yellow bird, very observant',
      dob: new Date(2003, 5, 3),
      gender: Gender.Female,
      name: 'Tweetie Pie',
      pictures: ['/uploads/56d1d6b3dcc30e3aaf3639c3ec65da2a.jpg'],
      type: AnimalType.Bird,
    },
    {
      description:
        'Kind and compassionate but brave on occasion who loves acorns',
      dob: new Date(2018, 8, 17),
      gender: Gender.Male,
      name: 'Piglet',
      pictures: ['/uploads/5f944d806c6bbdb1c31cdd7e62239a7d.jpg'],
      type: AnimalType.Pig,
    },
  ];

  // tslint:disable-next-line: no-console
  console.log('Animals population: loading data...');
  await Promise.all(animals.map((item) => Animals.create(item)));
  animals = await Animals.listAll();
  // tslint:disable-next-line: no-console
  console.log('Animals population: loaded data.');
};

export const populateRequests = async () => {
  if (deleteAll) await AdoptionRequests.deleteAll();
  const retrievedData = await AdoptionRequests.listAll();
  if (retrievedData.length > 0) {
    adoptionRequests = retrievedData;
    // tslint:disable-next-line: no-console
    console.log('Adoption Requests population: already loaded.');
    return;
  }

  adoptionRequests = [
    {
      animal: animals[0].id,
      status: AdoptionRequestStatus.Pending,
      user: users[2].id,
    },
    {
      animal: animals[4].id,
      status: AdoptionRequestStatus.Approved,
      user: users[2].id,
    },
    {
      animal: animals[6].id,
      status: AdoptionRequestStatus.Denied,
      user: users[3].id,
    },
    {
      animal: animals[2].id,
      status: AdoptionRequestStatus.Approved,
      user: users[3].id,
    },
    {
      animal: animals[0].id,
      status: AdoptionRequestStatus.Pending,
      user: users[3].id,
    },
  ];

  // tslint:disable-next-line: no-console
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
  // tslint:disable-next-line: no-console
  console.log('Adoption Requests population: loaded data.');
};
