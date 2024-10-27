const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = 4000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "BRENDALINDA",
    database: "projeto",
    port: 5432
});

client.connect();

app.get('/', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Clientes</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #fff8e1; /* Amarelo claro */
                    color: #333;
                    text-align: center;
                }
                header {
                    background-color: #ffab00; /* Amarelo forte */
                    padding: 20px;
                    position: relative;
                }
                h1 {
                    color: white; /* Texto branco para contraste */
                    margin: 0;
                }
                button {
                    background-color: #ffb300; /* Amarelo médio */
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                    position: absolute; /* Posicionamento absoluto */
                    right: 20px; /* 20px da direita */
                    top: 50%; /* Alinhamento vertical */
                    transform: translateY(-50%); /* Centralizar verticalmente */
                }
                button:hover {
                    background-color: #ffa000; /* Amarelo mais escuro ao passar o mouse */
                }
                table {
                    width: 80%;
                    margin: 0 auto;
                    border-collapse: collapse;
                    margin-top: 20px;
                    display: none; /* Ocultar tabela inicialmente */
                }
                th, td {
                    border: 1px solid #ffb300; /* Bordas amarelas */
                    padding: 10px;
                }
                th {
                    background-color: #ffca28; /* Amarelo mais claro para o cabeçalho */
                    color: black; /* Texto preto para contraste */
                }
                tr:nth-child(even) {
                    background-color: #fffde7; /* Amarelo muito claro para linhas pares */
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Clientes</h1>
                <button id="show-clientes">Mostrar Clientes</button>
            </header>
            <table id="clientes-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th>Idade</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <script>
                document.getElementById('show-clientes').addEventListener('click', async () => {
                    const response = await fetch('/clientes');
                    const clientes = await response.json();
                    const tableBody = document.querySelector('#clientes-table tbody');
                    tableBody.innerHTML = ''; // Limpar a tabela

                    clientes.forEach(cliente => {
                        const row = document.createElement('tr');
                        row.innerHTML = \`
                            <td>\${cliente.id}</td>
                            <td>\${cliente.nome}</td>
                            <td>\${cliente.nascimento}</td>
                            <td>\${cliente.idade}</td>
                            <td>\${cliente.cpf}</td>
                        \`;
                        tableBody.appendChild(row);
                    });

                    // Mostrar a tabela
                    document.getElementById('clientes-table').style.display = 'table';
                });
            </script>
        </body>
        </html>
    `;
    res.send(html);
});

app.get('/clientes', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM clientes');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
