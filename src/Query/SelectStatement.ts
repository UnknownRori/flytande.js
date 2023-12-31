import QueryBuilder from './QueryBuilder';
import type { QueryConstructorTypeParam } from './QueryBuilder';

export default class SelectStatement extends QueryBuilder {
    constructor(obj: QueryConstructorTypeParam) {
        super(obj);
    }

    toRawQuery(): string {
        let result = 'SELECT ';

        this._schema.selectColumn.match({
            left: (column) => result += column,
            right: (column) => result += column.join(', '),
        });

        result += ` FROM ${this._schema.table}`;

        return result;
    }
}
