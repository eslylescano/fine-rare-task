import Producer from "./models/Producer";
import Product from "./models/Product";

export const resolvers = {
  product: async ({ _id }: { _id: string }) => {
      const product = await Product.findById(_id).populate('producerId');
      if (!product) {
        return null;
      }
      const producer = await Producer.findById(product.producerId);
      return { ...product.toObject(), producer };
  },

  producer: async ({ _id }: { _id: string }) => {
    return await Producer.findById(_id);
  },

  products: async ({ producerId }: { producerId: string }) => {
    const products = await Product.find({ producerId });
    return products;
  },
};
