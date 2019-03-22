const commands = require('./commands.js');
// #1
 process.stdout.write('prompt > ');

// #2
 process.stdin.on('data', (userInput) => {
// #3
   userInput = userInput.toString().trim();
   commands.evaluateCmd(userInput);
 });
