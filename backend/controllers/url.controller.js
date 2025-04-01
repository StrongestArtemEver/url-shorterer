import {client} from '../models/db.js'
import {redis} from '../models/redis.js'

export async function getShortLink(shortLink){
    try{
        let link = redis.get(shortLink)
    if(link){
        console.log("return link from redis")
        return link
    }
    link = await client`
    select * from urls where short_url like ${shortLink}
    `
    console.log("return link from postgres")
    return link

    }catch(e){
        console.log(e)
    }
}

export async function createShortLink(link){
    console.log(`link :::::::::::::; ${link} `)
    let shortLink = createRandomString(6)
    let fullUrl = `http://127.0.0.1:3000/:${shortLink}`
    await addUrlToDB(link,shortLink)
    await redis.set(shortLink,link)

    return shortLink
}

export async function getUrlStats(shortLink) {
    return await client`select follows from urls where short_url like ${shortLink}` 
}

async function addUrlToDB(link,shortLink){
    try{
        await client`
        INSERT INTO urls (url, short_url,follows) values (${link}, ${shortLink}, 0)
        `
    }catch(e){
        console.log(e)
    }
}

function createRandomString(stringLength) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""

    for(let i = 0 ;i< stringLength;i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}