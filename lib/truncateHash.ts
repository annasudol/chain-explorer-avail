const truncateHash = (hash: string, length = 8) => {
  if (!hash) return "";
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
};
export default truncateHash;
