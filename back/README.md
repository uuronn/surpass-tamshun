dockerを立ち上げる
./vendor/bin/sail up -d

必要に応じて、テーブルを作成する
./vendor/bin/sail artisan migrate

MACのcomposerインストール
brew install composer

依存関係のインストール
composer install

認証で使うBreezeのインストール
composer require laravel/breeze --dev

breezeをカスタムAPIとして使うためのインストール
php artisan breeze:install api

モデルを作成
php artisan make:model Hoge -m

コントローラーの作成
php artisan make:controller AuthController

