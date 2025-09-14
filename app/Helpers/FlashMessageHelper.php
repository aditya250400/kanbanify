<?php

if (!function_exists('flassMessage')) {
    function flashMessage($message, $type = 'success')
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}
