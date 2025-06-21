const API_URL = "/api";

async function login(email, senha) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao fazer login");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
}

async function register(nome, email, senha) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao registrar");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function logout() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/";
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}

function checkAuth() {
  getCurrentUser().then((user) => {
    if (!user) {
      window.location.href = "/entrar";
    }
    return user;
  });
}
