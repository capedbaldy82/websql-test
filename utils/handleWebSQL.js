// WebSQL은 비동기적이기 때문에 무결성을 위해 Promise로 처리

// WebSQL 데이터베이스 생성
const database = openDatabase('University', '1.0', 'chrome dabase test', 2 * 1024 * 1024);

// WebSQL 테이블 생성
const createTable = (tableName, tableData) => {
  if (!tableName) return '테이블 이름이 없습니다.';
  if (!tableData) return '테이블 데이터가 없습니다.';

  const columns = [];

  for (let column in tableData[0]) {
    columns.push(column);
  }

  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName}(${String(columns)})`, []);
      },
      [],
      () => {
        console.log('테이블 생성 성공');
        resolve();
      },
      () => {
        console.log('테이블 생성 실패');
        reject();
      }
    );
  });
};

// WebSQL 데이터 추가
const insertData = (tableName, tableData) => {
  if (!tableName) return '테이블 이름이 없습니다.';
  if (!tableData) return '테이블 데이터가 없습니다.';

  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        for (let row of tableData) {
          const columns = [];
          const values = [];
          const substitute = [];

          for (let column in row) {
            columns.push(column);
            values.push(row[column]);
            substitute.push('?');
          }

          tx.executeSql(
            `INSERT INTO ${tableName}(${String(columns)}) VALUES (${String(substitute)})`,
            values,
            (tx, result) => {
              // console.log(tx, result);
            },
            (tx, result) => {
              console.error(tx, result);
            }
          );
        }
      },
      [],
      () => {
        console.log('데이터 생성 성공');
        resolve();
      },
      () => {
        console.log('데이터 생성 실패');
        reject();
      }
    );
  });
};

// WebSQL 테이블 읽기
const readTable = (tableName) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (tx, result) => {
          console.log('데이터 읽기 성공');
          resolve(result.rows);
        },
        (tx, result) => {
          console.log('데이터 읽기 실패');
          reject(tx, result);
        }
      );
    });
  });
};

// WebSQL 테이블 삭제
// 테스트 필요
const deleteTable = (tableName) => {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
      },
      [],
      () => {
        console.log('테이블 삭제 성공');
      },
      () => {
        console.log('테이블 삭제 실패');
      }
    );
  });
};

// WebSQL 범용 처리
const handleWebSQL = (text) => {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(text);
      },
      [],
      () => {
        console.log('SQL 성공');
      },
      () => {
        console.log('SQL 실패');
      }
    );
  });
};

export { createTable, insertData, readTable, deleteTable, handleWebSQL };
