# API

[Auth](#auth)
- [Sign Up](#sign-up)
- [Sign Out](#sign-out)
- [User](#user)

[Lessons](#lessons)
- [Get Lessons](#get-lessons)
- [Get Lessons statistic](#get-lessons-statistic)
- [Get single Lesson](#get-single-lesson)
- [Get statistic info for user](#get-statistic-info-for-user)
- [Create lesson](#create-lesson)
- [Make check-in for lesson](#make-check-in-for-lesson)
- [Update Lesson](#update-lesson)


## Start

```
npm i && npm run dev

```

## Lint

```
npm run lint
```

## Mongo

```
service restart mongodb
```


## API docs
### Auth

#### Sign In
> __POST__ `/api/v1/auth/sign-in` 

```
@params
       token {string}
 ```

#### Sign Up
> __POST__ `/api/v1/auth/sign-up` 

#### Sign Out 
> __POST__ `/api/v1/auth/sign-out` - [Authorization]

#### User profile 
> __GET__ `/api/v1/auth/user` - [Authorization]

### Polls

#### Create Poll
> __POST__ `/api/v1/polls/create` - [Authorization]

#### Update Poll
> __PATCH__ `/api/v1/polls/:_id` - [Authorization]
                           
```
@params
 title {string}
 createdBy {string}
 isPublic: {boolean}
``` 

#### Remove Poll
> __DELETE__ `/api/v1/polls/:_id` - [Authorization]

#### Get Poll
> __GET__ `/api/v1/polls/:_id` - [Authorization]

#### Get available polls
> __GET__ `/api/v1/polls/list` - [Authorization]

### Questions

#### Create Poll
> __POST__ `/api/v1/questions/create` - [Authorization]
```
@params
 pollId {string}
``` 

#### Update Question
> __PATCH__ `/api/v1/questions/:_id` - [Authorization]
                           
```
@params
 title {string}
 showResult: {boolean}
``` 

#### Remove Question
> __DELETE__ `/api/v1/questions/:_id` - [Authorization]


### Answers

#### Create Answer
> __POST__ `/api/v1/answers/create` - [Authorization]
```
@params
 questionId {string}
``` 

#### Update Answer
> __PATCH__ `/api/v1/answers/:_id` - [Authorization]
                           
```
@params
 title {string}
``` 

#### Update Answer on vote
> __PATCH__ `/api/v1/answers/vote/:_id` - [Authorization]
                           
```
@params
 votedBy: {array}
``` 

#### Remove Answer
> __DELETE__ `/api/v1/answers/:_id` - [Authorization]
