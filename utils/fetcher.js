import { JSON_URL } from '../constants/index.js';

const fetchJSON = async (table) => {
  try {
    const response = await fetch(`${JSON_URL}/${table}/${table}.json`);

    const result = await response.json();

    return result;
  } catch (err) {
    alert(`네트워크 에러가 발생했습니다.`);
    console.log(`네트워크 에러: ${err}`);
  }
};

export { fetchJSON };
