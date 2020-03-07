---
title: Stale State in React Hooks
description: Problems with Stale State in React hooks and how to fix them
date: 2020-03-06
canonical_url: https://ganes.dev/stale-state-in-react-hooks
tags: react, javascript, hooks, useEffect
---

If you have been using React Hooks for some time or if you're new to using React hooks, one of the most common (or) confusing problems you face is that you sometimes the stale value of the state used in the application. Let us understand how to solve this problem.

## Using values in useEffect with empty dependency array

Consider this code

```js
function App() {
  const [title, setTitle] = useState('initial Title');

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setTitle('New Title');
        }}>
        Change Title
      </button>
    </>
  );
}
```

Here the title of the document is _Initial Title_. And we expect the the document title to change when **Change Title** button is clicked.

But, that does not happen here. This is because the useEffect expects the dependencies used inside the **effect** to be passed as second argument. Since we use title inside useEffect we need to pass it as dependency. So, our above code changes to this.

```js
// Rest of the part remains the same

useEffect(() => {
  document.title = title;
}, [title]);
```

<br/>

> Note: This will also work, if we pass no second argument in useEffect. But the that will run on every render. And passing all dependicies used inside useEffect is considered good
> practice and also good for performance.

## Using values inside callback passed to useEffect

This is a little subtle than the previous bug. Might be a little harder to debug.

```js
function App() {
  const [cond, setCond] = useState(false)

  const someCallback = () => {
    if (cond) {
      alert('hello')
    }
  }

  useEffect(() => {
    someCallback()
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setCond(c => !c)
        }}
      >
        Change State
      </button>
    </>
  )
}
}
```

In the above example, we are using the state value inside the callback passed to the useEffect. We expect the our component to alert hello everytime the condition becomes **true**.

But that does not happen here. This is because our initial value of **cond** is captured inside the callback passed to useEffect and does not get updated in subsequent renders.

Since, we are using this callback inside useEffect we need to tell React when the callback updates. In order to do that we need to wrap our callback in `useCallback hook` and pass the dependencies used inside the callback as second argument and then pass the callback to useEffect and list the callback as a dependency. So, our above code changes to this

```js
// Rest of the part remains the same

const someCallback = useCallback(() => {
  if (cond) {
    alert('hello');
  }
}, [cond]);

useEffect(() => {
  someCallback();
}, [someCallback]);
```

<br/>

To Avoid this kind of problems, I suggest to use the official [eslint-plugin](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks) from the React team.
