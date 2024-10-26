import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";

interface SignInModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLoginSuccess?: () => void;
}

export default function SignInModal({
  isOpen,
  setIsOpen,
  onLoginSuccess,
}: SignInModalProps) {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 로그인 요청 처리
  const loginMutation = useMutation<{ token: string }, Error, void>({
    mutationFn: async () => {
      const response = await login(nickname, password);
      console.log("로그인 응답:", response); // 응답 확인을 위한 로그 추가

      return response;
    },
    onSuccess: () => {
      setIsOpen(false); // 로그인 성공 시 모달 닫기
      if (onLoginSuccess) {
        onLoginSuccess(); // 로그인 성공 시 콜백 실행
      }
    },
    onError: (error) => {
      alert(error.message); // 로그인 실패 시 경고
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(); // 로그인 요청
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="flex flex-col items-center justify-center w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogTitle className="mb-4 text-center text-xs">
          '전대미문'을 더 재미있게 즐겨보세요!
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          {/* 닉네임 입력 */}
          <div className="w-full flex flex-col items-center">
            <Label htmlFor="nickname" className="sr-only">
              닉네임
            </Label>
            <Input
              required
              id="nickname"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mb-2 block w-[80%] max-w-xs p-2 border border-gray-300 text-xs rounded-full"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="w-full flex flex-col items-center mb-4">
            <Label htmlFor="password" className="sr-only">
              비밀번호
            </Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-[80%] max-w-xs p-2 border border-gray-300 text-xs rounded-full"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="mt-3 w-[50%] max-w-[150px] py-1.5 bg-black text-white rounded-lg text-xs hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
