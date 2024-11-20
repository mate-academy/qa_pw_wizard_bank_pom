# Practical task description

## Pre-conditions
1. Your GIT account must be linked to the platform to complete this task. If you do not know what this means, please use [this task](https://mate.academy/learn/qa-automation-basic/module-recap-next-stages?section=practice&theoryId=5911&learnItemsFilter=All&testTaskSlug=qa_wizard_bank_test_project) instructions instead. 

2. Click the “Create Fork” button in the [task]() the platform. 
3. Fork the repository.  
3. Clone the forked repo in VSCode, open project
4. Open Terminal in VSCode.
5. Create a new branch using the command:
```bash
git checkout -b e2e_testing
```
6. Run the installation command:
```bash
npm i
```

## Hint:
If you removed the default customers or made other changes to the app's default state, you can clean the browser application storage to restore it. 

## Main task:
1. Open the ```/tests``` folder. It contains two subfolders:
- ```/tests/customer``` - contains already implemented tests. You can use these tests as a reference. 
- ```/tests/manager``` - contains empty tests. Your task is to implement all these tests. 
2. Open the ```/src/pages``` folder. It contains implemented classes for customer pages and empty classes for manager pages. Your task is to add all the locators, actions, and assertions you will use in the test automation. 
3. Re-run all your tests and make sure all are passing after the updates. 

## Extra task:
Consider all the missing test coverage for the Wizard Bank and automate all the extra tests you can think of. 

## Task Reporting: 
1. Commit all your files. 
2. Push the code to the origin
```bash
git push origin
```
3. Create Pull Request.
4. Submit your task for review on the Platform.
