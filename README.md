# WL Pickem

WL Pickem is a Vite web application with an AWS Amplify Gen 2 backend for phone-based voter authentication, contest data, and ballots.

## Prerequisites

- Node.js 22 or later
- npm
- An AWS account and AWS CLI credentials if you deploy the backend locally
- An Amplify Hosting app connected to this repository for hosted deployments

## Run Locally

Install dependencies:

```zsh
npm install
```

Start the Vite development server:

```zsh
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Create a production build:

```zsh
npm run build
```

Preview the production build locally:

```zsh
npm run preview
```

## Deploy With Amplify

Amplify Hosting uses [amplify.yml](amplify.yml) to install dependencies, deploy the Gen 2 backend, build the Vite site, and publish the `dist` directory.

Push committed changes to the connected branch, usually `main`:

```zsh
git add .
git commit -m "Describe the change"
git push
```

Amplify then runs:

```zsh
npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
npm run build
```

## Seed The Couple Table

The Couple seed data is in [src/json/coupleseeddata.json](src/json/coupleseeddata.json). It contains 56 records and uses the deployed Category record IDs in each `categoryId` property.

The deployment seed is intentionally disabled by default in [amplify/backend.ts](amplify/backend.ts). This prevents a routine backend deployment from overwriting Couple records.

To seed the Couple table:

1. Confirm the category UUIDs in `coupleseeddata.json` match the Category records in the deployed database.
2. In `amplify/backend.ts`, uncomment the CDK imports in lines 4–10.
3. Uncomment the Couple seed-stack code below `const backend = defineBackend(...)` (currently lines 23–46).
4. Set `datasetVersion` to a new value, such as `2026-3`. Changing this value tells CloudFormation to run the seed custom resource again.
5. Commit and push the change:

```zsh
git add amplify/backend.ts amplify/seed/couple-seed-handler.ts src/json/coupleseeddata.json
git commit -m "Seed Couple table"
git push
```

The deployment creates a temporary Lambda-backed custom resource that writes the records to the generated DynamoDB Couple table. Records use deterministic IDs derived from their category UUID and `coupleNumber`, so rerunning the same seed updates those records rather than adding duplicates.

After Amplify reports a successful deployment, comment the imports and seed-stack block in `amplify/backend.ts` again. Commit and push that change so future backend deployments do not run the seed operation.

## Verify Backend Code

Run the Amplify TypeScript check before committing backend changes:

```zsh
npx tsc --noEmit --project amplify/tsconfig.json
```
