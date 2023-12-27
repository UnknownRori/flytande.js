import { Option } from '@sniptt/monads';

type Column = string;
type Table = string;
type SelectStatement = '*' | Column | Column[];
type Operator = '=' | '!=' | '<>' | '<' | '>' | '<=' | '>=';
type WhereOperator = Operator | 'LIKE' | 'BETWEEN' | 'IN' | 'IS'
type JoinType = 'left' | 'right' | 'inner' | 'cross' | 'full' | null;

type JoinStatement = {
    type: JoinType;
    table: Table,
    first: string
    operator: Operator
    second: string,
};

type WhereStatement = {
    column: Column,
    operator: WhereOperator,
    value: string,
    nextWhereStatement: Option<'OR' | 'AND'>
};

type Query = {
    table: Table,
    select: SelectStatement,
    join: Array<JoinStatement>,
    where: Array<WhereStatement>,
}

export {
    Table,
    Query,
    Column,
    Operator,
    JoinType,
    JoinStatement,
    WhereStatement,
    WhereOperator,
    SelectStatement,
};
