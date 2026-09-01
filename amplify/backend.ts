import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { CustomResource, Duration } from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'node:path';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const seedStack = backend.createStack('couple-seed');
const coupleTable = backend.data.resources.tables.Couple;
const seedHandler = new NodejsFunction(seedStack, 'CoupleSeedHandler', {
  entry: join(import.meta.dirname, 'seed/couple-seed-handler.ts'),
  runtime: Runtime.NODEJS_22_X,
  timeout: Duration.minutes(2),
  environment: {
    COUPLE_TABLE_NAME: coupleTable.tableName,
  },
});

coupleTable.grantWriteData(seedHandler);

const seedProvider = new Provider(seedStack, 'CoupleSeedProvider', {
  onEventHandler: seedHandler,
});

new CustomResource(seedStack, 'CoupleSeed', {
  serviceToken: seedProvider.serviceToken,
  properties: {
    datasetVersion: '2026-1',
  },
});
