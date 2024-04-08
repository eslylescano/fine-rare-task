import Producer from "../models/Producer";
import Product from "../models/Product";

export async function upsertBatch(batch: any[]) {
  try {
    const bulkOperations = batch.map(async (entry) => {
      if (!entry || !entry.data || !entry.data.Producer) {
        console.error('Invalid entry:', entry);
        return null;
      }

      const data = entry.data;

      let producer = await Producer.findOne({ name: data.Producer });
      if (!producer) {
        producer = await Producer.create({ name: data.Producer });
      }

      return Product.findOneAndUpdate(
        {
          vintage: data.Vintage,
          name: data['Product Name'],
          producerId: producer ? producer._id : null
        },
        data,
        { upsert: true, new: true }
      );
    });

    const validOperations = bulkOperations.filter(op => op !== null);

    const result = await Promise.all(validOperations);

    console.log(`Upserted ${result.length} documents`);

    return result;
  } catch (error) {
    console.error('Error upserting batch:', error);
    throw error;
  }
}
