import fs from 'fs';
import csv from 'csv-parser';
import path from 'path'; 


export async function processCSVStream() {
  const fileName = 'all_listings.csv';
  const filePath = path.join(__dirname, fileName);
  const batchSize = 100;
  let batchCount = 0;
  let batch: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      batch.push(row);

      if (batch.length === batchSize) {
        //await upsertBatch(batch);
        batch = [];
        batchCount++;
        console.log(`Processed ${batchCount} batches`);
      }
    })
    .on('end', async () => {
      if (batch.length > 0) {
        //await upsertBatch(batch);
        console.log('CSV import completed');
      }
    })
    .on('error', (error) => {
      console.error('Error processing CSV stream:', error);
    });
}

