import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import { TranslationLanguageSelect } from "./TranslationLanguageSelect";
import { Form, useSubmit } from "@remix-run/react";

type UserWithoutPassword = Omit<User, "password">;

interface HeaderProps {
  user: UserWithoutPassword | null;
  language: string;
}

export function Header({ user, language }: HeaderProps) {
  const submit = useSubmit();

  const handleLanguageChange = (newLanguage: string) => {
    const formData = new FormData();
    formData.append("language", newLanguage);
    submit(formData, { method: "post" });
  };
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold text-gray-900">EveEve</h1>
        </Link>
        <div className="flex items-center space-x-4">
        <Form method="post">
            <TranslationLanguageSelect
              value={language}
              onChange={handleLanguageChange}
            />
          </Form>
          <nav>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">ようこそ、{user.name}さん！</span>
                <Link
                  to="/auth/logout"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ログアウト
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ログイン
                </Link>
                <Link
                  to="/auth/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  サインアップ
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}