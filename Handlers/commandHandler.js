// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

function loadCommands(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Commands", "Status");

    let commandsArray = [];

    const commandsFolder = fs.readdirSync("./Commands");
    for (const folder of commandsFolder) {
        const commandFiles = fs
            .readdirSync(`./Commands/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`);

            const properties = { folder, ...commandFile };
            client.commands.set(commandFile.data.name, properties);

            commandsArray.push(commandFile.data.toJSON());

            table.addRow(file, "loaded");
            continue;
        }
    }

    if (client.application && client.application.commands) {
        client.application.commands.set(commandsArray);
    } else {
        console.error('Nie można ustawić komend: client.application.commands jest null.');
    }

    return console.log(table.toString(), "\n Commands loaded");
}

module.exports = { loadCommands };