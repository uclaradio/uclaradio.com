# Contributing Guidelines
Oh hai! Looks like you're contributing to UCLA Radio code. Here are some things to know that will help you do that!

Here at UCLA Radio, we strive to rapidly produce products without eschewing good coding practices or readability. Code review is one of the best ways to ensure this. Since we use GitHub to host all of our projects, our code review comes in the form of the [pull request](https://help.github.com/articles/about-pull-requests/).

## Git
GitHub revolves around this amazing piece of software called [git](https://git-scm.com). Git is what's known as a version control system, meaning that it tracks all changes we make to code. If you aren't familiar with git there are a lot of [great](https://try.github.io/levels/1/challenges/1) [resources](https://rogerdudler.github.io/git-guide/) to get you started--check them out, play around with it yourself, and then come back when you're feeling somewhat comfortable.

## Our Workflow
There a a lot of git workflows out there: [GitHub flow](https://guides.github.com/introduction/flow/), [git flow](http://nvie.com/posts/a-successful-git-branching-model/), the [Gitlab flow](https://about.gitlab.com/2014/09/29/gitlab-flow/), etc. Our workflow takes some common elements of these but adapts it for the practicality of our needs. The basic ideas are as follows:
1. `master` is our stable branch, and is what is in production.
2. Any change to `master`--whether that be a new feature, refactor, or bug fix--is done by creating a separate branch off of `master` with the naming scheme `<your first name>/<descriptive-title-for-your-change>`. For example if Nathan were to add a feature making the site font comic sans, he would name it `nathan/comic-sans` or something similar. The goal is for anyone else browsing the branch to immediately know the change the branch is making.
3. When you think a feature is ready for production and after you've tested and linted it, make a pull request.
    - **Note:** Create individual pull requests for every feature you make. It helps the people reviewing your code and makes it easier to revert changes back if any bugs are introduced.
4. After you make any changes requested on that pull request and get the infamous [LGTM](http://www.lgtm.in) from a Web Manager, you can [squash merge](https://git-scm.com/docs/git-merge#git-merge---squash) it into `master`. This should be done via GitHub.
5. After your branch is merged, you can delete it, both locally and remotely.

## The Workflow in Practice
Let's be real, there are a lot of git commands. They're complicated and hard to remember. Luckily, [Git Town](http://www.git-town.com) makes our workflow extremely easy with just 4 commands. 

1. `git hack` creates a new branch off of `master`.
2. `git commit` is the same as it was before. Git Town doesn't change anything.
3. Instead of pushing commits to the remote copy of your new branch, run `git sync`. This pushes your commits, but also checks the remote for any changes to `master` and updates your branch accordingly.
4. `git new-pull-request` makes it very easy to make that pull request when you're ready.
5. Merging should be done via GitHub.
6. You can also delete the remote copy of your branch via GitHub. To delete your local branch, run the command `git branch -d <your branch name>`.


## Commit Guidelines

Writing good commit messages is important for collaborative development and maintainability. It will also help you out in the future when you revisit your code. Please refer to [The seven rules of a great Git commit message](https://chris.beams.io/posts/git-commit/#seven-rules) on the guidelines we strive to follow. That being said, as [Zach Holman puts it](https://zachholman.com/posts/git-commit-history/), our "unit of change" is the pull request; it is much more import that your pull request be well written than your individual commits.

## Reviewing a Pull Request

There will be a point where you will not only have to create a pull request, but review one. When reviewing a pull request, remember that the main purpose of a pull request is to help your teammates learn and improve. Realize that no one, neither reviewer nor reviewee, is perfect and ask questions rather than assume something is immediately wrong. We're all on the same team (literally), so focus on being polite and constructive to your teammates. If you run into any disagreements, defer to your project manager. If you and your project manager disagree, defer to the online editor.

If you are tagged, you **must** look at the code and respond within two days. The reviewee cannot ship your code without your feedback. You are free to peruse and comment on other pull requests if you so wish.

When reviewing code, you should read through all the code changed, added, and deleted, looking for anything that looks out of place or different from how you would do it. You should also pull the branch and run it locally on your machine to make sure everything works for you.

Not sure what to look out for when reviewing code? Originate has a great list of things to look for in their [code review guide](https://www.originate.com/library/code-review-guide):
> * Is every piece of code in the right place, i.e. model code in a model, controller logic in a controller, app-> specific helper code in a helper, generic helper code in a library?
> * Do all classes have only one responsibility?
> * Do all methods do only one thing?
> * If a method has a side-effect, is that clear from the name, and otherwise documented?
> * Are all classes/methods/variables named properly so that the code is self-describing?
> * Is everything as private as possible, i.e. only the intended public interface is public?
> * Are too many things private? This could be an indication that you should extract a class.
> * Are all files within a reasonable size (e.g., less than 100 lines of code)?
> * Are all methods less than 10 lines of code?
> * No law of demeter violations (providing whole objects to methods when all that’s needed is the value of one attribute of them)?
> * Is everything tested? Is each thing tested enough? Is it not over-tested?
> * Are there tests for private methods? This shouldn't happen, it is a code smell.
> * Every class should have a small comment describing what it represents/does. Public methods should have comments describing what they are for, or when to call them, if this isn’t obvious from the code. Comments shouldn’t describe what the method does (this is visible from looking at the code).
> * Are there any obvious performance-problems, like making a database query for each loop iteration, rather than using a more optimized query that loads all data at once?
> * Spacing errors like no empty line between methods, or too many empty lines
> * There shouldn’t be any commented-out code.
> * There should be no debug statements like `console.log` or the likes.
> * There should be no TODO's, as this is often a crutch for being lazy.
