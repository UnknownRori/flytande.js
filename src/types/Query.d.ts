import { Option } from '@sniptt/monads';

type Table = string;
type SelectStatement = string | string[];
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
    value: string|number,
    nextWhereStatement: Option<'OR' | 'AND'>
};

type SelectQuery = {
    table: string,
    select: SelectStatement,
    where: WhereStatement[],
    join: JoinStatement[],
}


type Query = SelectQuery;

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
