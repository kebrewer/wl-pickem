import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({

  PersonName: a.customType({
    firstName: a.string().required(),
    lastName: a.string().required(),
  }),

  // ===============================
  // CATEGORY
  // ===============================
  Category: a.model({
    name: a.string().required(),
    description: a.string(),
    displayOrder: a.integer(),
    displayName: a.string(),
    votingOpen: a.boolean(),

    // One category has many couples
    couples: a.hasMany('Couple', 'categoryId'),

    // One category has many ballots
    ballots: a.hasMany('Ballot', 'categoryId'),
  }),

  // ===============================
  // COUPLE
  // ===============================
  Couple: a.model({
    coupleNumber: a.integer().required(),
    name: a.string().required(),
    female: a.ref('PersonName'),
    male: a.ref('PersonName'),
    imageUrl: a.string(),

    // Foreign key
    categoryId: a.id().required(),

    // Couple belongs to a category
    category: a.belongsTo('Category', 'categoryId'),
  }),

  // ===============================
  // VOTER
  // ===============================
  Voter: a.model({
    firstName: a.string(),
    lastName: a.string(),
    phoneNumber: a.string().required(),
    phoneVerified: a.boolean(),

    // One voter can have several ballots
    ballots: a.hasMany('Ballot', 'voterId'),
  }),

  // ===============================
  // BALLOT
  // ===============================
  Ballot: a.model({
    voterId: a.id().required(),
    categoryId: a.id().required(),

    firstPlaceCoupleId: a.id().required(),
    secondPlaceCoupleId: a.id().required(),
    thirdPlaceCoupleId: a.id().required(),

    voter: a.belongsTo('Voter', 'voterId'),
    category: a.belongsTo('Category', 'categoryId'),

  })

  // IMPORTANT:
  // One ballot per voter per category
  .identifier(['voterId', 'categoryId']),

})

// All voting data requires a voter authenticated through Cognito.
.authorization((allow) => [allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
