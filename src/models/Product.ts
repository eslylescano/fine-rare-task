import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
    vintage: string;
    name: string;
    producerId: mongoose.Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProduct>({
    vintage: String,
    name: String,
    producerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer'
    }
});

export default mongoose.model<IProduct>('Product', productSchema);
