import { test, expect } from 'vitest';
import { QueryBuilder } from '../src';

const tableName = 'flytande';

test(`It should generate raw query DELETE FROM ${tableName}`, function () {
    const query = QueryBuilder.table(tableName).where('id', '=', 1).delete().toRawQuery();

    expect(query).toBe(`DELETE FROM ${tableName} WHERE id = 1`);
});

test(`It should generate raw query SELECT id, name, stock, expiration_date FROM ${tableName}`, function () {
    const query = QueryBuilder.table(tableName).where('expiration_date', '>=', 1).delete().toRawQuery();

    expect(query).toBe(`DELETE FROM ${tableName} WHERE expiration_date >= 1`);
});
