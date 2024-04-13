---
title: Nullish coalescing and Optional chaining
description: An overview of two operators recently added to Javascript
tags: [javascript, ecmascript]
publishDate: 2020-06-11
canonical_url: https://ganes.dev/nullish-coalescing-and-optional-chaining/
---

In this post, I'll explain about two of the recent additions to the javascript. `Nullish Coalescing` and `Optional Chaining`.

## Nullish Coalescing

When accessing a property of a object in javascript, we usually provide a fallback value incase the property is not present (`undefined`) or `null`.

For Example. Consider a object like this

```js
const Blog = {
	showPost: false,
	blogTitle: "A new Post",
	animationDuration: 0,
	blogSubTitle: "",
	nullVal: null,
};
```

The usual way for this handle fallback is by using the `||` operator

```js
const undefinedValue = Blog.someValue || "default value"; // result: default value
const nullValue = Blog.nullVal || "some other default value"; // result: some other default value

// Other Cases
const showPost = Blog.showPost || true; // expected: false, result: true
const postAnimationDuration = Blog.animationDuration || 400; // expected: 0, result: 400
const blogSubtitle = Blog.blogSubTitle || "Subtitle"; // expected: '', result: Subtitle
```

The first two examples work as we expected, but for other cases we get the result as right hand side value of `||` operator as shown in the above example.This is because the values on left hand side already evaluate to `falsy` in Javascript.

For this problem, we use the `Nullish Coalescing` operator

```js
const showPost = Blog.showPost ?? true; // expected: false, result: false
const postAnimationDuration = Blog.animationDuration ?? 400; // expected: 0, result: 0
const blogSubtitle = Blog.blogSubTitle ?? "Subtitle"; // expected: '', result: ''
```

Once we switch to nullish coalescing operator, we get the expected results.

## Optional Chaining

When accessing a nested property in the object, we usually have to check whether intermediate properties are present.

For Example, Consider a object with nested properties like this

```js
const Person = {
  name:'Ganesh'
  address:{
    home:'Home Address',
    work:'Work Address'
  }
}

const homeAddress = Person.address.home

```

Since, we are accessing nested values, if `address` is undefined we get an error like `Cannot read property home of undefined`. In this case, we use `Optional Chaining` operator.

To use the optional chaining operator, we have to put a `?` before accessing a property. So above example changes to this

```js
const homeAddress = Person?.address?.home;

// We can also use this for functions
someObj?.func();
```

## Combining both of them

Although these both operators are good seperately, when combined they become very useful.
I can take the sample example and nullish coalescing operator at the end of it.

```js
// The result defaults to Home if left side of nullish coalescing is null (or) undefined.
const homeAddress = Person?.address?.home ?? "Home";
```
