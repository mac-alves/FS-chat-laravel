<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PrivateChat extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'private_chats';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id_one', 'user_id_two', 'hash_chat'
    ];

    /**
     * Get the user who has the contact
     */
    public function userOne()
    {
        return $this->hasOne(User::class, 'id', 'user_id_one');
    }

    /**
     * Get the user who has the contact
     */
    public function userTwo()
    {
        return $this->hasOne(User::class, 'id', 'user_id_two');
    }

    /**
     * Get contact messages
     */
    public function menssages()
    {
        return $this->hasMany(Message::class, 'in_hash_chat', 'hash_chat');
    }
}
