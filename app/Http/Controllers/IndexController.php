<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Info;
use GuzzleHttp\Client;

class IndexController extends Controller
{
    public $domains = 'http://faceprog.ru/';

    public $pathAuch = 'js-6-api/auth.php';

    public $pathArticles = 'js-6-api/articles.php';

    public function Auth(Request $request)
    {

        $client = new Client(['base_uri' => $this->domains]);
        $response = $client->post("{$this->pathAuch}",
            [
                'form_params' => [
                    'login' => $request->login,
                    'password' => $request->password
                ]
            ]);
        $body = $response->getBody()->getContents();

        return response($body, $response->getStatusCode());

    }

    public function load(Request $request)
    {

        $client = new Client(['base_uri' => $this->domains]);
        $response = $client->get("{$this->pathArticles}",
            ['headers' => [
                'Authorization' => $request->header('Authorization')
            ]]
        );
        $body = $response->getBody()->getContents();

        return response($body, $response->getStatusCode());
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        if($id) {
            $client = new Client(['base_uri' => $this->domains]);
            $response = $client->delete("{$this->pathArticles}?id={$id}",
                ['headers' => [
                    'Authorization' => $request->header('Authorization')
                ]]
            );
            $body = $response->getBody()->getContents();

            return response($body, $response->getStatusCode());
        }else{
            return response()->json(['error' => 'Неверные данные'], 401);
        }

    }
}
