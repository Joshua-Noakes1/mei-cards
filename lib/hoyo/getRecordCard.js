// HoYoLab allows users to share their Genshin, Honkai 3rd and Star Rail game stats on their profile;

require("dotenv").config();
const fetch = require("isomorphic-unfetch");

async function getRecordCard(game) {
    // check for game and uid
    if (!game || game == "") {
        return { success: false };
    }

    // get HoYoLab record card
    let hoyolabRecordCard;
    try {
        let hoyolabRecordCardRAW = await fetch(`https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard?uid=${process.env.HOYOLAB_ID}`, {
            "method": "GET",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0; github:Joshua-Noakes1) Gecko/20100101 Firefox/115.0",
                "Accept": "application/json, text/plain, */*",
                "x-rpc-language": "en-us",
                "Cookie": `ltoken=${process.env.HOYOLAB_TOKEN};ltuid=${process.env.HOYOLAB_ID};` // HoYoLAB only cares about the LToken and LTUID cookies
            }
        });

        // check the data from hoyolab
        hoyolabRecordCard = await hoyolabRecordCardRAW.json();
        if (hoyolabRecordCard["retcode"] != 0) { // cringe hoyolab devs don't use http status codes (I don't but that because of cloudflare)
            throw new Error(`HoYoLab returned an error, "${hoyolabRecordCard["message"]}"`);
        }
        if (hoyolabRecordCard["data"]["list"].length <= 0) {
            throw new Error(`No games found on HoYoLab profile, Games Found: ${hoyolabRecordCard["data"]["list"].length}`);
        }
        return { success: true, hoyolabRecordCard };
    } catch (err) {
        console.log(err);
        return { success: false };
    }
}

module.exports = getRecordCard;