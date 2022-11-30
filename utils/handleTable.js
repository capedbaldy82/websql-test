const renderTable = (data) => {
  // 테이블 자식 요소 제거
  cleanTable();

  // 테이블 엘리먼트 연결
  const $data_table = document.querySelector('.data_table');

  // 테이블 내부 엘리먼트 생성
  const $thead = document.createElement('thead');
  const $tbody = document.createElement('tbody');

  // 효율 및 안전성을 위해 createElement 사용
  // 테이블 헤더 데이터 추가
  for (let column in data[0]) {
    const $th = document.createElement('th');
    $th.textContent = column;
    $thead.appendChild($th);
  }

  // 테이블 바디 데이터 추가
  for (let row of data) {
    const $tr = document.createElement('tr');
    for (let value in row) {
      const $td = document.createElement('td');
      $td.textContent = row[value];
      $tr.appendChild($td);
    }
    $tbody.appendChild($tr);
  }

  // 테이블에 추가
  $data_table.appendChild($thead);
  $data_table.appendChild($tbody);
};

const updateTable = () => {};

const cleanTable = () => {
  const $data_table = document.querySelector('.data_table');

  while ($data_table.firstChild) {
    $data_table.removeChild($data_table.firstChild);
  }
};

export { renderTable };
