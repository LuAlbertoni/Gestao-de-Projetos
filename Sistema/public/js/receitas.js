async function getAllReceitas() {
  try {
    const url = `${API_URL}/receitas`;
    const response = await fetch(url, { credentials: "include" });
    if (!response.ok) throw new Error("Erro ao buscar receitas");
    return await response.json();
  } catch (error) {
    console.error("Erro em getAllReceitas:", error);
    throw error;
  }
}

async function getReceitaById(id) {
  try {
    const response = await fetch(`${API_URL}/receitas/${id}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Receita com ID ${id} não encontrada`);
    return await response.json();
  } catch (error) {
    console.error("Erro em getReceitaById:", error);
    throw error;
  }
}

async function createReceita(receitaData) {
  try {
    const response = await fetch(`${API_URL}/receitas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receitaData),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao criar receita");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro em createReceita:", error);
    throw error;
  }
}

async function updateReceita(id, receitaData) {
  try {
    const response = await fetch(`${API_URL}/receitas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receitaData),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Erro ao atualizar receita com ID ${id}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro em updateReceita:", error);
    throw error;
  }
}

async function getMinhasReceitas() {
  try {
    const response = await fetch(`${API_URL}/receitas/minhas`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erro ao buscar suas receitas");
    return await response.json();
  } catch (error) {
    console.error("Erro em getMinhasReceitas:", error);
    throw error;
  }
}

async function deleteReceita(id) {
  try {
    const response = await fetch(`${API_URL}/receitas/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Erro ao excluir receita com ID ${id}`);
  } catch (error) {
    console.error("Erro em deleteReceita:", error);
    throw error;
  }
}
