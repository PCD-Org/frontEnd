export const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const withDelay = async (value, ms = 400) => {
  await delay(ms);
  return value;
};

export const formatBytes = (bytes) => {
  if (bytes == null || Number.isNaN(bytes)) return null;
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};
