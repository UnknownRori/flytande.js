import type {
    Table,
    Column,
    Operator,
    JoinType,
    WhereOperator,
    JoinStatement,
    WhereStatement,
} from '../types/Query';

import { Either, Left, None, Right } from '@sniptt/monads';
import Expression from './Expression';
import { DeleteStatement, SelectStatement } from '.';

export type QueryConstructorTypeParam = {
    table: string,
    selectColumn: Either<Column, Column[]>,
    joinStatement: JoinStatement[],
    whereStatement: WhereStatement[]
}

export default class QueryBuilder implements Expression {
    protected _schema: QueryConstructorTypeParam;

    constructor(obj: QueryConstructorTypeParam) {
        this._schema = obj;
    }

    static table(tableName: Table) {
        const obj = new this({
            table: tableName,
            selectColumn: Left('*'),
            whereStatement: [],
            joinStatement: [],
        });

        return obj;
    }

    select(column: Column | Column[] = '*'): Expression {
        const query = new SelectStatement({
            ...this._schema,
            selectColumn: typeof column == 'string' ? Left(column) : Right(column),
        });

        return query;
    }

    where(column: Column, operator: WhereOperator = '=', value: string | number) {
        this._schema.whereStatement.push({
            column: column,
            operator: operator,
            value: value,
            nextWhereStatement: None,
        });

        return this;
    }

    join(table: Table, first: string, operator: Operator, second: string, type: JoinType = 'inner') {
        this._schema.joinStatement.push({
            type: type,
            table: table,
            first: first,
            operator: operator,
            second: second,
        });

        return this;
    }

    delete() {
        const query = new DeleteStatement(this._schema);

        return query;
    }

    toRawQuery(): string {
        return this.select().toRawQuery();
    }
}
