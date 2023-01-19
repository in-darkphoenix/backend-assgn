## EMPLOYEE SALARY
1. Count of Men in Engineering
```js
db.employee_salary.countDocuments({
  gender: "Male",
  department: "Engineering",
})
//43
```

2. Count of Women in Engineering who earn less than one million
```js
db.employee_salary.countDocuments({
  gender: "Female",
  department: "Engineering",
  salary: {
    $lt: 1000000,
  },
})
//12
```

3. Count of people make less than 80k
```js
db.employee_salary.countDocuments({
  salary: {
    $lt: 80000,
  },
})
//9
```

4. People who belong Accounting and Legal who make less than 100k
```js
db.employee_salary.find({
  department: { $in: ["Accounting", "Legal"] },
  salary: {
    $lt: 100000,
  },
})
```

5. Top 10 earning Men
```js
db.employee_salary.find({ gender: "Male" }).sort({ salary: -1 }).limit(10)
```

6. Bottom 10 earning Women
```js
db.employee_salary.find({ gender: "Female" }).sort({ salary: 1 }).limit(10)
```

7. Top 5 earning Engineering people
```js
db.employee_salary
  .find({ department: "Engineering" })
  .sort({ salary: -1 })
  .limit(5)
```

8. Bottom 5 earning Legal people
```js
db.employee_salary.find({ department: "Legal" }).sort({ salary: 1 }).limit(5)
```

9. Women ranked 30 to 50 in terms of salary earned
```js
db.employee_salary
  .find({ gender: "Female" })
  .sort({ salary: -1 })
  .skip(30)
  .limit(20)
```

10. Men ranked 50 to 100 in terms of salary earned
```js
db.employee_salary
  .find({ gender: "Male" })
  .sort({ salary: -1 })
  .skip(50)
  .limit(100)
```

11. Bottom 50 earning women in Engineering
```js
db.employee_salary
  .find({ gender: "Female" }, { department: "Engineering" })
  .sort({ salary: 1 })
  .limit(50)
```

12. Top 50 earning men in Human Resources
```js
db.employee_salary
  .find({ gender: "Male" }, { department: "Human Resources" })
  .sort({ salary: -1 })
  .limit(50)
```

## CARS QUERIES
1. Men who own a Pink car
```js
db.cars.find({ gender: "Male", car_color: "Pink" })
```

2. Women who own a Red or a Blue Car
```js
db.cars.find({ gender: "Female", car_color: { $in: ["Red", "Blue"] } })
```

3. Men who purchased the car in the year 1998
```js
db.cars.find({ gender: "Male", purchase_year: "1998" })
```

4. Women who purchased a Yellow car in the year 1985
```js
db.cars.find({ gender: "Female", car_color: "Yellow", purchase_year: "1985" })
```

5. Men who either have a Red or Green car and either live in Germany or Kenya
```js
db.cars.find({
  $and: [
    { car_color: { $in: ["Red", "Green"] } },
    { country: { $in: ["Germany", "Kenya"] } },
    { gender: "Male" },
  ],
})
```

6. People from India who purchased cars in the year 2001
```js
db.cars.find({ country: "India", purchase_year: "2001" })
```

7. People from Germany or Egypt who purchased cars in the year 1998 or 1992
```js
db.cars.find({
  $and: [
    { country: { $in: ["Germany", "Egypt"] } },
    { purchase_year: { $in: ["1998", "1992"] } },
  ],
})
```

8. Women from India who own a Blue car
```js
db.cars.find({ gender: "Female", country: "India", car_color: "Blue" })
```

9. Men from Germany who purchased cars in 1998 and Men from Egypt who purchased cars in 1992
```js
db.cars.find({
  gender: "Male",
  $or: [
    { country: "Germany", purchase_year: "1998" },
    { country: "Egypt", purchase_year: "1992" },
  ],
})
```

10. Women who own a Green car and are not from Pakistan
```js
db.cars.find({
  gender: "Female",
  car_color: "Green",
  country: { $ne: "Pakistan" },
})
```

## STUDENT MARKS
1. Count of all the female students
```js
db.students_marks.countDocuments({ gender: "Female" })
//483
```

2. Count of all male students who scored more that 85 in maths, science and english
```js
db.students_marks.countDocuments({
  $and: [
    { maths: { $gt: 85 } },
    { science: { $gt: 85 } },
    { english: { $gt: 85 } },
  ],
})
//4
```

3. Count of all students who scored between 50 and 75 marks in maths and english
```js
db.students_marks.countDocuments({
  $and: [{ maths: { $gt: 50, $lt: 75 } }, { english: { $gt: 50, $lt: 75 } }],
})
//46
```

4. Count of students from class I to class V who score more that 50 in all subjects
```js
db.students_marks.countDocuments({
  class: { $in: ["I", "II", "III", "IV", "V"] },
  $and: [
    { maths: { $gt: 50 } },
    { science: { $gt: 50 } },
    { english: { $gt: 50 } },
  ],
})
//52
```

5. Find all the female students from grade X section A who scored less that 25 in all subjects
```js
db.students_marks.find({
  $and: [
    { gender: "Female" },
    { class: "X" },
    { section: "A" },
    { maths: { $lt: 25 } },
    { science: { $lt: 25 } },
    { english: { $lt: 25 } },
  ],
})
```

6. Top 3 students in grade V based on maths score
```js
db.students_marks.find({ class: "V" }).sort({ maths: -1 }).limit(3)
```

7. Bottom 5 students in grade I based on science score
```js
db.students_marks.find({ class: "I" }).sort({ science: 1 }).limit(5)
```

8. Students from section A who scored less than 50 in all the subjects
```js
db.students_marks.find({
  $and: [
    { section: "A" },
    { maths: { $lt: 50 } },
    { science: { $lt: 50 } },
    { english: { $lt: 50 } },
  ],
})
```

9. Students from section C who scored more that 75 in all the subjects
```js
db.students_marks.find({
  $and: [
    { section: "C" },
    { maths: { $gt: 75 } },
    { science: { $gt: 75 } },
    { english: { $gt: 75 } },
  ],
})
```

10. Students who will fall in page 3 if ordered by increasing order of maths scores (Assume 10 results per page)
```js
db.students_marks.find().sort({ maths: 1 }).skip(20).limit(10)
```

11. Students who will fall in page 5 if ordered by descreasing order of science scores (Assume 20 results per page)
```js
db.students_marks.find().sort({ science: -1 }).skip(80).limit(20)
```

12. Female Students who will fall in page 4 if ordered by increasing order of science scores and maths scores (Assume 5 results per page)
```js
db.students_marks.find().sort({ science: 1, maths: 1 }).skip(15).limit(5)
```

13. Male Students who will fall in page 3 if ordered by decreasing order of science, maths and english scores (Assume 15 results per page)
```js
db.students_marks
  .find({ gender: "Male" })
  .sort({ science: -1, maths: -1, english: -1 })
  .skip(30)
  .limit(15)
```

## USER QUERIES
1. Find all the female users
```js
db.users.find({ gender: "Female" })
```

2. Find all the female users who speak one of the two languages Kannada, Hindi
```js
db.users.find({ gender: "Female", language: { $in: ["Kannada", "Hindi"] } })
```

3. Find all the male users who can speak Hindi and female users who can speak Kannada
```js
db.users.find({
  $or: [
    { $and: [{ gender: "Male" }, { language: "Hindi" }] },
    { $and: [{ gender: "Female" }, { language: "Kannada" }] },
  ],
})
```

4. Find all the users who wear the shirt size S
```js
db.users.find({ shirt_size: "S" })
```

5. Find all the female users who wear the shirt size XL
```js
db.users.find({ gender: "Female", shirt_size: "XL" })
```

6. Find all the English speaking male users and Hindi speaking female users
```js
db.users.find({
  $or: [
    { $and: [{ gender: "Male" }, { language: "English" }] },
    { $and: [{ gender: "Female" }, { language: "Hindi" }] },
  ],
})
```

7. Find all the male users who can speak Hindi or English and female users who can speak Kannada or German
```js
db.users.find({
  $or: [
    { $and: [{ gender: "Male" }, { language: { $in: ["Hindi", "English"] } }] },
    {
      $and: [
        { gender: "Female" },
        { language: { $in: ["Kannada", "German"] } },
      ],
    },
  ],
})
```

8. Find all the female users who can speak Bengali who wear shirt size XL and male users who speak German and wear shirt size either L or M
```js
db.users.find({
  $or: [
    {
      $and: [
        { gender: "Female" },
        { language: "Bengali" },
        { shirt_size: "XL" },
      ],
    },
    {
      $and: [
        { gender: "Male" },
        { language: "German" },
        { shirt_size: { $in: ["L", "M"] } },
      ],
    },
  ],
})
```

9. Find all the female users who speak any of the Indian languages (Hindi, Punjabi, Bengali, Gujarati, Tamil, Malayalam)
```js
db.users.find({
  gender: "Female",
  language: {
    $in: ["Hindi", "Punjabi", "Bengali", "Gujarati", "Tamil", "Malayalam"],
  },
})
```

10. Men who can speak Korean
```js
db.users.find({
  gender: "Male",
  language: "Korean",
})
```
