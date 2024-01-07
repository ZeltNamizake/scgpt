//Readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//OpenAI
const OpenAI = require("openai");
const { ApiKey } = require("./apikey.js");
const openai = new OpenAI({
  apiKey: ApiKey,
});
//Figlet
const figlet = require("figlet");
//Clear console
const clear = require("clear-console");
//TextColor
const textHijau = `\x1b[32m`;
const textMerah = `\x1b[31m`;
const textBiru = `\x1b[34m`;
const textHitam = `\x1b[30m`;
const textCyan = `\x1b[36m`;
const textKuning = `\x1b[33m`;
const reset = `\x1b[0m`;

clear();
console.log()
figlet("S C G P T", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(
    textHijau +
      data +
      textKuning +
      "\nSimple ChatGPT by ZeltNamizake" +
      textMerah +
      "\nYoutube : " +
      "https://m.youtube.com/@zelt71" +
      textCyan +
      "\nGithub : " +
      "https://github.com/ZeltNamizake"
  );
  console.log();
});
setTimeout(
  () =>
    rl.question(
      reset + textBiru + "What you want to ask:\n>> ",
      async (questions) => {
        if (questions) {
          console.log(textMerah + "Loading...");
          const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: questions }],
            model: "gpt-3.5-turbo",
            max_tokens: 3000,
          });
          const response = chatCompletion.choices[0].message.content;
          console.log();
          console.log(textBiru + `Answer:`);
          console.log(textHijau + `${response}\n`);
          rl.close();
        } else {
          console.log(textMerah + "didn't recognize the question");
          rl.close();
        }
      }
    ),
  700
);
