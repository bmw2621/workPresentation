# Specification

## REST Endpoints

| Endpoint   | Method | Parameters                                                                         | Description                            | Example                                                                                                                                                                 |
| ---------- | ------ | ---------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /users     | GET    | NA                                                                                 | Returns array of user entities         | [{id: 1, firstName: "TestFirst1", lastName: "TestLast1", age: 18, isBamaFan: true}, {id: 2, firstName: "TestFirst2", lastName: "TestLast2", age: 55, isBamaFan: false}] |
| /users/:id | GET    | id: integer                                                                        | Returns single entity with given id    | {id: 1, firstName: "TestFirst1", lastName: "TestLast1", age: 18, isBamaFan: true}                                                                                       |
| /users     | POST   | _Request Body:_ firstName: string lastName: string age: integer isBamaFan: boolean | Creates resource with given parameters |                                                                                                                                                                         |

---

## Data Model

### User

| Attribute | Data Type               |
| --------- | ----------------------- |
| id        | Integer (autoincrement) |
| firstName | String                  |
| lastName  | String                  |
| age       | Integer                 |
| isBamaFan | Boolean                 |
