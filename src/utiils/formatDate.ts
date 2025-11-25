type ISODateString = string;

/**
 * ISO 8601 형식 문자열을 한국식 날짜로 변환
 * @param dateString ISO 8601 형식 문자열 (예: "2025-11-20T05:21:26.691331")
 */
export function formatDate(dateString: ISODateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const meridiem = hours < 12 ? "오전" : "오후";
  hours = hours % 12 === 0 ? 12 : hours % 12; // 0시는 12로 표시
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}. ${month}. ${day} ${meridiem} ${hours}:${minutes}`;
}
