# Node.js Express & MongoDB: CRUD Rest APIs

### Db structure
```
Customer: {
  first_name: String,
  last_name: String,
  email: String,
  dob: String,
  gender: String,
  address: String,
  city: String,
  state: String
}
```

### Endpoints
```
POST /api/customers/add 
  payload: {
    first_name: string|required|min[3]|max[30]|alphanum,
    last_name: string|required|min[3]|max[30]|alphanum,
    email: string|validEmail|required|min[3]|max[30],
    dob: string|date[at least 13 years ago]|required,
    gender: string|required|oneOf["Male", "Female", "Other"]|alphanum,
    address: string|required|min[3]|max[30]|alphanum,
    city: string|required|min[3]|max[30]|alphanum,
    state: string|required|min[3]|max[30]|alphanum
  }
  
POST /api/customers/find 
  payload: {
    first_name: string|min[3]|max[30]|alphanum,
    last_name: string|min[3]|max[30]|alphanum,
    email: string|validEmail|min[3]|max[30],
    dob: string|date[at least 13 years ago],
    gender: string|oneOf["Male", "Female", "Other"]|alphanum,
    address: string|min[3]|max[30]|alphanum,
    city: string|min[3]|max[30]|alphanum,
    state: string|min[3]|max[30]|alphanum
  }
  
GET /api/customers/find/:id

POST /api/customers/update
  payload: {
    id: validID|required,
    first_name: string|min[3]|max[30]|alphanum,
    last_name: string|min[3]|max[30]|alphanum,
    email: string|validEmail|min[3]|max[30],
    dob: string|date[at least 13 years ago],
    gender: string|oneOf["Male", "Female", "Other"]|alphanum,
    address: string|min[3]|max[30]|alphanum,
    city: string|min[3]|max[30]|alphanum,
    state: string|min[3]|max[30]|alphanum
  }

GET /api/customers/delete/:id

POST /api/customers/delete
  payload: {
    first_name: string|min[3]|max[30]|alphanum,
    last_name: string|min[3]|max[30]|alphanum,
    email: string|validEmail|min[3]|max[30],
    dob: string|date[at least 13 years ago],
    gender: string|oneOf["Male", "Female", "Other"]|alphanum,
    address: string|min[3]|max[30]|alphanum,
    city: string|min[3]|max[30]|alphanum,
    state: string|min[3]|max[30]|alphanum
  }
```

### Project setup
```
npm install
```

### Run
```
node run start
```
