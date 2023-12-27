import { test, expect } from 'vitest';
import { QueryBuilder } from '../src';

const tableName = 'flytande_test_table';

test('It should generate raw query SELECT * FROM flytande_test_table', function () {
    const query = QueryBuilder.table(tableName).toRawQuery();

    expect(query).toBe(`SELECT * FROM ${tableName}`);
});
