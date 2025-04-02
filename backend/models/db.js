import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const DB_CONNECTION = process.env.DB_CONNECTION;

export const client = postgres(DB_CONNECTION);

createStartTables();

async function createStartTables() {
  try {
    await client`
    create table if not exists urls(
        id SERIAL primary key,
        url varchar(200) not null,
        short_url varchar(100) not null,
        follows int not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null
    )`;
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }

    throw new Error(`Unknown Postgres Error: ${JSON.stringify(e)}`);
  }
}
