The web page of this project is developed through the Vue framework

In this project, the first step is to distribute the modules and make a general layout

The main structure is the title bar at the top, and the left and right columns of the topic. The title bar can be indexed, and users can access News and Games. The left column of the topic can display more details, the right column is used to modify user information, and administrators can modify more data such as clubs and teams

In the title bar, you can see the currently logged-in user, and the news, games. Tab

The news interface displays all news information, and games display the scores of each team in the completed games and the games that haven't happened

In the right column, according to different login users, ordinary users can modify their own data, while administrators have more permissions to modify the club's data

in the login interface. Its function only needs to obtain the user name in the database to log in and transfer the user ID to the next interface. Through using Axios to interact with the server, after the next page receiving the user ID of the login interface, find the current user in the database and obtain all the information of the user

The server is developed through Express,

It can connect to the database, modify the value, respond to the request of the web page, and link the web page and the database together,

Different addresses are used to distinguish different requests, including get, put, post, and delete requests. The data transmitted from the web page is processed and then sent to the database, so as to view, modify, add and delete the data.


Express Project tree
│  app.js
│  package-lock.json
│  package.json
│  README.md
│
└─src
    ├─config
    │      db.js
    │
    ├─controllers
    │      blog.js
    │
    └─db
            mysql.js


Vue Project tree
│  .gitignore
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│
├─public
│      favicon.ico
│      index.html
│
└─src
    │  App.vue
    │  main.js
    │
    ├─assets
    └─components
            AppBody1.vue
            AppBody2.vue
            AppBody3.vue
            AppBody4.vue
            AppBody5.vue
            AppBody6.vue
            AppBody7.vue
            AppBody8.vue
            AppBodyRight.vue
            AppHead.vue
