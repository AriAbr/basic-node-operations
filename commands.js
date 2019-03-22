const fs = require ("fs");

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parse the user input to unserstand which command was typed
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    default:
      commandLibrary.errorHandler(command);
      break;
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  "errorHandler": function(command) {
    const errorMessage = `${command} is not a command.`
    done(errorMessage);
  },
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const fullFile = data.toString();
      const fileLineArray = fullFile.split("\n");
      const fileHeadArray = fileLineArray.slice(0,10);
      const fileHead = fileHeadArray.join("\n");
      done(fileHead);
    });
  },
  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const fullFile = data.toString();
      const fileLineArray = fullFile.split("\n");
      const fileHeadArray = fileLineArray.slice(fileLineArray.length-10,fileLineArray.length);
      const fileHead = fileHeadArray.join("\n");
      done(fileHead);
    });
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
