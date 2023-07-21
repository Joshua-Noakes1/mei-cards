
const getRecordCard = require('../../lib/hoyo/getRecordCard');
const gameConfig = require('../../lib/hoyo/gameConfig.json');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('@napi-rs/canvas');


export default async function handler(req, res) {
  try {
    // do card
    let { game } = req.query;
    if (!game) {
      return res.status(400).json({ success: false, error: 'Missing game' });
    }
    if (game != 'genshin' && game != 'honkai3rd' && game != 'starrail') {
      return res.status(400).json({ success: false, error: 'Invalid game' });
    }

    // get game config form name
    let gameConfigData = gameConfig.find((gameConfig) => gameConfig.code_name == game);

    // let hoyolabRecordCard = await getRecordCard(gameConfigData.code);
    // if (!hoyolabRecordCard.success) {
    //   return res.status(400).json({ success: false, error: 'Failed to get data from HoYoLab' });
    // }
    // console.log(hoyolabRecordCard);

    let hoyolabRecordCard = {
      success: true,
      hoyolabRecordCard: {
        has_role: true,
        game_id: 1,
        game_role_id: '206647475',
        nickname: 'Kira',
        region: 'eur01',
        level: 57,
        background_image: 'https://upload-os-bbs.mihoyo.com/game_record/honkai3rd/background.png',
        is_public: true,
        data: [
          {
            "name": "Days Active",
            "type": 1,
            "value": "262"
          },
          {
            "name": "Characters",
            "type": 1,
            "value": "35"
          },
          {
            "name": "Achievements",
            "type": 1,
            "value": "308"
          },
          {
            "name": "Spiral Abyss",
            "type": 1,
            "value": "4-3"
          }
        ],
        region_name: 'Europe Server',
        url: 'https://act.hoyolab.com/app/community-game-records-sea/m.html?bbs_presentation_style=fullscreen&bbs_auth_required=true&gid=1&user_id=244675617&utm_source=hoyolab&utm_medium=gamecard',
        data_switches: [
          {
            "switch_id": 1,
            "is_public": true,
            "switch_name": "Show my Battle Chronicle on my profile"
          },
          {
            "switch_id": 2,
            "is_public": true,
            "switch_name": "Show your Character Details in the Battle Chronicle?"
          },
          {
            "switch_id": 3,
            "is_public": true,
            "switch_name": "Do you want to enable your \"Real-Time Notes\" to view your in-game data?"
          }
        ],
        h5_data_switches: [],
        background_color: '00C3FF'
      }
    }

    try {
      // make canvas
      const cardCanvas = createCanvas(2400, 1200);
      const cardCTX = cardCanvas.getContext('2d');

      // load background based on game
      let gameBackground = await loadImage(fs.readFileSync(path.join(__dirname, '../', '../', 'lib', 'hoyo', 'images', `${game}.jpg`)));
      cardCTX.drawImage(gameBackground, 0, 0, 2400, 1200);

      // make a "dark" overlay
      cardCTX.fillStyle = 'rgba(0, 0, 0, 0.5)';
      cardCTX.fillRect(0, 0, 2400, 1200);

      // set font to hoyolab one
      cardCTX.font = 'bold 75px "Segoe UI"';
      cardCTX.fillStyle = '#ffffff';

      // draw name
      cardCTX.fillText(gameConfigData.name, 75, 175);

      // send to client
      res.setHeader('Cache-Control', 'public, max-age 432000, stale-while-revalidate 86400');
      res.setHeader('Content-Type', 'image/png');
      const pngCanvas = await cardCanvas.toBuffer('image/png');
      return res.status(200).send(pngCanvas);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: 'Failed to make card' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}