import { ArrowLeftIcon, CheckIcon, CopyIcon, HouseIcon, WarningIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { toast } from 'sonner';

const ErrorDisplay = ({ errorStack, render }: { errorStack: any; render: any }) => {
  const lines = errorStack?.split('\n');
  return (
    <div className="relative mx-auto mt-2 h-[calc(100vh-200px)] max-w-4/5 overflow-y-auto rounded-3xl bg-gray-500 p-4 text-left text-4xl/10 tracking-wider text-pretty">
      {render?.()}
      {lines.map((line: string, index: number) => (
        <div
          key={line}
          className={`px-4 py-1 ${
            index % 2 === 0 ? 'bg-slate-100' : 'bg-white' // Dòng chẵn lẻ khác màu
          } ${
            line.includes('node_modules') ? '' : 'font-bold text-red-600' // Làm mờ các dòng thư viện
          }`}>
          <span className="mr-3 text-slate-400 select-none">{index + 1}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

export default function ErrorPage() {
  const error: any = useRouteError();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(error?.stack);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Không thể copy:');
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="flex items-center justify-center gap-3">
        <WarningIcon size={56} weight="fill" className="rounded-full bg-red-100 p-3 text-red-600" />
        <h1 className="text-2xl font-bold text-slate-900">Ối! Đã có lỗi xảy ra</h1>
      </div>
      <div className="relative flex">
        <ErrorDisplay
          render={() => (
            <button
              onClick={handleCopy}
              className="sticky top-0 right-0 flex items-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700">
              {copied ? (
                <>
                  <CheckIcon size={16} className="text-green-400" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Sao chép lỗi</span>
                </>
              )}
            </button>
          )}
          errorStack={error?.stack}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 transition-all hover:bg-white">
          <ArrowLeftIcon size={18} /> Quay lại
        </button>
        <button
          onClick={() => (globalThis.location.href = '/')}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          <HouseIcon size={18} /> Trang chủ
        </button>
      </div>
    </div>
  );
}
