
declare var describe: any;
declare var it: any;
declare var beforeAll: any;
declare var beforeEach: any;
declare var afterEach: any;
declare var afterAll: any;
type Type<T> = { new(...args: any[]): T };
type Injector = { get: <T1>(target: Type<T1>) => T1 };
export type DoneCallback = () => void;

interface TestMetadata {
  attr: string;
  testName: string;
}
interface TestSuiteMetadata {
  tests: TestMetadata[];
  beforeAll: { attr: string; includeArg: boolean; }[];
  beforeEach: { attr: string; includeArg: boolean; }[];
  afterEach: { attr: string; includeArg: boolean; }[];
  afterAll: { attr: string; includeArg: boolean; }[];
  testTarget: any;
}


export type Spec<S, T> = {
  [P in keyof S]: S[P] extends Function ? S[P] extends (arg: T, done?: () => void) => any ? S[P] : never : S[P];
};

const Storage = new WeakMap<any, TestSuiteMetadata>();

function getOrDefault (target: any): TestSuiteMetadata {
  return Storage.get(target) || {
    tests: [],
    beforeAll: [],
    beforeEach: [],
    afterEach: [],
    afterAll: [],
    testTarget: null
  };
}
function Hook (type: 'beforeAll'|'beforeEach'|'afterEach'|'afterAll', includeArg: boolean) {
  return (target: any, attr: string, desc: PropertyDescriptor) => {
    let storage = getOrDefault(target.constructor);
    storage = {
      ...storage,
      [type]: [
        ...storage[type],
        {attr, includeArg}
      ]
    };
    Storage.set(target.constructor, storage);
    return desc;
  };
}
export function BeforeEach (includeArg = true) {
  return Hook('beforeEach', includeArg);
}

export function BeforeAll (includeArg = true) {
  return Hook('beforeAll', includeArg);
}

export function AfterEach (includeArg = true) {
  return Hook('afterEach', includeArg);
}

export function AfterAll (includeArg = true) {
  return Hook('afterAll', includeArg);
}
export function It (target: Record<string, Function> | any, attr: string, desc?: PropertyDescriptor) {
  let storage = getOrDefault(target.constructor);
  storage = {
    ...storage,
    tests: [
      ...storage.tests,
      {
        attr,
        testName: attr
      }
    ]
  };
  Storage.set(target.constructor, storage);
  return desc;
}

export function TestCase (testName?: string) {
  return (target: any, attr: string, desc: PropertyDescriptor) => {
    testName = testName || attr;
    let storage = getOrDefault(target.constructor);
    storage = {
      ...storage,
      tests: [
        ...storage.tests,
        {
          attr,
          testName
        }
      ]
    };
    Storage.set(target.constructor, storage);
    return desc;
  };
}
export enum TestTypes {
  Service,
  ReactComponent
}
export function Describe<T, P extends Spec<P, T>>(testTarget: any, conf: { injector: Injector; type?: TestTypes }) {
  return (target: Type<P>) => {
    let storage = getOrDefault(target);
    storage = {
      ...storage,
      testTarget
    };
    Storage.set(target, storage);

    if (conf.type === TestTypes.ReactComponent) {
      const enzyme = require("enzyme");
      const Adapter = require("enzyme-adapter-react-16");

      enzyme.configure({ adapter: new Adapter() });
    }

    runSuite(target as any, conf.injector, conf.type);
  };
}

export function TestSuite<T>(config: { target: Type<T>; injector: Injector; type?: TestTypes; }) {
  return Describe(config.target, config);
}

function runTest (test: any, prop: string, arg: any, done?: any) {
  if (!test) {
    throw new ReferenceError('test could not be generated check errors above');
  } else if (done) {
    test[prop](arg, done);
  } else {
    test[prop](arg);
  }
}

function runSuite(func: any, injector: Injector, type: TestTypes = TestTypes.Service) {
  const configuredTests = Storage.get(func);
  describe(configuredTests.testTarget, () => {
    let arg: any;
    let test: any;
    const prepArgs = (isBeforeAll: boolean) => () => {
      if (!test) {
        test = type === TestTypes.Service ?
          injector.get(func) :
          new func();
      }
      if (!isBeforeAll || configuredTests.beforeAll.some(hook => hook.includeArg)) {
        const TestTarget = configuredTests.testTarget;
        arg = (type === TestTypes.ReactComponent) ?
          require('enzyme').shallow(require('react').createElement(TestTarget)) :
          injector.get(TestTarget);
      }
    };

    beforeAll(prepArgs(true));
    beforeEach(prepArgs(false));

    configuredTests.beforeAll.forEach(hook => {
      const hookName = hook.attr;
      const length = func.prototype[hookName].length;
      if (length < 2) {
        beforeAll(() => {
          return runTest(test, hookName, arg);
        });
      } else {
        beforeAll((done: any) => {
          runTest(test, hookName, arg, done);
        });
      }
    });

    configuredTests.beforeEach.forEach(hook => {
      const hookName = hook.attr;
      const length = func.prototype[hookName].length;
      if (length < 2) {
        beforeEach(() => {
          return runTest(test, hookName, arg);
        });
      } else {
        beforeEach((done: any) => {
          runTest(test, hookName, arg, done);
        });
      }
    });

    configuredTests.afterEach.forEach(hook => {
      const hookName = hook.attr;
      const length = func.prototype[hookName].length;
      if (length < 2) {
        afterEach(() => {
          return runTest(test, hookName, arg);
        });
      } else {
        afterEach((done: any) => {
          runTest(test, hookName, arg, done);
        });
      }
    });

    configuredTests.afterAll.forEach(hook => {
      const hookName = hook.attr;
      const length = func.prototype[hookName].length;
      if (length < 2) {
        afterAll(() => {
          return runTest(test, hookName, arg);
        });
      } else {
        afterAll((done: any) => {
          runTest(test, hookName, arg, done);
        });
      }
    });

    configuredTests.tests.forEach(testMetadata => {
      const { testName, attr } = testMetadata;
      const length = func.prototype[attr].length;
      if (length < 2) {
        it(testName, () => {
          return runTest(test, attr, arg);
        });
      } else {
        it(testName, (done: any) => {
          runTest(test, attr, arg, done);
        });
      }
    });
  });
}
