# HackHub
This project was created during HackIllinois 2017, by a group of three including myself, [Thomas Huang](https://github.com/thomasehuang), and [Anton Yang](https://github.com/theunderpaidone).

HackHub is a open source project that specifically targets hackathons. HackHub aims to ease the burdens of mentors and company representatives at hackathons, by providing a platform online to facilitate communication between hackers and mentors (we will include company representatives in this category) simply and elegantly. Besides forum style Q&A, HackHub also provides functionality such as making announcements and arranging meetings. We included a prototype demonstrating the basic functionalities of our product. We built this platform using web technologies, namely HTML, CSS, and JavaScript. We are using Firebase as a backend, because of its simplicity and real-time updates. You can find the prototype [here](http://www.imthomashuang.com).

We understand that hackathons have different requirements and style choices, so we have made the code base very easy to extend. We highly encourage hackathons to not only fork this repo and tweak our code for their own needs, but also to help extend the project for future hackathons. We will now go into details on HackHub.

## Functionality
Our prototype provides simple user authentication using Firebase. Users sign up and log in with their emails and their passwords.

After the users are logged in, they are brought to the home screen. The home screen shows all of the messages that are on the hackathon's feed, which includes any questions, announcements, or meeting arrangements. Next to the home screen are the announcements page, the meetings page, the user page, and a logout button. The pages filter out messages that do not belong in the category, and only display messages that do. For example, the user page only shows messages that correlate to the user in some way.

Moving on to the messages. Every message is added by some user, either a hacker or a mentor. Users have the choice to include which title and content they want, the type of message, and any tags that they want. Types of messages correspond to which tab they will belong to on the website. Tags basically let users target who they want to see the messages. If a user tags HackHub, then HackHub representatives would see the user on their user page and be more likely to help the user. Users also have the ability to delete messages, which removes the messages permanently.

Clicking on the messages will bring up a more detailed page for the specific message. This will also bring up a comment section, which is where mentors would help hackers. This allows mentors to help hackers over long distances.

## Tweaking HackHub
Tweaking HackHub is simple. Since our CSS is compiled with SASS using Compass, almost all of the values used are stored in variables in the \_globals.scss file. Tweaking HackHub is as simple as changing the variables in the file. For example, to change the navigation bar color, change the $nav_bar variable to something like:

```
$nav_bar: #ff9900;
```

To compile SASS, install [Compass](http://compass-style.org/install/) first, and then in the root directory of this project run:
```
compass watch
```
Now your changes will cause Compass to compile your SASS directory on save.

## Contributors
Due to the short nature of hackathons and too much junk food, our quality of the code may be lacking in certain areas. We will try our best to maintain HackHub, so contributions are very welcome. We welcome contributions in any form, but value bug fixes the most.

## Known Issues
* Our remove post button causes the page to change, even though it should only remove an element. We know that this is because the remove post button is nested within the messages, however we did not have a time to come up with a good solution.

## License
HackHub is released under the [MIT License](LICENSE).
