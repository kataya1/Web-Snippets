Intersection Observer is a API that lets you observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Some key things to know about Intersection Observer:

1. It lets you asynchronously observe changes in the intersection of a target element with an ancestor element or viewport.

2. It can improve performance since you are notified only when the intersection actually changes, rather than polling on each animation frame.

3. You set up an Intersection Observer by creating a new IntersectionObserver object, passing it a callback function and an options object.
```js
const observer = new IntersectionObserver(callback, {
//   options
    // root: document.querySelector('scroller')
});
```
4. The callback function gets executed whenever the intersection of the target element changes with the root element you specify. You get an array of IntersectionObserverEntry objects representing each intersection change.
```js
// element is the element beeing observed
document.querySelectorAll('.element').forEach(el => {
  observer.observe(el);
}); 
```
5. Some options you can specify:

- root: The element to use as the viewport for checking visibility of the target. Default is the browser viewport.

- rootMargin: Margin around the root. Can have values similar to the CSS margin property. Default is 0px. 

- threshold: Array of numbers between 0 and 1 indicating at what percentage of the target's visibility the callback should be executed. Default is 0 (as soon as even 1px is visible).
                        enter | leave
    // threshold: 0   - Called at 1px intersects, all px left
    // threshold: 0.1 - Called at 10% intersecting, 90% leaving   
    // threshold: 0.5 - Called at 50% intersecting, < 50% visible leaving   
    // threshold: 1   - Called at 100% intersecting, called as soon as 1px leaves 




## use cases:

1. Lazy load images:
```js
const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imgObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imgObserver.observe(img);
});
```

2. Auto pause/play video:
```js 
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
});

document.querySelectorAll('video').forEach(video => {
  videoObserver.observe(video);
});
```

3. Animate an element when it scrolls into view:
```js
const animateObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  }); 
});

document.querySelectorAll('.animate-me').forEach(el => {
  animateObserver.observe(el);
});
```
## browser viewport vs Ancestor element
By default, the Intersection Observer API observes the target element's intersection with the browser viewport.

```js
const observer = new IntersectionObserver(callback, {
  root: document.querySelector('#scrollContainer')
});
```
This will now observe the intersection of the target elements with the element with id "scrollContainer" instead of the viewport.


## What is the event that triggers the callback function?
The Intersection Observer callback function is triggered whenever the intersection of the target element and the root (viewport or ancestor element) changes.

Specifically, it is triggered in these scenarios:

1. When the target element intersects the root for the first time (starts being visible)
2. When the target element stops intersecting the root (goes out of view)
3. When the intersection ratio of the target element with the root changes. For example, if it goes from 0% visible to 50% visible.

 When the amount of intersection between the target element and root element increases or decreases enough to cross one of the thresholds specified in the options.

For example, if you specify:
```js
const observer = new IntersectionObserver(callback, {
  threshold: [0, 0.25, 0.5, 0.75, 1] 
});
```
Then the callback will be triggered when:

- The target element first intersects 0% (becomes visible)
- Intersection increases to 25% of the target visible 
- Intersection increases to 50% 
- Intersection increases to 75%
- Target becomes fully visible (100% intersection) 
- And vice versa as the target element goes out of view.

So essentially, the callback is triggered on intersection changes and threshold crossings in both directions (increasing and decreasing).

## What does the callback function recieve? 
The callback function receives an array of IntersectionObserverEntry objects, one for each target element that has triggered an intersection change.

Each IntersectionObserverEntry contains information about the intersection change for that element, including:

- target: The target DOM element
- time: Timestamp of the intersection change 
- rootBounds: Bounding rect of the root element 
- boundingClientRect: Bounding rect of the target element 
- intersectionRect: Bounding rect representing the area of intersection between the target element and root (intersectionRect.Area <= boundingClientRect.Area)
- intersectionRatio: Ratio of intersectionRect to the target element's boundingClientRect
- isIntersecting: TRUE if the target element intersects with the root, FALSE if it stops intersecting.

So in your callback function, you can check each entry to see information like:

- entry.isIntersecting to see if the target just started or stopped intersecting 
- entry.intersectionRatio to see how visible the target now is
- entry.target to get a reference to the actual target DOM element

And perform any logic based on those values. Hope this helps clarify what triggers the Intersection Observer callback! Let me know if you have any other questions.

--- 
### advanced notes
entry.rootbounds' -which is the bounds of the intersection of the scroll container- top, bottom, left,right gets changed by rootMargin. so you don't need to do any additional calculations. also by the padding of the scrollable container 
btw( rootMargin representation will not show correctly because of padding)

However threshold is needs to be accounted for differently. for example
`entry.target.getBoundingClientRect().bottom < entry.rootBounds.top` will give different things depending on the threshold

at threshold of 1. if one pixel of the element leaves the root, the callback function inside the IntersectionObserver will be called and since it's only one pixel this condition will be false `elemBounds.bottom < ioBounds.top` the bottom of the element is still inside root.