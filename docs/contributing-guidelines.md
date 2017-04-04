# Code Review

Here at UCLA Radio, we strive to rapidly produce products without eschewing good coding practices or readability. Code review is one of the best ways to ensure this. Since we use GitHub to host all of our projects, our code review comes in the form of the [pull request](https://help.github.com/articles/about-pull-requests/).

## The Pull Request Workflow

All these commands confusing and/or annoying? You may want to consider a gui git client. There's a good list of them [here](https://git-scm.com/downloads/guis).

### Step 1

Ensure your `master` branch is up-to-date with the latest remote master branch:

```
$ git pull
```

### Step 2

Create a new branch of master for your feature:

```
$ git checkout -b feature-branch-name
```

### Step 3

Add and commit your new changes

```
$ git add my/changed/files
$ git commit
```

#### Commit Guidelines

Writing good commit messages is important for collaborative development and maintainability. It will also help you out in the future when you revisit your code. Please refer to [The seven rules of a great Git commit message](https://chris.beams.io/posts/git-commit/#seven-rules) on the guidelines we strive to follow.

### Step 4

Use `git rebase` to sync your work with master

```
# First, update master with remote
$ git checkout master
$ git pull

# Next, rebase your feature branch with master
$ git checkout feature-branch-name
$ git rebase master
```

### Step 5

Push your branch

```
$ git push feature-branch-name
```

### Step 6

Create a pull request. Your pull request should contain **at least** following content and adhere to the best practices detailed below:

1. A title summarizing the feature/change you are adding
2. A description of your feature. Include any important details about your implementation that the reviewers should know about.
3. If possible, a picture of the new feature you added.
4. Add reviewers! Good people to add are the web manager(s) and perhaps another team member if they're knowledgable about what you're adding/deleting/changing.

The following [pull request](https://github.com/uclaradio/uclaradio/pull/69) is a good example of how your pull request should look like.

Pull request's will automatically update with any new changes you push to your branch.

#### Pull Request Best Practices

- Submit one pull request per feature; if you implement multiple features create multiple pull requests. (200-400 lines of code is a good max for a PR)
- Review your code yourself (check out our reviewing suggestions) before submitting a PR.
- Add documentation if necessary!

### Step 7

Respond to all comments you get and then merge! You must address all comments made before getting the okay to merge. You are also the only person who can merge your pull request, this maintains accountability.

After you merge, delete the branch from both GitHub and your local machine.

```
# Delete remote
git push origin --delete feature-branch-name
# Delete local
git branch -d feature-branch-name
```

## Reviewing a Pull Request

There will be a point where you will not only have to create a pull request, but review one. When reviewing a pull request, remember that the main purpose of a pull request is to help your teammates learn and improve. Realize that no one, neither reviewer nor reviewee, is perfect and ask questions rather than assume something is immediately wrong. We're all on the same team (literally), so focus on being polite and constructive to your teammates. If you run into any disagreements, defer to your project manager. If you and your project manager disagree, defer to the online editor.

If you are tagged, you **must** look at the code and respond within two days. The reviewee cannot ship your code without your feedback. You are free to peruse and comment on other pull requests if you so wish.

When reviewing code, you should read through all the code changed, added, and deleted, looking for anything that looks out of place or different from how you would do it. You should also pull the branch and run it locally on your machine to make sure everything works for you.

Not sure what to look out for when reviewing code? Originate has a great list of things to look for in their [code review guide](https://www.originate.com/library/code-review-guide):
> * Is every piece of code in the right place, i.e. model code in a model, controller logic in a controller, app-specific helper code in a helper, generic helper code in a library?
* Do all classes have only one responsibility?
* Do all methods do only one thing?
* If a method has a side-effect, is that clear from the name, and otherwise documented?
* Are all classes/methods/variables named properly so that the code is self-describing?
* Is everything as private as possible, i.e. only the intended public interface is public?
* Are too many things private? This could be an indication that you should extract a class.
* Are all files within a reasonable size (e.g., less than 100 lines of code)?
* Are all methods less than 10 lines of code?
* No law of demeter violations (providing whole objects to methods when all that’s needed is the value of one attribute of them)?
* Is everything tested? Is each thing tested enough? Is it not over-tested?
* Are there tests for private methods? This shouldn't happen, it is a code smell.
* Every class should have a small comment describing what it represents/does. Public methods should have comments describing what they are for, or when to call them, if this isn’t obvious from the code. Comments shouldn’t describe what the method does (this is visible from looking at the code).
* Are there any obvious performance-problems, like making a database query for each loop iteration, rather than using a more optimized query that loads all data at once?
* Spacing errors like no empty line between methods, or too many empty lines
* There shouldn’t be any commented-out code.
* There should be no debug statements like `console.log` or the likes.
* There should be no TODO's, as this is often a crutch for being lazy.
