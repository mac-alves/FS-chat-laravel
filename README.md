<h1 align="center">
  <img alt="Design+Code" src="https://res.cloudinary.com/dpf7e7tpc/image/upload/v1589242215/projetos/FS-chat-laravel_bo0y4c.gif" />
</h1>

<h1 align="center">
  WebChat
</h1>
<h3 align="center">WebChat - chat in real time using Laravel and ReactJS</h3>
<br/>
<p align="center">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/mac-bleck/FS-chat-laravel">

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mac-bleck/FS-chat-laravel">

  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/mac-bleck/FS-chat-laravel">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mac-bleck/FS-chat-laravel">

  <!-- <img alt="GitHub" src="https://img.shields.io/github/license/lukemorales/react-native-design-code.svg"> -->
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :rocket: Technologies

This project was developed with the following technologies:


-  [Laravel](https://laravel.com/)
-  [Laravel-Echo-Server](https://github.com/tlaverdure/laravel-echo-server)
-  [Socket.io](https://socket.io/)
-  [Pusher](https://pusher.com/channels?campaignid=916184871&utm_source=adwords&utm_medium=cpc&utm_campaign=Brand_Pusher_Exact&utm_term=pusher%20laravel&utm_creative=264949032465&gclid=CjwKCAjw7-P1BRA2EiwAXoPWAx7YcxX2buM5n3JfZKhk-2JQWhWgwCfWWug7ty46ld3PWl-FD38GVRoC5WIQAvD_BwE)
-  [ReactJs](https://reactjs.org/)
-  [styled-components](https://www.styled-components.com/)
-  [VS Code][vc] with [EditorConfig][vceditconfig]

## :bangbang: Dependencies
- [Git](https://git-scm.com),
- [Node.js v12.16.1][nodejs] + [NPM v6.13.4][npm]
- [PHP v7.2][php]
- [Laravel v6.2][laravel]
- [Laravel-Echo-Server v1.6.1][Laravel-Echo-Server]
- [Composer v1.6.3][composer]

## :information_source: How To Use

```bash
# Clone this repository
$ git clone https://github.com/mac-bleck/FS-chat-laravel.git

# Go into the repository
$ cd FS-chat-laravel/

# Install dependencies
$ composer install
$ npm install && npm run dev

# generate the authentication key
$ php artisan key:generate

# create the development database
$ touch database/database.sqlite

# migrate the database
$ php artisan migrate

# migrate the database
$ create laravel echo credentials

# create the laravel echo database
$ touch /database/laravel-echo-server.sqlite

# copy the appId and key from laravel-echo-server.json to .env in the following keys:
    - PUSHER_APP_ID=
    - PUSHER_APP_KEY=

# in a terminal tab run
$ php artisan server

# in another tab of the terminal execute
$ laravel-echo-server start
```
---

## Autor

:anchor: **Mauricio Alves** - *Github* - [mac-bleck](https://github.com/mac-bleck)


[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[php]: https://www.php.net/
[laravel]: https://laravel.com/
[Laravel-Echo-Server]: https://github.com/tlaverdure/laravel-echo-server
[composer]: https://getcomposer.org/
