import { assert } from '../package-test.ts';
const { test } = Deno;

import { Cache } from '../decorator/cache-decorator.ts';
import { InMemoryCache } from '../../storage/core/mod.ts';
import { liberty } from '../mod.ts';

class TestMethodBaseClass {
    add(numOne: number, numTwo: number) {
        return numOne + numTwo;
    }
}

class TestMethodClass extends TestMethodBaseClass {
    add(numOne: number, numTwo: number) {
        return super.add(numOne, numTwo)
    }
}

class TestMethodMemoizeClass extends TestMethodBaseClass {
    @Cache()
    add(numOne: number, numTwo: number) {
        return super.add(numOne, numTwo)
    }
}


function setup() {
    let testMethodMemoizeClass: TestMethodMemoizeClass;
    let testMethodClass: TestMethodClass;
    liberty.cache = new InMemoryCache();
    testMethodMemoizeClass = new TestMethodMemoizeClass();
    testMethodClass = new TestMethodClass();
    return {
        testMethodMemoizeClass,
        testMethodClass
    }
}


test('Ensure classes is working as expected', () => {
    const { testMethodClass, testMethodMemoizeClass } = setup();    
    assert(testMethodClass.add(2,3) === 5);
    assert(testMethodMemoizeClass.add(2,3) === 5);
});
