import {IPodiumList, IPodiumPromise} from '../../types'
import {Request} from './Request'
import {Filter} from './Filter'
import {Paginator} from './Paginator'
import {Settings} from './Settings'

export class Resource extends Request {

    constructor(settings: Settings) {
        super(settings)
    }

    public SetResourceOnce(resource: string): Resource {
        this.ResourceOnce = resource
        return this
    }
    public SetResource(resource: string): Resource {
        this.Resource = resource
        return this
    }

    public SetLegacy(legacy: boolean): Resource {
        this.Legacy = legacy
        return this
    }

    public Get<T>(id?: number | string, data?: object): IPodiumPromise<T> {
        return this.GetRequest(id, data)
    }

    public List<F, T>(arg1?: Filter<F> | Paginator, paginator?: | Paginator): IPodiumPromise<T[]> {
        let filter: Filter<F>
        if (arg1 instanceof Paginator) {
            if (paginator) {
                throw new TypeError('Order of parameters passed into List method must be Filter then Paginator')
            }
            paginator = arg1
            filter = null
        } else if (arg1 instanceof Filter) {
            filter = arg1
        }
        if (paginator instanceof Paginator) {
            paginator.isLoading(true)
        }
        return this.ListRequest(filter, paginator).then((rep: IPodiumList<T>): T[] => {
            if (paginator instanceof Paginator) {
                paginator.setResponse(rep.current_page, rep.from, rep.last_page, rep.per_page, rep.to, rep.total)
                paginator.isLoading(false)
            }
            if (filter instanceof Filter && rep.hasOwnProperty('facets')) {
                filter.setFacets(rep.facets)
            }
            return rep.data
        })
    }

    public Create<T>(params?: object): IPodiumPromise<T> {
        return this.PostRequest(params)
    }

    public Update<T>(id: number | string, params?: object): IPodiumPromise<T> {
        return this.UpdateRequest(id, params)
    }

    public Delete<T>(id: number | string): IPodiumPromise<T> {
        return this.DeleteRequest(id)
    }

}
