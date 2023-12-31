import QueryBuilder, { QueryConstructorTypeParam } from './QueryBuilder';
import WhereStatementGenerator, { defaultParameterExtractor } from './WhereStatementGenerator';

export default class DeleteStatement extends QueryBuilder {
    constructor(obj: QueryConstructorTypeParam) {
        super(obj);
    }

    toRawQuery(): string {
        let result = `DELETE FROM ${this._schema.table} `;

        result += WhereStatementGenerator(this._schema.whereStatement, defaultParameterExtractor);

        return result;
    }
}
