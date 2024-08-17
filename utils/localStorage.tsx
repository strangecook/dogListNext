export const saveToLocalStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving to localStorage with key ${key}:`, error);
      }
    }
  };
  
  export const loadFromLocalStorage = (key: string): any | null => {
    if (typeof window !== 'undefined') {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error(`Error loading from localStorage with key ${key}:`, error);
        return null;
      }
    }
    return null;
  };
  