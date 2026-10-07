export function getRealIndex(stringIndex: string) {
  const realRowIndex = stringIndex.charCodeAt(0) - 'A'.charCodeAt(0);
  return realRowIndex * 7 + Number(stringIndex[1]);
}