<?php

class Form
{

    /**
     * Get select from global $_POST by key $field
     *
     * @param string $field key in $_POST
     *
     * @return void
     */
    public static function select(string $field)
    {
        return (isset($_POST[$field])) ? $_POST[$field] : 0;
    }

    /**
     * Get checkbox from global $_POST by key $field
     *
     * @param string $field key in $_POST
     *
     * @return void
     */
    public static function checkbox(string $field)
    {
        return (isset($_POST[$field])) ? 1 : 0;
    }

    /**
     * Get message from global $_POST by default key 'message'
     *
     * @return string
     */
    public static function message()
    {
        return (isset($_POST['message']) && filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING)) ? trim($_POST['message']) : '';
    }

    /**
     * Get type from global $_POST by default key 'type'
     *
     * @return string
     */
    public static function type()
    {
        return (isset($_POST['type']) && filter_var(trim($_POST['type']), FILTER_SANITIZE_STRING)) ? trim($_POST['type']) : '';
    }

    /**
     * Get lang from global $_POST by default key 'lang'
     *
     * @return string
     */
    public static function lang()
    {
        return (isset($_POST['lang']) && filter_var(trim($_POST['lang']), FILTER_SANITIZE_STRING)) ? trim($_POST['lang']) : '';
    }

    /**
     * Get name from global $_POST by default key 'name'
     *
     * @return string
     */
    public static function name()
    {
        return (isset($_POST['name']) && filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING)) ? trim($_POST['name']) : '';
    }

    /**
     * Get phone from global $_POST by default key 'phone'
     *
     * @return string
     */
    public static function phone()
    {
        return (isset($_POST['phone']) && filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING)) ? trim($_POST['phone']) : '';
    }

    /**
     * Get email address from global $_POST by default key 'email'
     *
     * @return string
     */
    public static function email()
    {
        return (isset($_POST['email']) && filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL)) ? trim($_POST['email']) : '';
    }

    /**
     * Return form
     *
     * @return boolean
     */
    public static function issetPostForm()
    {
        return (isset($_POST['form'])) ? true : false;
    }


    /**
     * Input method for create from request payload $_POST body array
     *
     * @return void
     */
    public static function input()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
}
