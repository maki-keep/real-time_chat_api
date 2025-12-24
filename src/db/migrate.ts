import { fileURLToPath } from 'node:url';
import {
  dirname,
  join
} from 'node:path';
import { readFileSync } from 'node:fs';
import { knex } from './knex.ts';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const run = async () => {
  const sqlPath = join(__dirname, 'migrations', '001_init.sql');
  const sql = readFileSync(sqlPath, 'utf8');

  try {
    console.log('Running migration...');
    await knex.raw(sql);
    console.log('Migration complete.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await knex.destroy();
  }
}

await run();

export default run;
