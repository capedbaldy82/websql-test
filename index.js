import { fetchJSON } from './utils/fetcher.js';
import { renderTable } from './utils/handleTable.js';
import { createTable, insertData, readTable } from './utils/handleWebSQL.js';
import { TABLE_ARRAY } from './constants/index.js';

// 초기 세팅용 함수
const initSetting = async (tables) => {
  for (let table of tables) {
    // json 파일 fetch
    const data = await fetchJSON(table);
    // WebSQL 테이블 생성, data 추가
    createTable(table, data).then(insertData(table, data));
  }
};

// 초기 데이터 페칭
initSetting(TABLE_ARRAY);

// 초기 데이터 fetching 및 WebSQL 세팅
// initSetting('student');
const $button_container = document.querySelector('.button_container');
$button_container.addEventListener('click', async (e) => {
  const keyword = e.target.dataset.keyword;
  if (keyword) {
    const tableData = await readTable(keyword);
    renderTable(tableData);
  }
});
