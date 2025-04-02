import { client } from '../models/db.js';
import { redis } from '../models/redis.js';

export async function getShortLink(shortLink) {
  try {
    let link = redis.get(shortLink);
    if (link) {
      console.log('return link from redis');
      return link;
    }
    link = await client`
    select * from urls where short_url like ${shortLink}
    `;
    console.log('return link from postgres');
    return link;
  } catch (e) {
    console.log(e);
  }
}

export async function createShortLink(link) {
  try {
    let shortLink = createRandomString(6);
    await addUrlToDB(link, shortLink);
    await redis.set(shortLink, link);

    return shortLink;
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }

    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
}

export async function getUrlStats(shortLink) {
  try {
    return await client`select follows from urls where short_url like ${shortLink}`;
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }

    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
}

async function addUrlToDB(link, shortLink) {
  try {
    await client`
        INSERT INTO urls (url, short_url,follows) values (${link}, ${shortLink}, 0)
        `;
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }

    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
}

function createRandomString(stringLength) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  try {
    for (let i = 0; i < stringLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }

    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
}

export async function updateUrlStats(shortLink) {
  try {
    const stats = await getUrlStats(shortLink);
    const follows = stats[0].follows + 1;
    await client`update urls set follows = ${follows} where short_url like ${shortLink}`;
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }

    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
}
