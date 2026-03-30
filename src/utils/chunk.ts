/**
 * 배열을 size씩 나눈 배열을 반환하는 함수
 * @param arr 나눌 배열
 * @param size 나눌 크기
 * @returns size씩 나눠진 배열
 */
const chunk = <T>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

export default chunk;
