const Scene = require('telegraf/scenes/base')
const from = new Scene('from');
from.enter((ctx)=>{
  ctx.reply('Пожалуйста, укажи код языка');
});

from.on('text', ctx=>{
  if(ctx.message.text.length > 2 | ctx.message.text.length === 1){
  return ctx.reply('язык должен состоять из двух символов');
  }
  ctx.session.from = ctx.message.text.toLowerCase();
  ctx.reply(`${ctx.message.text} язык выбран`);
  return ctx.scene.leave();
});

from.leave((ctx)=>{
  ctx.reply('Спасибо что выбрали язык');
});

from.on('message', ctx=>ctx.reply(`Только текст, пожалуйста`));

module.exports = from;