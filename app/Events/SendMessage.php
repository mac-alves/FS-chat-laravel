<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use \App\PrivateChat;
use \App\Message;

class SendMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $message;
    private $privateChat;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message, PrivateChat $privateChat)
    {
        $this->message = $message;
        $this->privateChat = $privateChat;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('message.received.'.$this->privateChat->hash_chat);
    }

    public function broadcastWith()
    {
        return $this->message->toArray();
    }
}
