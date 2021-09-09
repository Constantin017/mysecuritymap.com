<?php

class Core
{

    /**
     * Telegram Bot Token :
     *
     * @var string
     */
    protected static $bot_token = '';

    /**
     * Telegram Group ID
     *
     * @var string
     */
    protected static $chat_id = '';

    /**
     * Telegram Notification Function
     *
     * @param string $message Telegram Message
     *
     * @return void
     */
    public static function notification(string $message)
    {
        $bot_api_uri = 'https://api.telegram.org/bot';
        $bot_api_uri .= self::$bot_token;
        $bot_api_uri .= '/sendMessage?';
        $bot_data = http_build_query(
            [
                'chat_id' => self::$chat_id,
                'text' => $message
            ]
        );
        return file_get_contents($bot_api_uri . $bot_data);
    }

    /**
     * Google reCAPTCHA v3
     *
     * @param string $action default 'submit'
     *
     * @domain  mysecuritymap.com
     * @dev_doc https://developers.google.com/recaptcha/docs/v3
     * @verify  https://developers.google.com/recaptcha/docs/verify
     * @dev_uri https://www.google.com/recaptcha/api/siteverify

     * @return boolean
     */
    public static function googleRecaptchaResponse(string $action = 'submit')
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['google'])) {
            $re_uri = 'https://www.google.com/recaptcha/api/siteverify';
            $re_sec = '';
            $re = file_get_contents($re_uri . '?secret=' . $re_sec . '&response=' . $_POST['google']);
            $re = json_decode($re);
            if (isset($re->score) && $re->score >= 0.5 && isset($re->action) && $re->action == $action) {
                return true;
            }
        }
        return false;
    }

    /**
     * Core Response Headers
     *
     * @return void
     */
    public static function response()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET');
        header('Access-Control-Allow-Credentials: true');
        header('Cache-Control: no-cache');
        header('Pragma: no-cache');
    }
}
