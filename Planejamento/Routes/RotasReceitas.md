# Rotas de Receitas

Estas rotas estão acessíveis através do prefixo `/api/receitas`.

## GET `/api/receitas`

- **Descrição:** Lista todas as receitas cadastradas.
- **Autenticação:** Não obrigatória.
- **Resposta de sucesso:** 200 OK com array de receitas.

---

## GET `/api/receitas/:id`

- **Descrição:** Detalha uma receita específica pelo ID.
- **Autenticação:** Não obrigatória.
- **Parâmetros de rota:**
  - `id`: ID da receita.
- **Resposta de sucesso:** 200 OK com os dados da receita.

---

## POST `/api/receitas`

- **Descrição:** Cria uma nova receita.
- **Autenticação:** Obrigatória.
- **Body esperado:**
  ```json
  {
    "nome": "Nome da Receita",
    "ingredientes": "Lista de ingredientes",
    "modo_preparo": "Modo de preparo",
    "tempo_preparo": "Tempo de preparo",
    "rendimento": "Rendimento"
  }
  ```
- **Resposta de sucesso:** 201 Created ou 200 OK com os dados da nova receita.

---

## PUT `/api/receitas/:id`

- **Descrição:** Atualiza uma receita existente.
- **Autenticação:** Obrigatória.
- **Parâmetros de rota:**
  - `id`: ID da receita.
- **Body esperado:** Campos a serem atualizados, similar ao body do POST.
- **Resposta de sucesso:** 200 OK com os dados atualizados.

---

## DELETE `/api/receitas/:id`

- **Descrição:** Remove uma receita existente.
- **Autenticação:** Obrigatória.
- **Parâmetros de rota:**
  - `id`: ID da receita.
- **Resposta de sucesso:** 200 OK confirmando a exclusão.

---