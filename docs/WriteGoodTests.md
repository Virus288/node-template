# Tests - Docs

Generating tests is a good thing. Each test can validate part of your code, how it works, when it break etc. In general, most developers use 3 types of tests:
- E2e ( end to end )
- Unit
- DB ( database )
- Integration = not used that often, but do exist and will exist in this ap, but do exist and will exist in this appp

Each test has its own role and does something else. This guide assumes that you know what each type of tests should do.

You can create tests however you like, but keeping 1 structure, which is easy to understand is nice. Most of tests in this app are written in this way:

```ts
Describe "General information about tests" {

    Describe "Should fail" {
        Describe "No params passed" {
            it "Missing param x"
            it "Missing param y"
        }

        Describe "Incorrect params passed" {
            it "Param 1 has incorrect type"
            it "Param is too small"
            it "Params is too big"
        }
    }

    Describe "Should pass" {
        it "Test 1"
        it "Test 2"
    }

}
```

This way of writing tests will ensure, that tested part of code will be validated in terms of incorrect params, correct params and missing params. Describes around tests will inform you, what type of test failed.

You can find all tests in `/__tests__` folder
