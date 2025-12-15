const fs = require('fs');
const path = require('path');
const { knex } = require('./knex');
require('dotenv').config();

async function run() {
  const sqlPath = path.join(__dirname, 'migrations', '001_init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
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

if (require.main === module) {
  run();
}

module.exports = run;
