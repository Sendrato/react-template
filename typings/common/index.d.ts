declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare namespace NodeJS {
  interface Global {
    fetch: any;
  }
}
