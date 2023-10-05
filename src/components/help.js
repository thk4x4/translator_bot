module.exports = () => async (ctx) => {
  ctx.reply(`
  /from - выбрать язык
  /to - выбрать язык на который нужно переводить

  also you can use this bot in inline-mode.
  This bot uses ISO-639-1 standart.
  Check list here: 
  https://en.wikipedia.org/wiki/list_of_ISO_639-1_codes
  ru - Russian 
  en - English 
  `);
}