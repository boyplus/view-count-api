import { AppDataSource } from './dataSource';

const databaseConnector = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ ✅ ✅ DB Connection is completed✅ ✅ ✅\n');
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnector;
