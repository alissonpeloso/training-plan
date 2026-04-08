import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Inicializa o state com o valor armazenado no localStorage ou initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage com chave "${key}":`, error);
      return initialValue;
    }
  });

  // Atualiza o localStorage sempre que o state mudar
  useEffect(() => {
    try {
      if (storedValue === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn(`Erro ao escrever no localStorage com chave "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
