import {
  BatchWriteItemCommand,
  DynamoDBClient,
  type WriteRequest,
} from '@aws-sdk/client-dynamodb';
import couples from '../../src/json/coupleseeddata.json';

const client = new DynamoDBClient({});
const tableName = process.env.COUPLE_TABLE_NAME;

const writeBatch = async (table: string, requests: WriteRequest[]) => {
  let unprocessedItems: Record<string, WriteRequest[]> = { [table]: requests };

  while (Object.keys(unprocessedItems).length > 0) {
    const response = await client.send(
      new BatchWriteItemCommand({ RequestItems: unprocessedItems }),
    );
    unprocessedItems = response.UnprocessedItems ?? {};
  }
};

export const handler = async (event: {
  RequestType: string;
  PhysicalResourceId?: string;
}) => {
  if (event.RequestType === 'Delete') {
    return { PhysicalResourceId: event.PhysicalResourceId ?? 'CoupleSeed2026' };
  }

  if (!tableName) {
    throw new Error('COUPLE_TABLE_NAME is required');
  }

  const timestamp = new Date().toISOString();
  const requests = couples.map((couple) => ({
    PutRequest: {
      Item: {
        id: {
          S: `${couple.categoryId.toLowerCase().replace('_', '-')}-couple-${couple.coupleNumber}`,
        },
        coupleNumber: { N: String(couple.coupleNumber) },
        name: { S: couple.name },
        categoryId: { S: couple.categoryId },
        female: {
          M: {
            firstName: { S: couple.female.firstName },
            lastName: { S: couple.female.lastName },
          },
        },
        male: {
          M: {
            firstName: { S: couple.male.firstName },
            lastName: { S: couple.male.lastName },
          },
        },
        createdAt: { S: timestamp },
        updatedAt: { S: timestamp },
      },
    },
  }));

  for (let index = 0; index < requests.length; index += 25) {
    await writeBatch(tableName, requests.slice(index, index + 25));
  }

  return { PhysicalResourceId: 'CoupleSeed2026' };
};