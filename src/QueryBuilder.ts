import { None } from '@sniptt/monads';

import type {
    Table,
    Query,
    Column,
    Operator,
    JoinType,
    WhereOperator,
} from './types/Query';

export default class QueryBuilder {
    private _querySchema: Query = {
        table: '',
        select: '*',
        join: [],
        where: [],
    };

    constructor(tableName: Table) {
        this._querySchema.table = tableName;
    }

    static table(tableName: string) {
        const obj = new this(tableName);

        return obj;
    }

    select(column: Column) {
        this._querySchema.select = column;
    }

    where(column: Column, operator: WhereOperator = '=', value: string) {
        this._querySchema.where.push({
            column: column,
            operator: operator,
            value: value,
            nextWhereStatement: None,
        });

        return this;
    }

    join(table: Table, first: string, operator: Operator, second: string, type: JoinType = 'inner') {
        this._querySchema.join.push({
            type: type,
            table: table,
            first: first,
            operator: operator,
            second: second,
        });

        return this;
    }

    toRawQuery(): string {
        return '';
    }
}
