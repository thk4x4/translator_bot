const Scene = require('telegraf/scenes/base')
const to = new Scene('to');
to.enter((ctx)=>{
  ctx.reply('Пожалуйста, укажи код языка');
});

to.on('text', ctx=>{
  if(ctx.message.text.length > 2 | ctx.message.text.length === 1){
  return ctx.reply('язык должен состоять из двух символов');
  }
  ctx.session.to = ctx.message.text.toLowerCase();
  ctx.reply(`${ctx.message.text} язык выбран`);
  return ctx.scene.leave();
});

to.leave((ctx)=>{
  ctx.reply('Спасибо что выбрали язык');
});

to.on('message', ctx=>ctx.reply(`Только текст, пожалуйста`));
module.exports = to;