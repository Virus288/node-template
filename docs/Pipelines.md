# Pipelines - docs

This application uses github ci/cd. Adding new branch will not do anything. Creating MR/PR to dev will trigger jobs, which will:

- Validate your typescript code ( tsc )
- Validate quality of your typescript code ( eslint )
- Install and cache dependencies
- Build your application 
- Audit it

If any of those steps won't pass, you won't be able to merge your branch. If you really need to push this code on dev / master, please message main dev ( Jakub ). If you are a contributor, you will have access to push, but not to bypass pipelines.
