import './amplify-config.js';
import { generateClient } from 'aws-amplify/data';

const client = generateClient({
  authMode: 'identityPool',
});

export async function getCategories() {
  const { data: categories, errors } =
    await client.models.Category.list({
      authMode: 'identityPool',
    });

  if (errors) {
    console.error('Error getting categories:', errors);
    return [];
  }

  console.log(categories);
  return categories;
}

export async function getAllCouples(nextToken) {
  const { data: couples, errors, nextToken: nextPageToken } =
    await client.models.Couple.list({
      nextToken,
      selectionSet: [
        'coupleNumber',
        'id',
        'name',
        'category.name',
        'category.id',
        'category.competition.name',
        'category.competition.id',
      ],
      authMode: 'identityPool',
    });

  if (errors) {
    console.error('Error getting couples:', errors);
    return { couples: [], nextToken: null };
  }

  return { couples, nextToken: nextPageToken };
}



