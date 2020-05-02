<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body', 'from_user_id', 'to_user_id', 'in_hash_chat'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'in_hash_chat',
    ];

    /**
     * Get the user who has the contact
     */
    public function fromUser()
    {
        return $this->hasOne(User::class, 'id', 'from_user_id');
    }

    /**
     * Get the user who has the contact
     */
    public function toUser()
    {
        return $this->hasOne(User::class, 'id', 'to_user_id');
    }

}
