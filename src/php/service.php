<?php

class Service
{
    /**
     * Сообщение которое будет отправлено в компитентный канал.
     *
     * @var string
     */
    protected static string $message;

    /**
     * Main function
     *
     * @return json
     */
    public static function serve()
    {
        self::get();
        self::post();
    }

    /**
     * Return JSON
     *
     * @param array $data return data
     *
     * @return void
     */
    public static function json(array $data = ['status' => 200, 'message' => 'OK'])
    {
        Core::response();
        echo json_encode($data);
        exit();
    }

    /**
     * Serve request method GET
     *
     * @return void
     */
    public static function get()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            self::json();
        }
    }

    /**
     * Serve request method POST
     *
     * @return void
     */
    public static function post()
    {
        Form::input();

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && Form::issetPostForm()) {

            $name = Form::name();
            $phone = Form::phone();
            $email = Form::email();
            $message = Form::message();
            $type = Form::type();
            $lang = Form::lang();

            $_message = <<<MESSAGE
Заявка на сайте:
mysecuritymap.com
MESSAGE;
            if ($type !== '') {
                $_message .= "\n\nТип:\n";
                $_message .= self::type($type);
            }
            if ($lang !== '') {
                $_message .= "\n\nЯзык:\n";
                $_message .= $lang;
            }

            if ($name !== '') {
                $_message .= "\n\nИмя:\n";
                $_message .= $name;
            }
            if ($phone !== '') {
                $_message .= "\n\nТелефон:\n";
                $_message .= $phone;
            }
            if ($email !== '') {
                $_message .= "\n\nПочта:\n";
                $_message .= $email;
            }
            if ($message !== '') {
                $_message .= "\n\nСообщение:\n";
                $_message .= $message;
            }

            self::setMessage($_message);
            self::notify();
            self::json(
                [
                    'status' => 200,
                    'message' => 'Form accepted',
                ]
            );
        } else {
            self::json(
                [
                    'status' => 200,
                    'message' => 'Error: No Form Found.',
                    'debug' => [
                        'post' => $_POST,
                    ]
                ]
            );
        }
    }

    /**
     * Notify admin chat
     *
     * @return void
     */
    public static function notify()
    {
        Core::notification(self::$message);
    }

    /**
     * Set notification message
     *
     * @param string $message Set notification message
     *
     * @return void
     */
    public static function setMessage(string $message)
    {
        self::$message = $message;
    }

    /**
     * Return normal string
     *
     * @param string $formId Form ID
     *
     * @return string
     */
    public static function type(string $formId = 'askForm')
    {
        $_forms = [
            'priceListEquipmentForm' => 'Цены на запчасти',
            'priceListServiceForm' => 'Цены на услуги',
            'consultForm' => 'Запрос на консультацию',
            'orderForm' => 'Заявка',
            'testForm' => 'Запрос на тест',
            'askForm' => 'Задан вопрос'
        ];

        return (!empty($_forms[$formId])) ? $_forms[$formId] : 'Обратный звонок';
    }
}
