# Integração com o backend

O frontend lê o endpoint do backend pela variável:

```txt
VITE_API_BASE_URL=https://stand-germinate-corncob.ngrok-free.dev/api/v1
```

Para trocar a URL em desenvolvimento local, edite:

```txt
.env.local
```

Depois reinicie o Vite:

```bash
npm run dev
```

Na Vercel, cadastre a mesma variável em:

```txt
Project Settings -> Environment Variables
```

Nome:

```txt
VITE_API_BASE_URL
```

Valor:

```txt
https://stand-germinate-corncob.ngrok-free.dev/api/v1
```

Se a URL do ngrok mudar, atualize essa variável na Vercel e faça redeploy.

Importante: variáveis `VITE_*` são embutidas no build. Alterar `VITE_API_BASE_URL`
na Vercel só passa a valer depois de um novo deploy/redeploy.

Com o valor acima, as URLs finais esperadas são:

```txt
https://stand-germinate-corncob.ngrok-free.dev/api/v1/health
https://stand-germinate-corncob.ngrok-free.dev/api/v1/assistente
https://stand-germinate-corncob.ngrok-free.dev/api/v1/docs
https://stand-germinate-corncob.ngrok-free.dev/api/v1/openapi.json
```
