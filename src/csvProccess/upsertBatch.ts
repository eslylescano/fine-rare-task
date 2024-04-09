import Producer from "../models/Producer";
import Product from "../models/Product";

export async function upsertBatch(batch: any[]) {
  try {

    const uniqueProducers = [...new Set(batch
      .filter(entry => entry.Producer) 
      .map(entry => JSON.stringify({ name: entry.Producer, country: entry.Country, region: entry.Region })))
    ].map(str => JSON.parse(str));


    const producerPromises = uniqueProducers.map(async (producerObject) => {
      let producer = await Producer.findOne({ name: producerObject.name });
      if (!producer) {
        producer = await Producer.create(producerObject);
      }
      return producer;
    });

    const producers = await Promise.all(producerPromises);


    const productPromises = batch.map(async (entry) => {
      if (!entry.Producer) return; 
      const producer = producers.find(producer => producer.name === entry.Producer);
      return Product.findOneAndUpdate(
        {
          vintage: entry.Vintage,
          name: entry['Product Name'],
          producerId: producer ? producer._id : null
        },
        entry,
        { upsert: true, new: true }
      );
    });

    const result = await Promise.all(productPromises);

    console.log(`Upserted ${result.length} documents`);

    return result;
  } catch (error) {
    console.error('Error upserting batch:', error);
    throw error;
  }
}
