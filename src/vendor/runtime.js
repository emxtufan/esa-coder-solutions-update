// Small adapter for the exact third-party libraries in the supplied export.
// Application components are normal JSX modules, not rendered HTML snapshots.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as jsxRuntime from 'react/jsx-runtime';
import { factories } from './production-modules.js';

const cache = new Map([
  [71645, { exports: { ...React, default: React } }],
  [43476, { exports: jsxRuntime }],
  [74080, { exports: { ...ReactDOM, default: ReactDOM } }],
  [47167, { exports: { default: { env: { NODE_ENV: 'production' } } } }],
]);

export function getVendor(id) {
  if (cache.has(id)) return cache.get(id).exports;
  const factory = factories.get(id);
  if (!factory) throw new Error(`Unresolved original dependency: ${id}`);
  const siblings = [...factories].filter(([, value]) => value === factory).map(([key]) => key);
  for (const sibling of siblings) cache.set(sibling, { exports: {} });
  const module = cache.get(id);
  const context = {
    i: dependency => {
      const value = getVendor(dependency);
      return value && (value.__esModule || Object.prototype.hasOwnProperty.call(value, 'default'))
        ? value : { ...value, default: value };
    },
    r: getVendor,
    s: (entries, target = id) => {
      const out = cache.get(target).exports;
      Object.defineProperty(out, '__esModule', { value: true, configurable: true });
      for (let i = 0; i < entries.length;) {
        const name = entries[i++];
        const descriptor = entries[i++];
        if (typeof descriptor === 'number') {
          const value = entries[i++];
          Object.defineProperty(out, name, { get: () => value, enumerable: true, configurable: true });
        } else Object.defineProperty(out, name, { get: descriptor, enumerable: true, configurable: true });
      }
    },
    get e() { return module.exports; },
  };
  factory(context, module, module.exports);
  return cache.get(id).exports;
}
