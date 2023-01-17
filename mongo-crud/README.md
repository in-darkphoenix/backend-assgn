1. All users whose gender is male
```js
db.users.find({gender:"Male"})
```

2. all users whose ID is even
```js
db.users.find({id:{$mod:[2,0]}})
```

3. Users who currently live in Japan
```js
db.users.find({native:"Japan"})
```

4. Users who are female and live in India
```js
db.users.find({gender:"Female",native:"India"})
```

5. Users who are more than 25 years old
```js
db.users.find({age:{$gt:25}})
```

6. Users who are less than 50 years old and live in United State
```js
db.users.find({age:{$lt:50}, native:"United States"})
```

7. Total number of users who want to relocate to France (count only)
```js
db.users.find({relocate_to:"France"}).count()
```

8. Total number of users who are from USA and want to relocate to russia, sort them by age in ascending order
```js
db.users.find({native:"United States", relocate_to:"Russia"}).sort({age:1})
```

9. get all users, sort them by total number of family member ASC and age DESC order
```js
db.users.find().sort({family_members:1,age:-1})
```