require('dotenv').config();

const { BOT_TOKEN } = process.env;
const { Telegraf } = require('telegraf')
const TSL = require('telegraf-session-local')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
//components
const startCommand = require('./components/start')
const helpCommand = require('./components/help')
//scenes
const fromScene = require('./scenes/from');
const toScene = require('./scenes/to');
//service
const translate = require('./service/translate')
const init = async (bot, config) => {
//stage, scenes
  const stage = new Stage([fromScene, toScene]);
//middleware
  bot.use(new TSL({database: 'data/session.json'}).middleware());
  bot.use(stage.middleware())
//components
  bot.start(startCommand());
  bot.help(helpCommand());
  bot.command('from', (ctx) => ctx.scene.enter('from'))
  bot.command('to', (ctx) => ctx.scene.enter('to'))
  bot.command('lang', ctx=>ctx.reply(`${ctx.session.from} - ${ctx.session.to}`))
  bot.on('message', async ctx=>{
    const result = await translate(ctx.message.text,
    ctx.session.from, ctx.session.to);
    console.log(result);
    return ctx.reply('Привет');
  })
  return bot;
}

init(new Telegraf(BOT_TOKEN), process.env).
then(async(bot)=>{
  await bot.launch();
  console.log(`launched ${new Date()}`)
})

module.exports = init;