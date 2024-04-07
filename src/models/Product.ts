import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    vintage: string;
    name: string;
    producerId: mongoose.Types.ObjectId;
}

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>({
    vintage: String,
    name: String,
    producerId: {
        type: Schema.Types.ObjectId,
        ref: 'Producer'
    }
});

export default mongoose.model<IProduct>('Product', productSchema);
