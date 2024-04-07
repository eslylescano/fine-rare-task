import mongoose, { Schema, Document } from 'mongoose';

export interface IProducer extends Document {
  name: string;
  country?: string;
  region?: string;
}

const ProducerSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String },
  region: { type: String },
});

export default mongoose.model<IProducer>('Producer', ProducerSchema);
