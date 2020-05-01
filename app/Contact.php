<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'contacts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'contact_user_id'
    ];

    /**
     * Get the user who has the contact
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get contact information
     */
    public function userContact()
    {
        return $this->hasOne(User::class, 'id', 'contact_user_id');
    }

    /**
     * Get contact messages
     */
    public function menssages()
    {
        return $this->hasMany(Message::class, 'contact_id');
    }
}
