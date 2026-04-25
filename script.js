 const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwO4SAHFbl0aWi6jSjbk5aXGY2WXNRkN2melQBud3MxSf-T_QPLwOJFetlFJsuHatUL/exec";

        async function gerarCodigo() {
            const prompt = document.getElementById('prompt').value;
            const output = document.getElementById('output');
            const btn = document.getElementById('btnEnviar');

            if(!prompt) return alert("Digite um algoritmo!");

            btn.disabled = true;
            output.innerText = "Processando com OpenAI GPT ...";

            try {
                const response = await fetch(WEB_APP_URL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ prompt: prompt })
                });
                
                const data = await response.json();
                output.innerText = data.code || data.error || "Erro ao gerar código.";
            } catch (error) {
                output.innerText = "Erro na conexão: " + error;
            } finally {
                btn.disabled = false;
            }
        }

function copiarCodigo() {
  const codigo = document.getElementById("output").innerText;
  const botao = document.getElementById("btnCopiar");

  if (!codigo) return;

  navigator.clipboard.writeText(codigo)
    .then(() => {
      botao.innerText = "Copiado!";
      setTimeout(() => {
        botao.innerText = "Copiar Código";
      }, 3000);
    });
}