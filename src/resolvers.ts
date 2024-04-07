import Producer from "./models/Producer";
import Product from "./models/Product";

export const resolvers = {

  product: async ({ _id }: { _id: string }) => {
    return await Product.findById(_id);
  },

  producer: async ({ _id }: { _id: string }) => {
    return await Producer.findById(_id);
  },
};
