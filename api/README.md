# API

[Auth](#auth)
- [Sign Up](#sign-up)
- [Sign In](#sign-in)
- [Get profile by token](#get-profile-by-token)
- [Sign Out](#sign-out)
- [Change Password](#change-password)
- [Restore Password](#restore-password)
- [Update Own Profile](#update-own-profile)

[User](#user)
- [User list](#user-list)
- [Get Users statistic](#get-users-statistic)
- [Get Users Excel statistic](#get-users-excel-statistic)
- [Get Single User](#get-single-user)
- [Create](#create-user)
- [Update](#update-user-details)
- [User Groups](#user-groups)
- [Remove User](#remove-user)

[Activities](#activities)
- [get Activities](#get-activities)
- [Get Single Activity](#get-single-activity)
- [Get activity groups](#get-activity-groups)
- [Create Activity](#create-activity)
- [Update Activity](#update-activity)
- [Remove Activity](#remove-activity)

[Groups](#groups)
- [Get Gropups](#get-groups)
- [Get Single Group](#get-single-group)
- [Get Group Coaches](#get-group-coaches)
- [Get Group Members](#get-group-members)
- [Get lesson at this moment](#get-lesson-at-this-moment)
- [Group subscribe](#group-subscribe)
- [Group Unsubscribe](#group-unsubscribe)
- [Create Group ](#create-group)
- [Update Group](#update-group)
- [Remove Coaches](#remove-group)

[Lessons](#lessons)
- [Get Lessons](#get-lessons)
- [Get Lessons statistic](#get-lessons-statistic)
- [Get single Lesson](#get-single-lesson)
- [Get statistic info for user](#get-statistic-info-for-user)
- [Create lesson](#create-lesson)
- [Make check-in for lesson](#make-check-in-for-lesson)
- [Update Lesson](#update-lesson)



[Notes](#notes)
- [Get Notes](#get-notes)
- [Get Unread Notes](#get-unread-notes)
- [Get Unread Notes Count](#get-unread-notes-count)
- [Get Single Note](#get-single-note)
- [Create Note](#create-note)
- [Update Note](#update-note)
- [Mark as read Note](#mark-as-read-note)
- [Remove Note](#remove-note)

[Messages](#messages)
- [Get Messages](#get-messages)
- [Get Unread Messages](#get-unread-messages)
- [Get Unread Messages Count](#get-unread-messages-count)
- [Get Single Note](#get-single-message)
- [Create Message](#create-message)
- [Mark as read Message](#mark-as-read-message)
- [Remove Message](#remove-message)

[My](#my)
- [Get My Messages](#get-my-messages)
- [Get My Unread Messages](#get-my-unread-messages)
- [Get My Unread Messages Count](#get-my-unread-messages-count)
  
[Image](#image)
- [Get Single](#get-single-image)


[Settings](#settings)
- [Get Settings](#get-settings)
- [Get Single Setting](#get-single-setting)
- [Create Setting](#create-setting)
- [Update Setting](#update-setting)
- [Remove Setting](#remove-setting)

[Statistics](#statistics)
- [Get Statistics](#get-statistics)
- [Get Statistics](#get-statistics-excel)


 


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
brew services restart mongodb
```


## API docs
### Auth

#### Sign In
> __POST__ `/api/v1/auth/sign-in` 

```
@params
       email {string}
       password {string}
 ```

#### Sign Up
> __POST__ `/api/v1/auth/sign-up` 

```
 @params
       email {string}
       password {string}
       type: {String} - user || volunteer
       profile: {Object},
       avatar: {File}
```
#### Get profile by token
> __GET__ `/api/v1/auth/my` - [Authorization]

#### Sign Out 
> __POST__ `/api/v1/auth/sign-out` - [Authorization]

#### Change Password

> __PUT__ `/api/v1/auth/change-password` - [Authorization]

```
 @params
       newPassword {string}
       password {string}
```
#### Restore Password

> __POST__ `/api/v1/auth/restore-password`

```
 @params
       email {string}
```

#### Update Own Profile
> __PATCH__ `/api/v1/auth/my` - [Authorization]

```
 @params
        email {string}
        avatar {Image}
        documentApproval {
         personalId: Boolean
         scanId: Boolean
        }
        profile: {Object}
```


### User
####  User list
 > __GET__ `/api/v1/users/` - [Authorization]

```
 @optionalQueryParameters
         search {String} - value to search
         limit {Number} - count of item to send
         skip {Number} - value to search
         type {String} - volunteer || users || admin
         isApproved {Boolean} -  is user approved by admin

```

#### Get Users Statistic

> __GET__ `/api/v1/users/statistic` - [Authorization]

```
 @optionalQueryParameters
       filter.
           from {Date} - filter from date
           to {Date} - filter to date
           groupId {String} - filter by group
           activityId - {String} - filter by activity
```

#### Get Users Excel Statistic

> __GET__ `/api/v1/users/statistic/excel` - [Authorization]

```
 @optionalQueryParameters
       filter.
           from {Date} - filter from date
           to {Date} - filter to date
           groupId {String} - filter by group
           activityId - {String} - filter by activity
```

#### Get Single User
> __GET__ `/api/v1/users/:_id` - [Authorization]
#### Create User
> __POST__ /api/v1/users/ - [Authorization]

```
 @params
 email {string}
 avatar {Image}
 documentApproval {
          personalId: Boolean
          scanId: Boolean
       }
 profile: {Object}
 role: {String}
 ```

#### Update User details
> __PATCH__ `/api/v1/users/:_id` - [Authorization]

```
 @params
        email {string}
        avatar {Image}
        documentApproval {
         personalId: Boolean
         scanId: Boolean
        }
        profile: {Object}
        role: {String}
```
#### User groups
> __GET__ `/api/v1/users/:_id/groups` - groups list

```
 @optionalQueryParameters
       limit {Number} - count of item to send
       skip {Number} - value to search
```

#### Remove user
> __DELETE__ `/api/v1/users/:_id` - [Authorization]

### Activities
#### Get Activities
> __GET__ `/api/v1/activities/` - [Authorization]

```
 @optionalQueryParameters
       search {String} - value to search
       limit {Number} - count of item to send
       skip {Number} - value to search
       filter.
             memberIds - filter by members
       
```
#### Get Activity
> __GET__ `/api/v1/activities/:_id` - [Authorization]

### Get activity groups  
> GET /api/v1/activities/:_id/groups - [Authorization]

#### Create Activity
> __POST__ `/api/v1/activities/` - [Authorization]


```
@param
    title {String}
    description {String}
    contact {String}
    picture {Image}

```

#### Update Activity
> __PATCH__ `/api/v1/activities/:_id` - [Authorization]

```
@param
    title {String}
    description {String}
    contact {String}
    picture {Image}

```
#### Remove Activity
> __REMOVE__ `/api/v1/activities/:_id` - [Authorization]


## Groups
### Get Groups
> GET `/api/v1/groups/`  - [Authorization]

### Get Single Group
> GET `/api/v1/groups/:_id`  - [Authorization]

### Get Group Coaches
> GET `/api/v1/groups/:_id/coaches` - [Authorization]

### Get Group Members
> GET `/api/v1/groups/:_id/members` - [Authorization]

### Get lesson at this moment
> GET `/api/v1/groups/:_id/active-lesson` - [Authorization]

### Group Subscribe
> PATCH `/api/v1/groups/:_id/subscribe` - [Authorization]

### Group Unsubscribe
> PATCH `/api/v1/groups/:_id/unsubscribe` - [Authorization]


### Create Group
> __POST__ `/api/v1/groups/` - Group insert
 
 ```
 @param
   title {String}
   description {String}
   contact {String}
   memberIds [ObjectId],
   coachIds [ObjectId],
   activityId {ObjectId},
   schedule:
           startAt: {Date}
           endAt: {Date}
           day: {Number}
 ```
 
### Update Group
> __PATCH__ `/api/v1/groups/:_id` - Group insert
 
 ```
 @param
       title {String}
       description {String}
       contact {String}
       memberIds [ObjectId],
       coachIds [ObjectId],
       schedule:
               startAt: {Date}
               endAt: {Date}
               day: {Number}
 ```

### Remove Group
> __DELETE__ `/api/v1/groups/:_id` - Group remove 

### Lessons
#### Get Lessons

> __GET__ `/api/v1/lessons/` - [Authorization]

```
 @optionalQueryParameters
       limit {Number} - count of item to send
       skip {Number} - value to search
       filter.
           from {Date} - filter from date
           to {Date} - filter to date
           groupId {String} - filter by group
           userId {String} - filter from members
           activityId - {String} - filter by activity
       fields. 
           group.
              [fieldName] {1 || 0} - return field of group
           activity.
              [fieldName] {1 || 0} - return field of activity
```

#### Get Lessons Statistic

> __GET__ `/api/v1/lessons/statistic` - [Authorization]

```
 @optionalQueryParameters
       filter.
           from {Date} - filter from date
           to {Date} - filter to date
           groupId {String} - filter by group
           activityId - {String} - filter by activity
```

#### Get single Lesson

> __GET__ /api/v1/lessons/:_id - [Authorization]

#### Get statistic info for user

> __GET__ `/api/v1/lessons/statistic/:userId` - [Authorization]

```
 @optionalQueryParameters
   filter.
       from {Date} - from date
       to {Date} - to date
       groupId - {String} - filter by group
       activityId - {String} - filter by activity

```

### Get statistic for each schedule
> __GET__ `/api/v1/lessons/statistic/:userId/:scheduleId`  - [Authorization]

#### Create lesson
> __POST__ /api/v1/lessons/:groupId

#### Make check in for lesson
> __POST__ /api/v1/lessons/check-in/:groupId

#### Update Lesson
> __PATCH__ /api/v1/lessons/:_id - [Authorization]

```
@param
    memberIds [String]
```

### Notes
#### Get Notes
> __GET__ `/api/v1/notes/` - [Authorization]

```
 @optionalQueryParameters
       limit {Number} - count of item to send
       skip {Number} - value to search
       search {String} - value to search
       filter.
           from {Date} - filter from date
           to {Date} - filter to date
           activityId {String} - filter by activity
           createBy {String} - filter from creator
       fields
           user - return also user who create note
```
#### Get unread notes
> __GET__ `/api/v1/notes/unread/:activityId` - [Authorization]

```
 @optionalQueryParameters
       limit {Number} - count of item to send
       skip {Number} - value to search
       fields
           user - return also user who create note
```
#### Get unread notes count
> __GET__ `/api/v1/notes/unread/:activityId/count` - [Authorization]


#### Get Single Note
> __GET__ `/api/v1/notes/:_id` - [Authorization]
````
@optionalQueryParameters
   field.
        user {0 || 1} - user object who create note
````


#### Create Note
> __POST__ `/api/v1/notes/` - [Authorization]


```
@param
    title {String}
    description {String}
    activityId {String
```

#### Mark as read Note
> __PATCH__ `/api/v1/notes/:_id/read` - [Authorization]

#### Update Note
> __PATCH__ `/api/v1/notes/:_id` - [Authorization]

```
@param
    title {String}
    description {String}
```
#### Remove Note
> __REMOVE__ `/api/v1/notes/:_id` - [Authorization]



### Messages
#### Get Messages
> __GET__ `/api/v1/messages/` - [Authorization]

```
 @optionalQueryParameters
        limit {Number} - count of item to send
        skip {Number} - value to search
        filter.
          from {Date} - filter from date
          to {Date} - filter to date
          activityId {String} - filter by activity
          groupId - {String} - filter by group
          createBy {String} - filter from creator
          userId {String} - filter by user who should get message
```
#### Get Unread Messages
> __GET__ `/api/v1/messages/unread` - [Authorization]

```
 @optionalQueryParameters
        limit {Number} - count of item to send
        skip {Number} - value to search
```
#### Get Unread Messages Count
> __GET__ `/api/v1/messages/unread/count` - [Authorization]

#### Get Single Message
> __GET__ `/api/v1/messages/:_id` - [Authorization]


#### Create Message
> __POST__ `/api/v1/messages/` - [Authorization]


```
@param
    title {String}
    description {String}
    userIds [String] - users ids 
    activityIds [String] - activities ids
    groupIds [String] - groups ids
```

#### Mark as read Message
> __PATCH__ `/api/v1/messages/:_id/read` - [Authorization]

#### Remove Message
> __REMOVE__ `/api/v1/messages/:_id` - [Authorization]


### My
#### Get My Messages
> __GET__ `/api/v1/messages/` - [Authorization]

```
 @optionalQueryParameters
        limit {Number} - count of item to send
        skip {Number} - value to search
        filter.
           from {Date} - filter from date
           to {Date} - filter to date
           activityId {String} - filter by activity
           groupId - {String} - filter by group
           createBy {String} - filter from creator
        field.
              user {0 || 1} - user object who create message
        
```
#### Get My Unread Messages
> __GET__ `/api/v1/messages/unread` - [Authorization]

```
 @optionalQueryParameters
        limit {Number} - count of item to send
        skip {Number} - value to search
```
#### Get My Unread Messages Count
> __GET__ `/api/v1/messages/unread/count` - [Authorization]


### Image
#### Get Single Image
> __GET__ `/api/v1/images/:_id` - [Authorization]


### Setting

#### Get Settings
> __GET__ `/api/v1/settings/` 

```
 @optionalQueryParameters
        limit {Number} - count of item to send
        skip {Number} - value to search
     
```

#### Get Single Setting
> __GET__ `/api/v1/settings/:_id`


#### Create Setting
> __POST__ `/api/v1/settings/:_id` - [Authorization]


```
@param
    title {String}
    description {String}
    type {String}
```


#### Update Setting
> __PATCH__ `/api/v1/settings/:_id` - [Authorization]

```
@param
    title {String}
    description {String}
```
#### Remove Setting
> __REMOVE__ `/api/v1/settings/:_id` - [Authorization]

### Statistics

#### Get Statistics
> __GET__ `/api/v1/statistics/` 

```
 @optionalQueryParameters
      from {Date} - count of item to send
       to {Date} - value to search
       activityId - {String}
       groupId - {String}
     
```
#### Get Statistics Excel
> __GET__ `/api/v1/statistics/excel` 

```
 @optionalQueryParameters
      from {Date} - count of item to send
       to {Date} - value to search
       activityId - {String}
       groupId - {String}
     
```