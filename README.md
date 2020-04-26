# Chat Real Time utilizando Laravel, Laravel-echo e Socket.io

### dependencias
 - php: "^7.2"
 - laravel/framework: "^6.2"
 - pusher/pusher-php-server: "~4.0"

### instalação do projeto
 - baixar o repositorio
    - `git clone https://github.com/mac-bleck/FS-chat-laravel.git`
 
 - clonar o .env.example e renomear a copia para .env
 
 - abrir o terminal na pasta do projeto e digitar os seguintes comandos
    - `composer install`
    - `npm install && npm run dev`
    - `php artisan key:generate`
    - `touch database/database.sqlite`
    - `php artisan migrate`
    - `laravel-echo-server client:add`
    - `touch /database/laravel-echo-server.sqlite`
 
 - copiar o appId e a key do laravel-echo-server.json para o .env nas seguites chaves:
    - `PUSHER_APP_ID=`
    - `PUSHER_APP_KEY=`
    
