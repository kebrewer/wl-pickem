import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export async function getCategories() {
  const { data: categories, errors } =
    await client.models.Category.list();

  if (errors) {
    console.error('Error getting categories:', errors);
    return [];
  }

  console.log(categories);
  return categories;
}



