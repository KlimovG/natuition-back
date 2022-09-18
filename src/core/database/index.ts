import { dataSourceOptions } from '../config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { LoggerService } from '../logger/loggerService';
import { Inject } from 'typedi';

export default class DataBase {
  constructor(@Inject() private logger: LoggerService) {}

  get dataSource(): DataSource {
    return new DataSource(this.ormConfig);
  }

  get ormConfig(): DataSourceOptions {
    return dataSourceOptions;
  }

  public async init(): Promise<void> {
    const dataSource = this.dataSource;

    await dataSource
      .initialize()
      .then(() =>
        this.logger.info('Successfully initialized ', { label: 'Database' }),
      )
      .catch((error) =>
        this.logger.error(`Failed to connect ${error.message}`, {
          label: 'Database',
        }),
      );

    await dataSource
      .synchronize()
      .catch((error) =>
        this.logger.error(
          `Datasource could not be synchronized with: ${error}`,
          { label: 'DataBase' },
        ),
      );
  }
}
