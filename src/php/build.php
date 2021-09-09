<?php

/**
 * Build PHP script
 *
 * @return void
 */
function buildStaticAPIFile()
{
    $files_list = getBuildFileLists();

    $text = '<?php';

    foreach ($files_list as $file) {
        $_text = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . $file);

        $_text = str_replace('<?php', '', $_text);
        $text .= $_text;
    }

    $dist = __DIR__
        . DIRECTORY_SEPARATOR
        . '..'
        . DIRECTORY_SEPARATOR
        . '..'
        . DIRECTORY_SEPARATOR
        . 'static'
        . DIRECTORY_SEPARATOR
        . 'api'
        . DIRECTORY_SEPARATOR
        . 'index.php';


    // $text .= "\nCore::setChatID('-498959694');";
    $text .= "\nService::serve();";

    file_put_contents($dist, $text);

    echo "\nTask:";
    echo "\n\tBuild static PHP API file";
    echo "\n\tStatus: OK";
    echo "\n\n";
}

/**
 * Get Build Files List
 *
 * @return array
 */
function getBuildFileLists()
{
    return array_slice(scandir(__DIR__), 3);
}

buildStaticAPIFile();
