# mei-cards

Use your HoYoLAB data to generate cards with your Genshin Impact, Honkai Impact 3rd, Honkai: Star Rail and Zenless Zone Zero stats!  
<small>This project is not affiliated with miHoYo, they could decide to ban you for using it. [[2.3.vii HoYoVerse Account - Terms of Service](https://account.hoyoverse.com/?lang=en-us&bbs_theme=dark&bbs_theme_device=1#/about/userAgreement)]</small>

## Examples

### Honkai Impact 3rd

<span style="display:block;text-align:center">[![Example](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-honkai.png)](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-honkai.png)</span>

### Genshin Impact

<span style="display:block;text-align:center">[![Example](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-genshin.png)](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-genshin.png)</span>

### Honkai: Star Rail

<span style="display:block;text-align:center">[![Example](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-starRail.png)](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-starRail.png)</span>

### Zenless Zone Zero

<span style="display:block;text-align:center">[![Example](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-zzz.png)](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/card-zzz.png)</span>

## Usage

This project has been built around running on Vercel, but with some work it should run on Express or any other Node.js server.

Currently four of HoYoVerses' games are supported: Honkai Impact 3rd, Genshin Impact, Honkai: Star Rail and Zenless Zone Zero. Each are accessed with the same URL but with a different "game" parameter.

| Game              | URL                            | Parameter |
| ----------------- | ------------------------------ | --------- |
| Honkai Impact 3rd | /api/v1/getCard?game=honkai3rd | honkai3rd |
| Genshin Impact    | /api/v1/getCard?game=genshin   | genshin   |
| Honkai: Star Rail | /api/v1/getCard?game=starrail  | starrail  |
| Zenless Zone Zero | /api/v1/getCard?game=zzz       | zzz       |

### Deploying

You can either deploy with the Deploy with Vercel button or you can manually deploy with the steps below.

#### 1. Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoshua-Noakes1%2Fmei-cards&env=HOYOLAB_TOKENV2,HOYOLAB_TOKEN,HOYOLAB_ID)

<hr>

#### 1. Forking the repository

Click the fork button in the top right of the repository page.  
![deploy-0.png](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/deploy-0.png)

#### 2. Getting your HoYoLAB cookies

- Go to [HoYoLAB](https://www.hoyolab.com/) (<https://www.hoyolab.com/>) and log in.
- Go to your profile page.
- Open the developer tools (F12 or Ctrl+Shift+I).
- Go to the "Network" tab.
- Click on the "Preserve Log" / "Persist Logs" button. (On FireFox this is under the gear icon in the top right of the network tab).
- Refresh the page.
- Click on the getGameRecordCard request where the method is "GET" (it should be named "getGameRecordCard" with your HoYoLab UID).
- Go to the "Cookies" tab.
- Copy the "ltoken" or "ltoken_v2" cookie value.
- Copy the "ltuid" or "ltuid_v2" cookie value.

![deploy-1.png](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/deploy-1.png)

#### 3. Deploying to Vercel

Before you deploy to Vercel you'll need to create a new project and link it to your GitHub repository. You'll then need to add the following environment variables:

| Variable        | Description                                                                                                       | Optional | Example                |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | -------- | ---------------------- |
| HOYOLAB_TOKENV2 | If the cookie you copied from HoYoLAB includes "ltoken_v2" at the start then set this to `true`, otherwise set this to `false`. | Yes      | `true`                   |
| HOYOLAB_TOKEN   | The value of the "ltoken" or "ltoken_v2" cookie.                                                                  | No       | `aXDNHHbL8FVbvbv1d4AVuD` |
| HOYOLAB_ID      | The value of the "ltuid" or "ltuid_v2" cookie.                                                                    | No       | `123456789`              |

![deploy-2.png](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/deploy-2.png)

#### 4. Using the API

You can now use the API by sending a GET request to the URL of your Vercel project with the game parameter set to the game you want to get the card for.

| Game              | URL                            | Parameter |
| ----------------- | ------------------------------ | --------- |
| Honkai Impact 3rd | /api/v1/getCard?game=honkai3rd | honkai3rd |
| Genshin Impact    | /api/v1/getCard?game=genshin   | genshin   |
| Honkai: Star Rail | /api/v1/getCard?game=starrail  | starrail  |
| Zenless Zone Zero | /api/v1/getCard?game=zzz       | zzz       |

## Swapping the backgrounds

If you want to use a different image as the background for your selected game you can do so by replacing the image in the `lib/hoyo/images` folder. The image should be a 2400x1200 JPG file.

For example, if you wanted to change the background for Honkai: Star Rail you would replace the `starrail.jpg` file with your new image.

## Attribution

This project is not affiliated with miHoYo, HoYoverse, Cognosphere, or any other entities related to miHoYo, including but not limited to the games Genshin Impact, Honkai Impact 3rd, Honkai: Star Rail, Zenless Zone Zero, and the HoYoLab platform. We do not claim ownership of any of the assets used in this project; all rights and intellectual property belong to their respective owners. This project is a fan-made work, and it is created with respect for the original creators and their work.
