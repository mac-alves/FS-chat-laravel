<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrivateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('private_chats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id_one')->nullable();
            $table->unsignedBigInteger('user_id_two')->nullable();
            $table->string('hash_chat')->unique();
            $table->timestamps();

            $table->foreign('user_id_one')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('user_id_two')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('private_chats');
    }
}
