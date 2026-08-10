import React from 'react';
import Home from './app/page';

const iterations = 50000;

console.time("Baseline Component Render");
for (let i = 0; i < iterations; i++) {
  Home();
}
console.timeEnd("Baseline Component Render");
