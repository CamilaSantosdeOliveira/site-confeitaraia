// Força atualização do cache
export const forceUpdate = () => {
  // Adiciona timestamp único para quebrar cache
  const timestamp = Date.now();
  return `?t=${timestamp}&v=${Math.random()}`;
};

// Força reload da página
export const forceReload = () => {
  window.location.reload(true);
};

// Limpa cache do localStorage
export const clearCache = () => {
  localStorage.clear();
  sessionStorage.clear();
};










