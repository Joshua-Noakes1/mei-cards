// HoYoLab allows users to share their Genshin, Honkai 3rd and Star Rail game stats on their profile;

require("dotenv").config();
const fetch = require("isomorphic-unfetch");

async function getRecordCard(game, lang) {
    // check for game and uid
    if (!game || game == "") {
        return { success: false };
    }
    if (!lang || lang == "") {
        if (process.env.HOYOLAB_LANG) {
            lang = process.env.HOYOLAB_LANG;
        } else {
            lang = "en-us";
        }
    }
    // get HoYoLab record card
    let hoyolabRecordCard;
    try {
        let hoyolabRecordCardRAW = await fetch(`https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard?uid=${process.env.HOYOLAB_ID}`, {
            "method": "GET",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0; github:Joshua-Noakes1 mei-cards) Gecko/20100101 Firefox/115.0",
                "Accept": "application/json, text/plain, */*",
                "x-rpc-language": `${lang}`,
                "Cookie": `${process.env.HOYOLAB_TOKENV2 == "true" ? "ltoken_v2" : "ltoken"}=${process.env.HOYOLAB_TOKEN};${process.env.HOYOLAB_TOKENV2 == "true" ? "ltuid_v2" : "ltuid"}=${process.env.HOYOLAB_ID};` // HoYoLAB only cares about the LToken and LTUID cookies
            }
        });

        // check and return the data from hoyolab
        hoyolabRecordCard = await hoyolabRecordCardRAW.json();
        if (hoyolabRecordCard["retcode"] != 0) { // cringe hoyolab devs don't use http status codes (I don't but that because of cloudflare)
            throw new Error(`HoYoLab returned an error, "${hoyolabRecordCard["message"]}"`);
        }
        if (hoyolabRecordCard["data"]["list"].length <= 0) {
            throw new Error(`No games found on HoYoLab profile, Games Found: ${hoyolabRecordCard["data"]["list"].length}`);
        }
        hoyolabRecordCard = [...hoyolabRecordCard["data"]["list"]];
    } catch (err) {
        console.log(err.message);
        return { success: false };
    }

    // filter and return the actual json for the single game eg honkai 3rd: game_id 1; genshin impact: game_id 2; star rail: game_id 6
    try {
        hoyolabRecordCard = { ...hoyolabRecordCard.filter((gameRecord) => gameRecord["game_id"].toString() == game)[0] };
    } catch (err) {
        console.log(`Failed to format HoYoLab record card, ${err.message}`);
        return { success: false };
    }

    return { success: true, hoyolabRecordCard };
}

module.exports = getRecordCard;