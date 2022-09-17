import { dataSourceOptions } from '../core/config';
import { DataSource } from 'typeorm';
import { Logger } from '../core/logger/logger';

const initializeDB = async (): Promise<void> => {
  const logger = new Logger();
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource
    .initialize()
    .then(() => {
      logger.info('Successfully initialized ', { label: 'Database' });
    })
    .catch((error) => {
      logger.error(`Failed to connect ${error.message}`, {
        label: 'Database',
      });
    });
  await dataSource.synchronize();
};

export default initializeDB;
