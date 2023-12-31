import { Either, Left } from '@sniptt/monads';
import { WhereStatement } from '../types/Query';

// TODO : Put this to seperate file
export type ParameterizedSql = {
    sql: string,
    values: string[],
};

// TODO : Put this to seperate file
export type ParameterExtractor = (_val: string | number) => Either<string, ParameterizedSql>;

export function defaultParameterExtractor(val: string | number): Either<string, ParameterizedSql> {
    if (typeof val == 'string') {
        return Left(`'${val}'`);
    }

    return Left(`${val}`);
}

export default function WhereStatementGenerator(
    where: WhereStatement[], 
    parameterExtractor: ParameterExtractor
): string {
    return where.map((statement, index, array) => {
        const value = parameterExtractor(statement.value).match({
            left: (val) => val,
            right: (val) => val.sql,
        });

        if (index == 0) {
            return `WHERE ${statement.column} ${statement.operator} ${value}`;
        }

        const logicalOps = array[index - 1].nextWhereStatement.unwrapOr('AND');

        return `${logicalOps} ${statement.column} ${statement.operator} ${value}`;
    }).join(' ');
}
