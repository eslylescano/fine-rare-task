import Producer from "../models/Producer";
import Product from "../models/Product";

export async function upsertBatch(batch: any[]) {
  try {
    const bulkOps = [];

    const uniqueProducers = [...new Set(batch
      .filter(entry => entry.Producer) 
      .map(entry => ({ name: entry.Producer, country: entry.Country, region: entry.Region })))
    ];

    for (const producerObject of uniqueProducers) {
      let producer = await Producer.findOne({ name: producerObject.name });
      if (!producer) {
        producer = await Producer.create(producerObject);
      }
    }

    for (const entry of batch) {
      if (!entry.Producer) continue;
      const producer = await Producer.findOne({ name: entry.Producer });
      bulkOps.push({
        updateOne: {
          filter: { 
            vintage: entry.Vintage,
            name: entry['Product Name'],
            producerId: producer ? producer._id : null
          },
          update: { $set: entry },
          upsert: true
        }
      });
    }

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      console.log(`Upserted ${result.upsertedCount} documents`);
      return result;
    } else {
      console.log("No documents to upsert");
      return { upsertedCount: 0 };
    }
  } catch (error) {
    console.error('Error upserting batch:', error);
    throw error;
  }
}
