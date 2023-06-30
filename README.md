# Sendrato React template

## Overview
It`s a template for the fast development of the Front end. React-template use generic components and Material UI library to create UI and React Query for interaction with the API.
## Get started 
To create a new application with React-template, try to clone this repository on your own PC using HTTPS or SSH.
```bash
git clone git@github.com:Sendrato/react-template.git

git clone https://github.com/Sendrato/react-template.git
```
The next step change a remote repository.
```bash
git remote rm origin

git remote add <name> <new-repository-link>
```
#### Installation

```bash
yarn install
```

#### Start in a development mode

```bash
yarn app:start:dev
```
#### Build
```bash
yarn app:build
```
#### Lint
```bash
yarn lint
```
#### Storybook
Start the storybook, to view the documentation on UI components and props them receive.

Move into the app directory
```bash
cd packages/app
```
Run Storybook
```bash
yarn storybook
```
Open Storybook locally
```bash
http://localhost:6006
```

## Documentation 

### OAuth with React-template
React-template uses AuthContext for authorization and already has auth module. Change the design login page if it is necessary and change the endpoints of login, getToken, refreshToken, and getUserRole functions in AuthContext according to your API. For work with AuthContext in components you can use hook useAuthContext. Also, React-template has AuthGuard and RoleGuard components in order to limit access to the pages of users who are not authorized or whose role does not correspond to the role that has access to a certain page.
```ts
const authContext = useAuthContext();
```

### Routing
The React template uses a Next.js router. To create a new page add a file with a name that will match the route on your website to the pages directory. And add the according to module to the module directory for creating a page template. Also, add info about a page to routes.ts to provide information about the page.

```ts
export const HOME_ROUTE = {
  pathname: '/',
  access: ['organiser', 'administrator', 'seller'],
  title: 'Overview',
};

export const routes: IRoute[] = [HOME_ROUTE];
```

To add a link to a page in a Sidebar you should update sidebardItems.ts in the layouts/Sidebar directory:

```ts
import { HOME_ROUTE } from 'routes/routes';

const pagesSection: SidebarItemsType[] = [
  {
    ...HOME_ROUTE,
  },
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
];

export default navItems;
```
### Fetching data with React Query and useEntityQuery
React-template uses an approach for data fetching that is based on React Query and custom hook useEntityQuery. 

useEntityQuery props:
1. entity - the entity string.
2. params - the query params of the request.
3. deps - the array of parameters after changing which the data should be updated.
4. options - the options of [useQuery hook](https://tanstack.com/query/v3/docs/react/guides/queries) from React Query.

Hook returns the object like response of [useQuery hook](https://tanstack.com/query/v3/docs/react/guides/queries).

Example:
```ts
const { data, isFetching, refetch } = useEntityQuery<ListSellers>({
    entity: '/common/backoffice/onboarding/ListSellers',
    params: `Start=${page * rows}&PageSize=${rows}`,
    deps: [page, rows],
  });
```  
### Mutation with React Query and useEntityMutation
The hook useEntityMutation serves for creating an instance of POST, DELETE, PUT requests. He returns the object like [useMutation hook](https://tanstack.com/query/v3/docs/react/guides/mutations) from React Query.

useEntityMutation props:
1. entity - the entity string;
2. method - POST, PUT, DELETE. 
3. options - the options [useMutation hook](https://tanstack.com/query/v3/docs/react/guides/mutations) from React Query.
4. successMessage - the message that will display like a record after a success request.
5. errorMessage -the message that will display after a bad request.
6. errorType - the notification type of error message.

Example: 
```ts
const mutation = useEntityMutation<unknown, SellerDTO>({
    entity: '/common/backoffice/onboarding/Seller',
    method: METHOD.POST,
  });
```

### The usage useEntityQuery and useEntityMutation together
If you need to perform a certain mutation and then update the data, you can use a combination of both hooks.

Example:
```ts
const { refetch } = useEntityQuery<ListSellers>({
    entity: '/common/backoffice/onboarding/ListSellers',
    params: `Start=${page * rows}&PageSize=${rows}`,
    deps: [page * rows, rows],
  });

  const { mutateAsync } = useEntityMutation<unknown, SellerDTO>({
    entity: '/common/backoffice/onboarding/Seller',
    method: METHOD.POST,
  });

  const handleCreateSeller = async (body: SellerDTO) => {
    await mutateAsync({ body });
    await refetch();
  };
```