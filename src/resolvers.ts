import { processCSVStream } from "./csvProccess/csvProcessor";
import Producer from "./models/Producer";
import Product from "./models/Product";

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

  createProducts: async ({ input }: { input: CreateProductInput[] }) => {
    try {
      const products = await Promise.all(input.map(async (productInput) => {
        const { vintage, name, producerId } = productInput;
        const product = new Product({ vintage, name, producerId });
        await product.save();
        return product;
      }));
      return products;
    } catch (error:any) {
      error.message = "Error creating products due "+error.message;
      throw new Error(error);
    }
  },

  createProducer: async ({ input }: { input: CreateProducerInput }) => {
    try {
      const producer = new Producer(input);
      await producer.save();
      return producer;
    } catch (error:any) {
      error.message = "Error creating producer due "+error.message;
      throw new Error(error);
    }
  },

  updateProduct: async ({ _id, input }: { _id: string, input: UpdateProductInput }) => {
    try {
      const product = await Product.findByIdAndUpdate(_id, input, { new: true });
      if (!product) {
        return null;
      }
      const producer = await Producer.findById(product.producerId);
      return { ...product.toObject(), producer };
    } catch (error:any) {
      error.message = "Error updating product due "+error.message;
      throw new Error(error);
    }
  },
  deleteProducts: async ({ ids }: { ids: string[] }) => {
    try {
      await Product.deleteMany({ _id: { $in: ids } });
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
