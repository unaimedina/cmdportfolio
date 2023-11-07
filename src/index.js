const output = document.getElementById('output');
const input = document.getElementById('input');

input.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const command = input.value;
        input.value = '';
        output.innerHTML += `<div><span class="prompt">admin@unai.lol:~$</span> ${command}</div>`;
        executeCommand(command);
    }
});

function executeCommand(command) {
    // Puedes agregar tu l�gica para manejar comandos aqu�, al igual que en el ejemplo anterior.
    let response = 'Comando no reconocido';

    // execute commands from the commands.json file
    // import because require is not defined in the browser
    fetch("./src/commands.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let obj = Object.keys(data.cmds);
            for (let i = 0; i < obj.length; i++) {
                console.log(command === obj[i]);
                if (command === obj[i]) {
                    if (data.cmds[obj[i]].type === 'link') {
                        response = '<a href="' + data.cmds[obj[i]].target + '" target="_blank">' + data.cmds[obj[i]].content + '</a>';
                        break;
                    }
                    response = data.cmds[obj[i]].content;
                    console.log(response);
                    break;
                }
            }

            if (command === 'clear') {
                output.innerHTML = '';
                response = '';
                return;
            } else if (command === 'help') {
                response = 'Comandos disponibles: <br>';
                for (let i = 0; i < obj.length; i++) {
                    response += obj[i] + " - " + data.cmds[obj[i]].description + '<br>';
                }
            }

            output.innerHTML += `<div>${response}</div>`;
            output.scrollTop = output.scrollHeight;
        });
}