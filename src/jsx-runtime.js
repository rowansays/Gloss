/*
This script was originally released by vanilla-jsx under the MIT License. It has
been forked and modified.

MIT License

Copyright (c) 2020 Rowan Weathers
Copyright (c) 2020 vanilla-jsx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

exports.jsxs = exports.jsx = (tag, { ref, children, ...props } = {}) => {
  if (typeof tag === 'string') {
    const element = document.createElement(tag)

    Object.keys(props).forEach((key) => {
      if (props && props[key]) {
        if (typeof props[key] === 'function') {
          element[key] = props[key]
        } else {
          element.setAttribute(key, props[key])
        }
      }
    })

    if (children) {
      if (children instanceof Array) {
        children.forEach((child) => {
          child && element.append(child)
        })
      } else {
        element.append(children)
      }
    }

    if (ref) {
      if (typeof ref === 'function') {
        ref(element)
      } else {
        element.setAttribute('ref', ref)
      }
    }

    return element
  } else if (typeof tag === 'function') {
    return tag({ ref, children, ...props })
  } else {
    console.error('未知 tag 类型', tag)
  }
}

exports.Fragment = ({ children } = {}) => {
  const fragment = document.createDocumentFragment();

  if (children) {
    const flat = flattenChildren(children)
    flat.forEach(child => {
      fragment.appendChild(child)
    })
  }

  return fragment;
}

function flattenChildren (children) {
  let flat = []
  if (Array.isArray(children)) {
    children.forEach((child) => {
      flat = flat.concat(flattenChildren(child))
    });
  } else {
    flat.push(children);
  }
  return flat
}
