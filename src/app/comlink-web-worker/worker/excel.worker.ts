import { expose } from 'comlink';
import { faker } from '@faker-js/faker';
import { utils, write } from 'xlsx';

export class ExcelWorker {
  constructor() {}

  generateDatas() {
    const startTime = performance.now();

    console.log('[ExcelWorker]', 'start generateDatas');
    const rowCount = 1000000;
    const data = [];
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

    /* generate worksheet */
    const ws = utils.json_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    const endTime = performance.now();
    const result = write(wb, { type: 'buffer', compression: true });
    console.log(
      '[ExcelWorker]',
      `end excelInWorker => ${(endTime - startTime) / 1000} s`
    );

    return result;
  }
}

// Required!
expose(ExcelWorker);
