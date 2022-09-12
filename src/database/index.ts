import dataSource from "../../ormconfig";

const initializeDB = async (): Promise<void> => {
    await dataSource.initialize()
        .then(connection=>{
            console.log('Database successfully initialized with '+connection);
        })
        .catch(error=>{
            console.log(`Database failed to connect ${error.message()}`);
        })
};

export default initializeDB;