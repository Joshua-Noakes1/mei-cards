# mei-cards

Use your HoYoLAB data to generate cards with your Genshin Impact, Honkai Impact 3rd and Honkai: Star Rail stats!  
<small>This project is not affiliated with miHoYo, they could decide to ban you for using it. [[2.3.vii HoYoVerse Account - Terms of Service](https://account.hoyoverse.com/?lang=en-us&bbs_theme=dark&bbs_theme_device=1#/about/userAgreement)]</small>

## Examples

### Honkai Impact 3rd

<span style="display:block;text-align:center">![Example](https://mei-cards.vercel.app/api/v1/getCard?game=honkai3rd)</span>

### Genshin Impact

<span style="display:block;text-align:center">![Example](https://mei-cards.vercel.app/api/v1/getCard?game=genshin)</span>

### Honkai: Star Rail

<span style="display:block;text-align:center">![Example](https://mei-cards.vercel.app/api/v1/getCard?game=starrail)</span>

## Usage

This project has been built around running on Vercel, but with some work it should run on Express or any other Node.js server.

Currently three of HoYoVerses' games are supported: Honkai Impact 3rd, Genshin Impact and Honkai: Star Rail. Each are accessed with the same URL but with a different "game" parameter.

| Game              | URL                            | Parameter |
| ----------------- | ------------------------------ | --------- |
| Honkai Impact 3rd | /api/v1/getCard?game=honkai3rd | honkai3rd |
| Genshin Impact    | /api/v1/getCard?game=genshin   | genshin   |
| Honkai: Star Rail | /api/v1/getCard?game=starrail  | starrail  |

### Deploying

#### 1. Forking the repository

Click the fork button in the top right of the repository page.  
![deploy-0.png](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/deploy-0.png)

#### 2. Getting your HoYoLAB cookies

- Go to [HoYoLAB](https://www.hoyolab.com/) (https://www.hoyolab.com/) and log in.
- Go to your profile page.
- Open the developer tools (F12 or Ctrl+Shift+I).
- Go to the "Network" tab.
- Click on the "Preserve Log" / "Persist Logs" button.
- Refresh the page.
- Click on the getGameRecordCard request where the method is "GET" (it should be named "getGameRecordCard" with your HoYoLab UID).
- Go to the "Cookies" tab.
- Copy the "ltoken" or "ltoken_v2" cookie value.
- Copy the "ltuid" or "ltuid_v2" cookie value.

![deploy-1.png](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/deploy-1.png)

#### 3. Deploying to Vercel

Before you deploy to Vercel you'll need to create a new project and link it to your GitHub repository. Then you'll need to add the following environment variables:

| Variable        | Description                                                                                                       | Optional | Example                |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | -------- | ---------------------- |
| HOYOLAB_TOKENV2 | If the cookie you copied from HoYoLAB was "ltoken_v2" then set this to true, otherwise skip adding this variable. | Yes      | true                   |
| HOYOLAB_TOKEN   | The value of the "ltoken" or "ltoken_v2" cookie.                                                                  | No       | aXDNHHbL8FVbvbv1d4AVuD |
| HOYOLAB_ID      | The value of the "ltuid" or "ltuid_v2" cookie.                                                                    | No       | 123456789              |

![deploy-2.png](https://raw.githubusercontent.com/Joshua-Noakes1/mei-cards/main/.github/images/deploy-2.png)

#### 4. Using the API

You can now use the API by sending a GET request to the URL of your Vercel project with the game parameter set to the game you want to get the card for.

| Game              | URL                            | Parameter |
| ----------------- | ------------------------------ | --------- |
| Honkai Impact 3rd | /api/v1/getCard?game=honkai3rd | honkai3rd |
| Genshin Impact    | /api/v1/getCard?game=genshin   | genshin   |
| Honkai: Star Rail | /api/v1/getCard?game=starrail  | starrail  |
