# Execute Query SDK

## Install
    
```bash
npm install @execute-beta/query-sdk
```

 or

```bash
yarn add @execute-beta/query-sdk
```

## Usage
```typescript
import QueryClient from '@execute-beta/query-sdk'
const executeQuerySdk = new QueryClient("YOUR_API_KEY")
```

## Methods

### Async Query
```typescript
executeQuerySdk.query({
     // your query
})
```

### Sync Query
```typescript
executeQuerySdk.querySync({
        // your query
}, cb)
```


