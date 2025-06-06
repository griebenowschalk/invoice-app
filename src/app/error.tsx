"use client";

import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: Readonly<ErrorProps>) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-700">{error.message}</p>
      <button
        onClick={() => router.back()}
        className="cursor-pointer mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
