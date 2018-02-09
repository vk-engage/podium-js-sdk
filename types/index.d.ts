
export interface PodiumSDK {
    constructor(settings: Settings)
    setting: Settings
    Paginator: Paginator
    auth: Auth
    lrg: LRG
    incentive: Incentive
    profile: Profile
    terms: Terms
}

export interface Auth {
    constructor(settings: Settings)
    login(login: string, password: string, programSlug: string): Promise
    basicAuth(token: string): void
    logout(): Promise
}

export interface Incentive {
    constructor(settings: Settings)
    getBalance(): Promise
    getTransactions(paginator: Paginator): Promise
}

export interface LRG {
    constructor(settings: Settings)
    get(redirectUrl: string): Promise
    redirect(redirectUrl: string): boolean
}

export interface Profile {
    constructor(settings: Settings)
    get(redirectUrl: string): Promise
}

export interface Terms {
    constructor(settings: Settings)
    get(redirectUrl: string): Promise
    accept(id: number): Promise
}

export interface Paginator {
    constructor(settings: Settings)
    setContext(ctx: object): this
    setPage(page: number): this
    setPerPage(perPage: number): this
    setSortField(sortField: number): this
    setSortDirection(direction: SORT_DIRECTION): this
    setSortDesc(direction: boolean): this
    toParams(): {
        page: number
        count: number
        sort_field: string
        sort_direction: SORT_DIRECTION
    }
}

export interface Settings {
    endpoint: string;
    catchError: Function;
    perPage: number;
    sortField: string;
    sortDirection: SORT_DIRECTION;
}

export enum SORT_DIRECTION {
    ASC = 'asc',
    DESC = 'desc'
}
