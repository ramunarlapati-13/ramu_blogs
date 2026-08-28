import '@testing-library/jest-dom';

if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
      ok: true,
    } as unknown as Response)
  );
}

if (typeof global.Response === 'undefined') {
  global.Response = class {} as unknown as typeof Response;
}
