# channel-access-control-tg-bot
A bot for selling access to your private telegram channel.

## Installation
#### Installing Node JS
```sh
sudo apt-get update
sudo apt-get install nodejs npm
```
#### Installing TypeScript
```sh
sudo npm install typescript -g
```

### Setup
1. Clone this repository
```sh
git clone https://github.com/tlopster/channel-access-control-tg-bot.git
```
2. Install dependencies
```sh
npm install
```
or yarn
```sh
yarn install
```
### Configure master
```master.options.token``` - Telegram Bot token

```qiwi.options.token``` - Qiwi P2P token

```telegram.channel.id``` - Telegram Channel ID, *negative number*

```telegram.channel.title``` - Telegram Channel title

```telegram.channel.settings.inviteLink.access.time``` - the *time in milliseconds* during which the invitation link to the channel will be available after payment

```telegram.channel.settings.inviteLink.access.inviteCount``` - how many times will it be possible to follow the invitation link to the channel after payment

```MongoDB``` - data to connect to the database MongoDB

```express.ports``` - connection ports, *recommended **80***

```intervals.access.time``` - the interval *in milliseconds* for checking user access, *recommended **2000***

```allowUsers``` - id of the admins of the bot

```prices.forever``` - the price of unlimited access

```prices.limited``` - array with goods

**Limited Product Interface**:
```json
{
  "time": "number, time in milliseconds, access time",
  "price": "number, access price",
  "notify": "array: the time in milliseconds after which to remind about the end of access"
}
```



### Qiwi P2P Configure
To automatically grant access after payment, you must connect notifications to your server in the token settings on *https://qiwi.com/p2p-admin/transfers/api*

**URL:** http://ip/qiwi.event - *replace "ip" to the IP address of your server*
## Starting
```sh
yarn start
```
*The commands work in Russian, but you can change the language manually. The ability to choose a language is not yet available, but it may be added in the future.*
### Commands
* "доступ" - buy access and get info about this
### Admin
* "genious" - get admin rights, works only for users who are specified in config.allowUsers
* "выдать доступ [telegram id] [time in seconds, 0 - unlimited] [one notify time, optional]" - give access
* "забрать доступ [telegram id]" - take access