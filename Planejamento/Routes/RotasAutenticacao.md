# Rotas de Autenticação

Estas rotas estão acessíveis através do prefixo `/api/auth`.

## POST `/api/auth/register`

- **Descrição:** Registra um novo usuário.
- **Body esperado:**
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "usuario@email.com",
    "senha": "senha"
  }
  ```
- **Resposta de sucesso:** 201 Created ou 200 OK com os dados do usuário ou token.

---

## POST `/api/auth/login`

- **Descrição:** Realiza o login do usuário.
- **Body esperado:**
  ```json
  {
    "email": "usuario@email.com",
    "senha": "senha"
  }
  ```
- **Resposta de sucesso:** 200 OK com token de autenticação ou cookie.

---

## GET `/api/auth/me`

- **Descrição:** Retorna os dados do usuário autenticado.
- **Cabeçalho necessário:** Cookie de autenticação ou token JWT.
- **Resposta de sucesso:** 200 OK com os dados do usuário.

---

## POST `/api/auth/logout`

- **Descrição:** Realiza o logout do usuário, invalidando o token/cookie de autenticação.
- **Cabeçalho necessário:** Cookie de autenticação ou token JWT.
- **Resposta de sucesso:** 200 OK confirmando o logout.

---