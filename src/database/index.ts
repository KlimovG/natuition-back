import { dataSourceOptions } from '../../ormconfig';
import { DataSource } from 'typeorm';

const initializeDB = async (): Promise<void> => {
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource
    .initialize()
    .then((connection) => {
      console.log('Database successfully initialized ');
    })
    .catch((error) => {
      console.log(`Database failed to connect ${error.message}`);
    });
  await dataSource.synchronize();
};

export default initializeDB;
