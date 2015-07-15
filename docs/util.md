
# Utilities

the util infrastructure does not contain any functionality relevant to a user of ally.js. It merely contains code supporting other components, e.g. to ensure consistent component function signatures for a consistent APIs.

## Contribution Notes

### Decorate Singleton

`util/decorate-singleton.js` is a decorator wrapping a component's setup (`engage`) and teardown (`disengage`) functions in a way that exposes the component with the following trivialized signature:

```js
function engage() {
  component.engage();
  return {
    disengage: function() {
      component.disengage();
    }
  }
}
```

The "singleton" aspect here is that a components `engage()` function can be invoked from anyone anywhere anytime without having to track if the component has already been initialized before. This is made possible by a simple reference counter. If three components `engage()` but only two `disengage()`, the `component.disengage()` is never executed. Only after the last reference has been `disengage()`d, the component is told to teardown. It is possible to force teardown by executing `disengage({force: true})`.

A component's `engage()` function may return an result object. The decorated `disengage()` function is added to that result object, returned to the caller and cached for subsequent calls to the decorated `engage()` function.

---

### Decorate Options.context

`util/decorate-context` is a decorate wrapping a component's setup (`engage()`) and teardown (`disengage()`) functions in a way that exposes the component with the following trivialized signature:

```js
function engage(options) {
  var context = nodeArray(options.context);
  context.forEach(function(element) {
    component.engage(element);
  });
  return {
    disengage: function() {
      context.forEach(function(element) {
        component.disengage(element);
      });
    }
  }
}
```

Unlike the singleton decorator, the context decorator allows multiple concurrent instances of a component. There is no need for counting references - `disengage()`ing is the library user's obligation.

A component's `engage()` function may return an result object. The decorated `disengage()` function is added to that result object and returned to the caller. Unlike the singleton decorator, the context decorator returns a unique result object for every `engage()` invocation.