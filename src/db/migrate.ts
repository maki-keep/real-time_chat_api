import projectRootPath from '../projectRootPath.js';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { knex } from './knex.js';
import 'dotenv/config';

const run = async () => {
  const sqlPath = join(projectRootPath, 'migrations', '001_init.sql');
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
