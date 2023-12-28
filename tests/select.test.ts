import { test, expect } from 'vitest';
import { QueryBuilder } from '../src';

const tableName = 'flytande';

test(`It should generate raw query SELECT * FROM ${tableName}`, function () {
    const query = QueryBuilder.table(tableName).toRawQuery();

    expect(query).toBe(`SELECT * FROM ${tableName}`);
});

test(`It should generate raw query SELECT id, name, stock, expiration_date FROM ${tableName}`, function () {
    const query = QueryBuilder.table(tableName).select(['id', 'name', 'stock', 'expiration_date']).toRawQuery();

    expect(query).toBe(`SELECT id, name, stock, expiration_date FROM ${tableName}`);
});
