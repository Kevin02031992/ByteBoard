// 📅 Formatea fecha simple a DD/MM/AAAA
export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// 🕓 Formatea fecha con hora a DD/MM/AAAA a las HH:MM:SS
export const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })} a las ${date.toLocaleTimeString("es-CR", {
    hour12: false,
  })}`;
};
