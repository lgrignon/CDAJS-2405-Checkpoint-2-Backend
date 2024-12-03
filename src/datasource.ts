import { DataSource } from "typeorm";

export const datasource = new DataSource({
    type: 'sqlite',
    database: './db/checkpoint2.db',
    entities: ['src/entities/*.ts'],
    synchronize: true
});