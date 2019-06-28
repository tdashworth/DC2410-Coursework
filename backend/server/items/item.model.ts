import { Document, model, Schema } from 'mongoose';
import { SchemaDef } from '../../types';
// import { Item } from 'dc2410-coursework-common';

interface Item { name: string; value: number; }

// Declare model interface
interface ItemDoc extends Item, Document {}

// Define model schema
const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default model<ItemDoc>('Item', itemSchema);
