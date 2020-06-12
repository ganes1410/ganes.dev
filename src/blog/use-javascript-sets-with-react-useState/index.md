---
title: Using Javascript Sets with React useState
description: Practical use of Set in React
date: 2019-11-15
---

Recently, I wanted to try something different. To use a `Set` object as a react state value.

Initially, I tried to find examples of this online but could not find anything useful or relatable. So, let me explain Sets with an example of my own.

First, we have a list of products and we are filtering the products based on the brand(s) selected by the user.

My initial idea for this is to use an array to store the filters (selected brand names) I need to apply and append it to query params in the url. But then I thought Set would be a more apt data structure to go for.

Let's say we have three brands - Nike, Adidas and Puma; and a list of products each belonging to one of the above three brands.

The initial state that holds the user selected brands is as below.

```js
const [selectedBrands, setSelectedBrands] = useState(new Set());
```

So, whenever we click on a brand, we need to add the brand to the set object and if that brand is already present in the Set, we need to remove it. And based on the current state of the selected brands, we need to render the products list.

```js
const brands = ['Nike', 'Adidas', 'Puma'];

function App() {
  function handleBrandSelection(brand) {
    if (selectedBrands.has(brand)) {
      selectedBrands.delete(brand);
      setSelectedBrands(selectedBrands);
    } else {
      selectedBrands.add(brand);
      setSelectedBrands(selectedBrands);
    }
  }

  return (
    <>
      {/* Brands Section */}
      <section className="filters">
        {brands.map(brand => (
          <div onClick={() => handleBrandSelection(brand)}>
            // brandName
            {brand}
            // Condition to show the checkmark whether it is selected
            {selectedBrands.has(brand) ? (
              <span
                role="img"
                aria-label="checked icon"
                className="checked-icon">
                ✅
              </span>
            ) : null}
          </div>
        ))}
      </section>

      {/* Products Section */}
      <section className="products">
        {/* List of products rendered here */}
      </section>
    </>
  );
}
```

Clearly, the above code would NOT work.

This is because while updating, we are sending the same `Set` object that we used in State. Since it has the same reference in memory, React will not update it.

The solution for this is to create a new Set object whenever we change the Set object. So, in the above example, let's create a new Set object while deleting and adding values to the State.

```js
function handleBrandSelection(brand) {
  /*
   * This creates a new Set object based on
   * previous Set object passed as an argument
   * In this case, it is the selected Brands
   */

  const newSet = new Set(selectedBrands);
  if (selectedBrands.has(brand)) {
    newSet.delete(brand);
    setSelectedBrands(newSet);
  } else {
    newSet.add(brand);
    setSelectedBrands(newSet);
  }
}
```

There is another way to do this if we do not create set object every time while updating the value. That is we can wrap our set in an array. Here is a example of that by [David.K Piano](https://twitter.com/DavidKPiano/)

`oembed: https://twitter.com/DavidKPiano/status/1134466450293436416`

Here is a modest codesandbox example

`oembed: https://codesandbox.io/s/sleepy-leaf-fy9r6`

I hope this is useful to you! Feel free to leave your thoughts in the comments section.

> This post is cross-posted to <a href="https://dev.to/ganes1410/using-javascript-sets-with-react-usestate-39eo" target='_blank'>dev.to</a>
