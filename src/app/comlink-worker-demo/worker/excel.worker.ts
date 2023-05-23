import { expose, transfer } from 'comlink';
import { faker } from '@faker-js/faker';
import { utils, write } from 'xlsx';

export class ExcelWorker {
  constructor() {}

  generateDatas(rowsCount:number) {
    const startTime = performance.now();

    console.log('[ExcelWorker]', 'call generateDatas');
    const rowCount = rowsCount;
    let data = [];
    for (let i = 0; i < rowCount; i++) {
      data.push({
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      });
    }
    console.log('[ExcelWorker]', `created ${rowCount} rows`);
    /* generate worksheet */
    const ws = utils.json_to_sheet(data);
    data = [];
    console.log('[ExcelWorker]', 'converted data to WorkSheet');
    /* generate workbook and add the worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    const result = write(wb, {
      type: 'buffer',
      compression: true,
    }) as ArrayBuffer;
    const endTime = performance.now();
    console.log(
      '[ExcelWorker]',
      `end excelInWorker => ${(endTime - startTime) / 1000} s`
    );

    return result;
  }
}

// Required!
expose(ExcelWorker);
