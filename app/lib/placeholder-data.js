// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
      id: "221",
      name: "Sherlock",
      username: "sherlock.h",
      password: "iamsherlockholmes",
  },
  {
      id: "222",
      name: "John",
      username: "john.w",
      password: "iamjohnwatson",
  },
  {
      id: "223",
      name: "Mrs. Hudson",
      username: "mrs.hudson",
      password: "iamnotyourhousekeeper",
  },
]

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const tasksTodoPage01 = {
    tasks: [
        {
            id: "cbb0732a-c9ab-4855-b66f-786cd41a3cd1",
            title: "Read a book",
            description: "Spend an hour reading a book for pleasure",
            createdAt: "2023-03-24T19:30:00Z",
            status: "TODO"
        },
        {
            id: "119a8c45-3f3d-41da-88bb-423c5367b81a",
            title: "Exercise",
            description: "Go for a run or do a workout at home",
            createdAt: "2023-03-25T09:00:00Z",
            status: "TODO"
        },
        {
            id: "ab7e3eb3-058d-44de-bb97-01b35d2b2c29",
            title: "Pay bills",
            description: "Pay monthly bills and schedule future payments",
            createdAt: "2023-03-25T14:00:00Z",
            status: "TODO"
        },
        {
            id: "67cbf4e4-c81e-4c8e-aa1e-6efc7e75b0a8",
            title: "Write a letter",
            description: "Write a letter to a family member or friend",
            createdAt: "2023-03-27T15:45:00Z",
            status: "TODO"
        },
        {
            id: "c59ca7e3-d158-4f9a-b4db-618926a4f5d5",
            title: "Clean the kitchen",
            description: "Clean the countertops, sink, and stovetop",
            createdAt: "2023-03-28T12:30:00Z",
            status: "TODO"
        },
        {
            id: "8992a148-74db-49de-877a-691be7cb9c9f",
            title: "Try a new recipe",
            description: "Find a new recipe to try for dinner",
            createdAt: "2023-03-28T18:00:00Z",
            status: "TODO"
        },
        {
            id: "09eaa2d7-c9b9-429e-94fb-8426b68df6e1",
            title: "Call a friend",
            description: "Catch up with a friend over the phone",
            createdAt: "2023-03-30T16:15:00Z",
            status: "TODO"
        },
        {
            id: "1b9c0030-6c96-4d1b-9c63-1d8ec7b49fa6",
            title: "Take a walk",
            description: "Go for a walk outside and enjoy the fresh air",
            createdAt: "2023-03-31T11:45:00Z",
            status: "TODO"
        },
        {
            id: "b36c4603-3d22-4f06-8e70-04af4b4c4f79",
            title: "Organize bookshelf",
            description: "Sort books by genre and alphabetize",
            createdAt: "2023-04-01T10:30:00Z",
            status: "TODO"
        },
        {
            id: "1cb357aa-78e9-46a3-a012-46250b1a15b7",
            title: "Do laundry",
            description: "Wash and fold clothes that have piled up",
            createdAt: "2023-04-01T13:00:00Z",
            status: "TODO"
        }
    ],
    pageNumber: 1,
    totalPages: 3
}

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  tasksTodoPage01,
};
