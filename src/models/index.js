// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Category = {
  "MAIN": "MAIN",
  "SIDE": "SIDE",
  "DESSERT": "DESSERT",
  "DRINK": "DRINK",
  "OTHER": "OTHER"
};

const { Food } = initSchema(schema);

export {
  Food,
  Category
};