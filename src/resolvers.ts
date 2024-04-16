import { processCSVStream } from "./csvProccess/csvProcessor";
import Producer from "./models/Producer";
import Product from "./models/Product";

interface Context {
  Product: typeof Product;
  Producer: typeof Producer;
}


interface CreateProductInput {
  vintage: string;
  name: string;
  producerId: string;
}

interface UpdateProductInput {
  vintage?: string;
  name?: string;
}

interface CreateProducerInput {
  name: string;
  country?: string;
  region?: string;
}

export const resolvers = {
  product: async ({ _id }: { _id: string }, context: Context) => {
    const product = await context.Product.findById(_id).populate('producerId');
    if (!product) {
      return null;
    }
    const producer = await context.Producer.findById(product.producerId);
    return { ...product.toObject(), producer };
  },

  producer: async ({ _id }: { _id: string }, context: Context) => {
    return await context.Producer.findById(_id);
  },

  products: async ({ producerId }: { producerId: string }, context: Context) => {
    const products = await context.Product.find({ producerId });
    return products;
  },

  createProducts: async ({ input }: { input: CreateProductInput[] }, context: Context) => {
    try {
      const products = await Promise.all(input.map(async (productInput) => {
        const { vintage, name, producerId } = productInput;
        const product = new context.Product({ vintage, name, producerId });
        await product.save();
        return product;
      }));
      return products;
    } catch (error:any) {
      error.message = "Error creating products due "+error.message;
      throw new Error(error);
    }
  },

  createProducer: async ({ input }: { input: CreateProducerInput }, context: Context) => {
    try {
      const producer = new context.Producer(input);
      await producer.save();
      return producer;
    } catch (error:any) {
      error.message = "Error creating producer due "+error.message;
      throw new Error(error);
    }
  },

  updateProduct: async ({ _id, input }: { _id: string, input: UpdateProductInput }, context: Context) => {
    try {
      const product = await context.Product.findByIdAndUpdate(_id, input, { new: true });
      if (!product) {
        return null;
      }
      const producer = await context.Producer.findById(product.producerId);
      return { ...product.toObject(), producer };
    } catch (error:any) {
      error.message = "Error updating product due "+error.message;
      throw new Error(error);
    }
  },
  deleteProducts: async ({ ids }: { ids: string[] }, context: Context) => {
    try {
      await context.Product.deleteMany({ _id: { $in: ids } });
      return true;
    } catch (error:any) {
      error.message = "Error deleting products due "+error.message;
      throw new Error(error);
    }
  },
  startCSVImport: async () => {
    processCSVStream();
    return true;
  }
};
