"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Flame, Zap, UserPlus, LogIn } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all hover:scale-105 border-4 border-yellow-500">
        {isLogin ? SignIn(isLoading) : SignUp(isLoading)}
        <Button
          onClick={toggleForm}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 uppercase"
        >
          {isLogin ? (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              新規登録へ
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              ログインへ
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function SignIn(isLoading: boolean) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理をここに追加
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600 flex items-center justify-center">
        <Sun
          className="inline-block text-yellow-500 mr-2 animate-spin-slow"
          size={36}
        />
        ログイン！
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-lg font-bold text-red-500 uppercase"
          >
            メールアドレス
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=""
            className="rounded-md border-2 border-red-400 focus:border-yellow-500 focus:ring-yellow-500 placeholder-red-300"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-lg font-bold text-red-500 uppercase"
          >
            パスワード
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=""
            className="rounded-md border-2 border-red-400 focus:border-yellow-500 focus:ring-yellow-500 placeholder-red-300"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 uppercase"
          disabled={isLoading}
        >
          {isLoading ? (
            <Flame className="mr-2 h-5 w-5 animate-pulse" />
          ) : (
            <Zap className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "ログイン中..." : "ログイン！"}
        </Button>
      </form>
    </>
  );
}

function SignUp(isLoading: boolean) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 新規登録処理をここに追加
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600 flex items-center justify-center">
        <Sun
          className="inline-block text-yellow-500 mr-2 animate-spin-slow"
          size={36}
        />
        新規登録！
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-lg font-bold text-red-500 uppercase"
          >
            ユーザー名
          </Label>
          <Input
            id="username"
            placeholder=""
            className="rounded-md border-2 border-red-400 focus:border-yellow-500 focus:ring-yellow-500 placeholder-red-300"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-lg font-bold text-red-500 uppercase"
          >
            メールアドレス
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=""
            className="rounded-md border-2 border-red-400 focus:border-yellow-500 focus:ring-yellow-500 placeholder-red-300"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-lg font-bold text-red-500 uppercase"
          >
            パスワード
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=""
            className="rounded-md border-2 border-red-400 focus:border-yellow-500 focus:ring-yellow-500 placeholder-red-300"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 uppercase"
          disabled={isLoading}
        >
          {isLoading ? (
            <Flame className="mr-2 h-5 w-5 animate-pulse" />
          ) : (
            <Zap className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "登録中..." : "新規登録！"}
        </Button>
      </form>
    </>
  );
}
