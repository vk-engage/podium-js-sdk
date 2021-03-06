# Podium Client JavaScript SDK

This library allows you to access the Podium Client REST API for building client applications. 

## Installation
```
npm install podium-sdk
```

## Usage
```
import { Podium, PodiumPaginator, PodiumFilter, PodiumSettings } from 'podium-sdk'

let podiumSettings = new PodiumSettings().setEndpoint('https://api.podiumrewards.com/')
let podium = new Podium(podiumSettings)

podium.Auth.login(email, password, slug).then(rsp => {
  console.log(rsp.message)
}).catch(error => {
  console.log(error.message)
})

let filter = new PodiumFilter()
    filter.setValues({ customer_id: 1, search: 'Dan' })
let paginator = new PodiumPaginator()
    paginator.setPerPage(5)
    paginator.setSortField('last_name')
    paginator.setSortDirection('asc')
podium.Users.List(filter, paginator).then((rsp) => {
      console.log(rsp)
})

``` 

## Settings
Settings can be passed into the Podium constructor as a `PodiumSettings` class.

| Name  | Type | Default | Description |
| :------------- | :------------- | :------------- | :------------- |
| setEndpoint  | url  | https://api.podiumrewards.com/ | The Podium endpoint URL. |
| setLocale  | API_LOCALE  | en-US | The Podium endpoint URL. |
| setOnRequestError  | function(IPodiumErrorResponse)  |  | Callback when an API error is encountered. |
| setVersion  | number  | 1 | Version of Podium API to use. |

## API methods

### Authentication
Log in with a username and password and receive an API token to interact with other resources available via the API. The logout endpoint deletes the authentication token. 

```
Podium.Auth.Login(email, password, slug)
Podium.Auth.SSO(token)
Podium.Auth.GetToken()
Podium.Auth.SetToken(string)
Podium.Auth.HasToken()
Podium.Auth.logout()
```

### Podium Resource
Log in with a username and password and receive an API token to interact with other resources available via the API. The logout endpoint deletes the authentication token. 

##### Get

| Name  | Type | Required? | Description |
| :------------- | :------------- | :------------- | :------------- |
| id  | number/string  | yes | ID of Resource. |

##### List

| Name  | Type | Required? | Description |
| :------------- | :------------- | :------------- | :------------- |
| arg1  | Filter/Paginator  | no | Filter or Paginator Object. |
| paginator  | Paginator  | no | Paginator if first parameter is filter. |

##### Create

| Name  | Type | Required? | Description |
| :------------- | :------------- | :------------- | :------------- |
| object  | object  | no | Object to be created. |

##### Update

| Name  | Type | Required? | Description |
| :------------- | :------------- | :------------- | :------------- |
| id  | number/string  | yes | ID of Resource. |
| object  | object  | no | Object to be deleted. |

##### Delete

| Name  | Type | Required? | Description |
| :------------- | :------------- | :------------- | :------------- |
| id  | number/string  | yes | ID of object to be delete. |



### Methods that extend Resource

```
Podium.Discretionary.DirectReports
Podium.Discretionary.Discretionary
Podium.Discretionary.Ledger
Podium.Discretionary.Transactions
Podium.Ecards.Categories
Podium.Ecards.Templates
Podium.Permissions
Podium.Shop.Cart
Podium.Shop.Orders
Podium.Shop.Products
Podium.User.Address
Podium.User.Profile
Podium.Users

```

### Methods with additional functions

```
Podium.Ecards.Ecards.GetReceived(Paginator)
Podium.Ecards.Ecards.GetSent(Paginator)
Podium.Ecards.Ecards.GetPending(Paginator)
Podium.Ledgers.GetTransactions(LedgerID, Paginator)
Podium.LRG.GetUrl(redirectUrl)
Podium.LRG.Redirect(redirectUrl)
Podium.Orders.Cancel(orderId: number | string)
Podium.Shop.Cart.Confirm(cartId, addressId, ledgerId)
Podium.Shop.Cart.Checkout(cartId, addressId, ledgerId)
Podium.Terms.Accept(termsId)
Podium.Utils.isRequesting - Property of boolean if SDK is currently making a request
Podium.Utils.RequestsInProgress - array of request URL's SDK is currently making

```

### Paginator properties
The following set properties are chainable:

```
PodiumPaginator.setPage(number)
PodiumPaginator.setPerPage(number)
PodiumPaginator.setSortField(field)
PodiumPaginator.setSortDirection([asc|desc])
PodiumPaginator.setSortDesc(boolean)
PodiumPaginator.toParams()

```

### Filter properties
The following set properties are chainable:

```
PodiumFilter.getFacets()
PodiumFilter.setFacets(object)
PodiumFilter.setValues(object)
PodiumFilter.getValues(number)
PodiumFilter.toParams()
```