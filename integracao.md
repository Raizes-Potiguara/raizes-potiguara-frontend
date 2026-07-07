# Integração Frontend + Backend

## Endpoints integrados

Cadastro de artesã pela tela `/admin/cadastro`:

```http
POST /api/v1/admin/artesas
```

Listagem de artesãs no painel `/admin`:

```http
GET /api/v1/comercializacao/artesas
```

Assistente virtual no perfil da artesã:

```http
POST /api/v1/assistente
```

Áudio da resposta do assistente:

```http
POST /api/v1/voz/resposta
```

Produtos cadastrados para a loja:

```http
GET /api/v1/comercializacao/produtos
```

URLs locais usadas por padrão:

```txt
http://localhost:8000/api/v1/admin/artesas
http://localhost:8000/api/v1/comercializacao/artesas
http://localhost:8000/api/v1/assistente
http://localhost:8000/api/v1/voz/resposta
http://localhost:8000/api/v1/comercializacao/produtos
```

Essas integrações são usadas nas telas:

```txt
/admin/cadastro
/admin
/perfil/:id
/artesanato
```

O objetivo é cadastrar uma nova artesã pela Fundação/Admin usando um endpoint determinístico do backend, sem passar pelo super agente/LLM.

O assistente virtual usa o super agente/orquestrador do backend para interpretar texto e imagem da artesã logada.
Depois que o super agente retorna `mensagem`, o frontend chama `/voz/resposta` para gerar um áudio dessa mensagem.

## Configuração da URL do backend

O frontend usa a variável opcional:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Se essa variável não existir, o frontend usa automaticamente:

```txt
http://localhost:8000/api/v1
```

Para criar o arquivo local:

```bash
cd /home/joaopedro/Documents/raizes-potiguara-frontend/raizes-potiguara
printf 'VITE_API_BASE_URL=http://localhost:8000/api/v1\n' > .env
```

Depois de criar ou alterar `.env`, reinicie o servidor do Vite.

## Como rodar para testar no navegador

Em um terminal, rode o backend:

```bash
cd /home/joaopedro/Documents/raizes-potiguara-backend
.venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Em outro terminal, rode o frontend:

```bash
cd /home/joaopedro/Documents/raizes-potiguara-frontend/raizes-potiguara
npm run dev -- --host 0.0.0.0
```

Abra no navegador:

```txt
http://localhost:5173/admin/cadastro
```

Se o Vite usar outra porta, por exemplo `5174`, use:

```txt
http://localhost:5174/admin/cadastro
```

## Payload enviado pelo frontend

A tela envia JSON com este formato:

```json
{
  "tipo_conta": "ADMIN",
  "nome": "Maria Rocha",
  "data_nascimento": "1990-05-10",
  "cpf": "000.000.000-00",
  "aldeia": "Aldeia Tupã",
  "telefone": "(99) 99999-9999",
  "chave_pix": "maria@email.com",
  "email": "maria@email.com",
  "senha": "123456"
}
```

Campos obrigatórios no frontend:

- nome
- data de nascimento
- CPF
- aldeia/comunidade
- telefone
- chave Pix
- PIN/senha

O e-mail é opcional.

## Resultado esperado

Com dados válidos e CPF ainda não cadastrado:

- o backend retorna `status: "sucesso"`;
- o frontend mostra toast de sucesso;
- depois de aproximadamente 1 segundo, volta para `/admin`.
- a tela `/admin` busca `GET /api/v1/comercializacao/artesas`;
- o contador "Total de Artesãs" e a lista "Gerenciar Artesãs" são atualizados com os dados do backend.

Se o CPF já existir:

- o backend retorna `status: "erro"`;
- o frontend mostra a mensagem do backend;
- a tela permanece no cadastro.

Se o backend estiver fora do ar ou a URL estiver errada:

- o frontend mostra erro de comunicação.

## Como verificar

No navegador:

1. Abra DevTools.
2. Vá em Network.
3. Envie o formulário.
4. Confirme que apareceu uma chamada `POST` para:

```txt
http://localhost:8000/api/v1/admin/artesas
```

5. Ao voltar para `/admin`, confirme uma chamada `GET` para:

```txt
http://localhost:8000/api/v1/comercializacao/artesas
```

6. A nova artesã deve aparecer na lista e o total deve aumentar.

## Assistente virtual

Na tela `/perfil/:id`, o botão flutuante de microfone abre o chat.

Quando a usuária envia texto ou texto com imagem, o frontend monta `FormData` e chama:

```txt
POST http://localhost:8000/api/v1/assistente
```

Campos enviados:

```txt
texto
tipo_conta
usuario_id
imagem, quando houver
audio, quando houver
contexto
```

Exemplo de `FormData`:

```ts
formData.append("texto", "e meu pix?");
formData.append("tipo_conta", "ARTESA");
formData.append("usuario_id", "01");
formData.append("contexto", JSON.stringify({
  origem: "chatbot_perfil_artesa",
  tela: "/perfil/1"
}));
```

Quando houver imagem anexada:

```ts
formData.append("imagem", arquivoImagem);
```

Quando a usuária segura o botão de microfone, o frontend grava com `MediaRecorder`.
Ao soltar, envia o áudio em `audio/webm`:

```ts
formData.append("audio", audioBlob, "fala.webm");
```

Se houver uma imagem anexada no momento da gravação, o mesmo envio leva `audio` + `imagem`.

O frontend mostra no chat apenas:

```ts
data.mensagem
```

Na experiência atual, `data.mensagem` é usada principalmente para gerar áudio. A bolha do bot mostra um botão de som; o texto fica só como fallback caso o áudio não seja gerado.

### Fluxo de áudio

1. Frontend envia texto/imagem para `/api/v1/assistente`.
2. Backend responde com `mensagem`.
3. Frontend chama `/api/v1/voz/resposta`:

```json
{
  "texto": "Talita, seu Pix cadastrado é simulado01."
}
```

4. Backend responde:

```json
{
  "status": "sucesso",
  "audio_url": "/static/audio/respostas/resposta_abc123.mp3",
  "mime_type": "audio/mpeg",
  "modelo": "..."
}
```

5. Frontend monta a URL final:

```ts
const audioUrl = `http://localhost:8000${audio.audio_url}`;
```

6. O chat exibe um botão de áudio. Ao clicar, o navegador toca o arquivo retornado pelo backend.

Não mostrar JSON bruto para a usuária.

### Mapeamento atual de usuária

Para o MVP, o chat converte o parâmetro da rota em `usuario_id`:

```txt
/perfil/1 -> usuario_id "01"
/perfil/2 -> usuario_id "02"
```

Esse mapeamento conversa com as artesãs demo do backend:

```txt
01 -> Talita Brito
02 -> Ivanilda Rocha
```

### Testes rápidos do assistente

Com backend e frontend rodando, abrir:

```txt
http://localhost:5173/perfil/1
```

ou a porta indicada pelo Vite.

Teste 1:

```txt
e meu pix?
```

Esperado:

```txt
Talita, seu Pix cadastrado é simulado01.
```

Na interface, o esperado principal é aparecer uma bolha do bot com botão de áudio. Ao clicar, a resposta acima deve ser lida em voz.

Teste 2:

```txt
tem algum produto meu cadastrado?
```

Esperado:

- não perguntar quem é a artesã;
- listar produtos da Talita ou dizer que ela ainda não tem produtos.

Teste 3:

```txt
fiz 10 colares agora e estão prontos
```

Esperado:

- cadastrar produto para Talita;
- não perguntar nome ou aldeia.

Teste 4:

Anexar uma imagem no chat, segurar o botão de microfone e falar:

```txt
Eu fiz 10 colares desse da imagem. Pode colocar à venda.
```

Esperado:

- enviar `imagem` no `FormData`;
- enviar `audio` no `FormData`;
- backend analisar a imagem;
- backend transcrever o áudio;
- produto ser cadastrado para a artesã logada;
- resposta amigável aparecer no chat.

## Loja

A tela `/artesanato` mantém os mocks e soma os produtos cadastrados pelo backend.

Fluxo:

1. Carrega `PRODUTOS_MOCK`.
2. Chama:

```txt
GET http://localhost:8000/api/v1/comercializacao/produtos
```

3. Converte cada produto do backend para o formato usado pela loja.
4. Exibe mocks + produtos reais.

Campos convertidos:

```txt
nome -> nomePortugues
nome_potiguar || nome -> nomeTupi
preco -> number
descricao -> descricao
foto_url || imagem_url -> imagemUrl
quantidade_estoque -> quantidadeEstoque
tags/nome -> categorias
```

Os produtos reais recebem id com prefixo `real-`, por exemplo:

```txt
real-1
```

Isso evita conflito com ids dos mocks.

Teste rápido:

1. Acesse `/perfil/1`.
2. Anexe uma imagem.
3. Segure o microfone e fale: "Eu fiz 10 colares desse da imagem. Pode colocar à venda."
4. Solte para enviar.
5. Depois acesse `/artesanato`.
6. O produto cadastrado deve aparecer junto dos mocks.

No backend, também dá para confirmar a lista de artesãs abrindo:

```txt
http://localhost:8000/api/v1/comercializacao/artesas
```

Ou testar no Swagger:

```txt
http://localhost:8000/docs
```

## Observações atuais

- A foto da artesã ainda é apenas prévia visual no frontend.
- O endpoint `/api/v1/admin/artesas` atual recebe JSON, não upload de imagem.
- A listagem do painel da Fundação usa o endpoint de comercialização já existente.
- Como esse endpoint ainda não retorna total de produtos por artesã, o frontend mostra `0 produtos` por enquanto.
- O microfone do chat grava áudio real com `MediaRecorder` e envia `audio/webm`.
- A resposta do bot no chat é primordialmente áudio. O texto é mantido apenas como fallback se o TTS falhar.
- A integração não implementa login/JWT/autenticação real.
- O perfil enviado nesse fluxo é fixo como `tipo_conta: "ADMIN"`, pois a tela `/admin/cadastro` representa a Fundação/Admin no MVP.
