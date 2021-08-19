<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Client\RequestException;
use App\Models\Info;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Mockery\Exception;

class IndexController extends Controller
{
    public $domains = 'http://faceprog.ru/';

    public $pathLogin = 'js-ra-tokens-api/auth/login.php';
    public $pathRefresh = 'js-ra-tokens-api/auth/refresh.php';
    public $pathCheck = 'js-ra-tokens-api/auth/check.php';

    public $pathArticles = '/js-ra-tokens-api/articles.php';

    public function Auth(Request $request)
    {

        $client = new Client(['base_uri' => $this->domains]);
        $response = $client->post("{$this->pathLogin}",
            [
                'form_params' => [
                    'login' => $request->login,
                    'password' => $request->password
                ]
            ]);
        $body = $response->getBody()->getContents();

        return response($body, $response->getStatusCode());

    }

    public function Check(Request $request)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$request->header('Authorization')}",
            ])->post("{$this->domains}{$this->pathCheck}");


            if($response->clientError()){
                throw new Exception($response->status());
            }

            return response($response->body(), $response->status());


        } catch (Exception $e) {
            return response(null, $e->getMessage());
        }
    }

    public function Refresh(Request $request)
    {

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$request->header('Authorization')}",
            ])->post("{$this->domains}{$this->pathRefresh}");

            $result = $response->json();

            return response()->json($result, $response->status());


        } catch (Exception $e) {
            return response(null, $e->getMessage());
        }

    }

    public function load(Request $request)
    {

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$request->header('Authorization')}",
            ])->get("{$this->domains}{$this->pathArticles}");


            if($response->clientError()){
                throw new Exception($response->status());
            }

            return response($response->body(), $response->status());


        } catch (Exception $e) {
            return response(null, $e->getMessage());
        }
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        if ($id) {
            $client = new Client(['base_uri' => $this->domains]);
            $response = $client->delete("{$this->pathArticles}?id={$id}",
                ['headers' => [
                    'Authorization' => $request->header('Authorization')
                ]]
            );
            $body = $response->getBody()->getContents();

            return response($body, $response->getStatusCode());
        } else {
            return response()->json(['error' => 'Неверные данные'], 401);
        }

    }
}
