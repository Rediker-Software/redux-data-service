# redux-data-service

**A Redux library to seamlessly connect to any API using first-class models created from true TypeScript classes,
 with support for customizable serialization, validation, and dependency injection.**
 
- [x] Interact with Redux through a *friendly syntax* that is *simple* and *familiar to developers*
  - [x] Maintain an *immutable architecture* and *unidirectional data store* without the pain!
  - [x] Create a layer of abstraction that is still plain-old Redux under the hood with regular reducers, actions and selectors
- [x] Use TypeScript classes to create type-safe models, validators, serializers, and API adapters  
- [x] Provide custom validation and serialization rules on a per-field basis for each model
- [x] Support any API on a per-model basis with configurable serializers and API adapters, with default support for a standard REST API
- [x] Sensible default configuration with plenty of escape hatches to suit your needs
- [x] Feel confident with an open source library that is thoroughly unit tested
- [x] Rendering library/framework agnostic:
  - [x] **Official support for React** - [redux-data-service-react](https://github.com/Rediker-Software/redux-data-service-react)
  - [ ] Vue: TBD
  - [ ] Angular: TBD

## Create models with `TypeScript` classes:

```typescript
// student/model.ts
import { attr, required, Model, EmailField, NumberField, StringField } from "redux-data-service";

export class Student extends Model {
  public readonly string serviceName = "student";
  
  @required()
  @attr(StringField)
  public string firstName;
  
  @attr(NumberField)
  public string age;
  
  @attr(EmailField)
  public string email;
}
```

* Validation and serialization rules are provided using property decorators.
* Models can also support `belongsTo` and `hasMany` relationships to other models which are lazy-loaded when they are requested.

## Interact with models through a familiar syntax

```typescript
import { Student } from "./student";

const student = new Student({ id: "123" });

student.firstName = "Jessica";
student.age = 9;
student.email = "jess@example.com";
```

* In preserving the [awesome power of an immutable architecture](https://youtu.be/rtcn9I9sB5M?t=22m5s), the above will not mutate the model.
* Instead, it uses magic setters to dispatch model-specific actions, where a new instance of the model is created each time:

```typescript
{ type: "student/SET_FIELD", payload: { id: "123", fieldName: "firstName", value: "Jessica" } }
{ type: "student/SET_FIELD", payload: { id: "123", fieldName: "age", value: 9 } }
{ type: "student/SET_FIELD", payload: { id: "123", fieldName: "email", value: "jess@example.com" } }
```

Commit pending changes to the model's corresponding API end-point:

```typescript
student.save();
```

Calling the `save` method validates the model and dispatches an action to an underlying [redux-observable](https://redux-observable.js.org/) epic:

```typescript
{ type: "student/UPDATE_RECORD", payload: { id: "123" } }
```

The epic will then:

* serialize the model into a JSON string (using the default serializer)
* send a `POST` or a `PUT` to the API to create or update the model (using the default API adapter):

```typescript
PUT api/students/123
{"id": "123", "firstName": "Jessica", "age": 9, "email": "jess@example.com"}
```

> Although the above example uses the default serializer and API adapter for connecting to a REST API, any `ISerializer` or `IAdapter` may be used to connect to *any* API.

## Easily connect models to your React components

* For React projects, use [redux-data-service-react](https://github.com/Rediker-Software/redux-data-service-react)
* Pull Requests are welcome to support other libraries/frameworks, such as Vue or Angular!

### Querying the API

```typescript
import * as React from "react";
import { withModelQuery } from "redux-data-service-react";

export const StudentList = withModelQuery({ modelName: "student" })(
  ({ items }) => (
    <ul>
      {items.map(student => (
        <li key={student.id}>{student.name}, age {student.age}, email {student.email}</li>
      ))}
    </ul>
  )
);
```

Apollo-like syntax is also supported:

```typescript
import * as React from "react";
import { Query } from "redux-data-service-react";

export const StudentList = (
  <Query modelName="student">
    {({ items }) => (
     <ul>
        {items.map(student => (
          <li key={student.id}>{student.name}, age {student.age}, email {student.email}</li>
        ))}
      </ul>
    )}
  </Query>
);
```

Simply use your component as you normally would and it will automatically query the API when the component mounts:

```typescript
<StudentList />
```

Additional query params may be specified:

```typescript
<StudentList queryParams={{ page: 1, name: "Jess" }}/>
```

You may also provide an iterable list of models to render instead of querying the API:

```typescript
<StudentList items={students}/>
```

### Creating/editing models

```typescript
import * as React from "react";
import { withNewModel, ModelForm, ModelField } from "redux-data-service-react";

const Input = (props) => <input {...props />;

export const StudentForm = withNewModel("student")(
  ({ student, ...props }) => (
    <ModelForm model={student} {...props}>
      <ModelField name="firstName" component={Input}/>
      <ModelField name="age" type="number" component={Input}/>
      <ModelField name="email" type="email" component={Input}/>
      <Input type="submit" value="Save" />
    </ModelForm>
  )
);
```

The above form can be used for creating or editing a `student` model:

  * Creating a Student: `<StudentForm />`
  * Editing a Student: `<StudentForm studentId="123"/>` or `<StudentForm student={student}/>`

When the form is submitted it will:

* validate the model, then
* save the model by committing changes to the API

### Displaying a single model:

```typescript
import * as React from "react";
import { withModel } from "redux-data-service-react";

export const StudentDetail = withModel("student")(
  ({ student }) => (
    <section>
      <h1>{student.name}</h1>
      <strong>age:</strong> {student.age}
      <em>{student.email}</em>
    </section>
  )
);
```

The above component, given a model id, will load and subscribe to the requested model.

#### Working with [React-Router](https://reacttraining.com/react-router/)

Simply pass the id from the route into the above component, for example:

```
<Route
  path="/students/:studentId"
  render={(props) => <StudentDetail studentId={props.match.params.studentId}/>}
/>
``` 

## Wiring into Redux

Before we can use the Student model defined above, we must wire it into Redux!

### Create a corresponding `DataService` class for each model

The `DataService` class provides a layer of abstraction around Redux to create a *unidirectional, immutable architecture without the pain!*

  * Creates a corresponding Redux reducer with model-specific actions and selectors for each model
  * Communicates to any API using a configurable API adapter when the model is saved or requested
  * Supports serializing/deserializing models when communicating to the API with support for custom serializers
  * Leverages [RxJS](https://reactivex.io/rxjs/) observables to make it simple to subscribe to changes to any model

```typescript
// student/service.ts
import { DataService } from "redux-data-service";
import { Student } from "./Student";

export class StudentService extends DataService {
  public readonly name = "student";
  public readonly ModelClass = Student;
}
```

### Configure `redux-data-service` and create your `Redux` data store

Add each of your DataService classes to the `configure` function to enable dependency injection and create the Redux store 
  * Configure `redux-data-service` to globally override any default functionality as needed
  * You may provide a callback as the second parameter, which given the individual reducers and epics, should create the Redux store as desired

```typescript
import { configure } from "redux-data-service";
import { StudentService } from "./student/service.ts";

export const store = configure({
  modules: {
    student: StudentService
  }
});
```
