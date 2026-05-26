import {
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done';
}

interface UploadModalProps {
  onClose?: () => void;
}

interface FileIconProps {
  type: string;
}

interface ProgressBarProps {
  progress: number;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileIcon = ({ type }: FileIconProps) => {
  const ext = type?.split('/')[1]?.toUpperCase() || 'FILE';

  const getColorClasses = () => {
    if (type?.includes('image'))
      return {
        bg: 'bg-[#6366f1]/10',
        border: 'border-[#6366f1]/25',
        text: 'text-[#6366f1]',
      };
    if (type?.includes('pdf'))
      return {
        bg: 'bg-[#ef4444]/10',
        border: 'border-[#ef4444]/25',
        text: 'text-[#ef4444]',
      };
    if (type?.includes('video'))
      return {
        bg: 'bg-[#f59e0b]/10',
        border: 'border-[#f59e0b]/25',
        text: 'text-[#f59e0b]',
      };
    return {
      bg: 'bg-[#10b981]/10',
      border: 'border-[#10b981]/25',
      text: 'text-[#10b981]',
    };
  };

  const colorClasses = getColorClasses();

  return (
    <div
      className={`w-10 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${colorClasses.bg} ${colorClasses.border} border-[1.5px]`}
    >
      <span className={`text-[9px] font-bold tracking-wider ${colorClasses.text}`}>
        {ext.slice(0, 4)}
      </span>
    </div>
  );
};

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="h-1 rounded-full bg-slate-200 overflow-hidden mt-1.5">
    <div
      className="h-full rounded-full transition-all duration-300 ease-in-out bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default function UploadModal({ onClose }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'done'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const addFiles = useCallback((newFiles: FileList) => {
    const mapped: UploadFile[] = Array.from(newFiles).map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      status: 'pending',
    }));
    setFiles((prev) => [...prev, ...mapped]);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const simulateUpload = () => {
    if (!files.length) return;
    setUploadState('uploading');

    files.forEach((f, i) => {
      let prog = 0;
      const interval = setInterval(
        () => {
          prog += Math.random() * 18 + 5;
          if (prog >= 100) {
            prog = 100;
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((x) => (x.id === f.id ? { ...x, progress: 100, status: 'done' } : x))
            );
          } else {
            setFiles((prev) =>
              prev.map((x) =>
                x.id === f.id ? { ...x, progress: Math.round(prog), status: 'uploading' } : x
              )
            );
          }
        },
        120 + i * 60
      );
    });

    timerRef.current = setTimeout(() => setUploadState('done'), 2800);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const totalSize = files.reduce((a, f) => a + f.size, 0);
  const doneCount = files.filter((f) => f.status === 'done').length;

  const getDropZoneClasses = () => {
    const baseClasses =
      'drop-zone cursor-pointer transition-all duration-200 rounded-[14px] p-8 text-center border-2 border-dashed';
    if (isDragging) {
      return `${baseClasses} border-[#6366f1] bg-[#f5f3ff]`;
    }
    return `${baseClasses} border-[#cbd5e1] bg-[#fafafa]`;
  };

  const getUploadButtonClasses = () => {
    const baseClasses =
      'upload-btn px-5 py-2 rounded-lg border-none cursor-pointer text-[13px] font-semibold text-white transition-all duration-150';
    if (!files.length || uploadState === 'uploading') {
      return `${baseClasses} bg-[#c7d2fe] cursor-not-allowed`;
    }
    return `${baseClasses} bg-[#6366f1] hover:bg-[#4f46e5] active:scale-98`;
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-[rgba(15,15,30,0.55)] backdrop-blur-sm flex items-center justify-center p-4 font-['DM_Sans','Inter',sans-serif]"
      onClick={handleModalClick}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="bg-white rounded-2xl w-full max-w-[520px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden animate-[modalIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)]">
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.94) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes checkIn {
            from { transform: scale(0); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .scale-98 {
            transform: scale(0.98);
          }
          .remove-btn:hover {
            background: #fee2e2 !important;
            color: #ef4444 !important;
          }
          .drop-zone:hover {
            border-color: #6366f1 !important;
            background: #f5f3ff !important;
          }
        `}</style>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[17px] font-semibold text-slate-900">Upload files</h2>
            <p className="mt-0.5 mb-0 text-[13px] text-slate-400">
              PDF, epub, mobi — up to 50 MB each
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-transparent cursor-pointer flex items-center justify-center text-slate-500 text-base transition-colors duration-150 remove-btn"
          >
            ✕
          </button>
        </div>

        {/* Drop Zone */}
        {uploadState === 'idle' && (
          <div className="px-6 pt-5">
            <div
              className={getDropZoneClasses()}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={handleBrowseClick}
            >
              <div className="w-12 h-12 rounded-xl bg-violet-100 mx-auto mb-3 flex items-center justify-center text-[22px]">
                📂
              </div>
              <p className="m-0 mb-1 text-[14px] font-medium text-slate-700">
                Drop files here or <span className="text-indigo-500 font-semibold">browse</span>
              </p>
              <p className="m-0 text-[12px] text-slate-400">Drag & drop multiple files at once</p>
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleInputChange}
                accept=".pdf,.epub,.mobi"
              />
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="px-6 pt-4 max-h-60 overflow-y-auto flex flex-col gap-2">
            {files.map((f) => (
              <div
                key={f.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors duration-300 ${
                  f.status === 'done'
                    ? 'bg-emerald-50 border-emerald-100'
                    : 'bg-white border-slate-100'
                }`}
              >
                <FileIcon type={f.type} />
                <div className="flex-1 min-w-0">
                  <p className="m-0 text-[13px] font-medium text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis">
                    {f.name}
                  </p>
                  <p className="m-0 text-[11px] text-slate-400">
                    {formatSize(f.size)}
                    {f.status === 'uploading' && ` · ${f.progress}%`}
                    {f.status === 'done' && ' · Done'}
                  </p>
                  {f.status === 'uploading' && <ProgressBar progress={f.progress} />}
                </div>
                {f.status === 'done' ? (
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[13px] flex-shrink-0 animate-[checkIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
                    ✓
                  </span>
                ) : uploadState === 'idle' ? (
                  <button
                    className="remove-btn w-6 h-6 rounded border border-slate-200 bg-transparent cursor-pointer text-[12px] text-slate-400 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                    onClick={() => removeFile(f.id)}
                  >
                    ✕
                  </button>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-indigo-500 flex-shrink-0 animate-spin" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Success banner */}
        {uploadState === 'done' && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
            <span className="text-lg">🎉</span>
            <div>
              <p className="m-0 text-[13px] font-semibold text-emerald-700">
                {doneCount} file{doneCount !== 1 ? 's' : ''} uploaded successfully
              </p>
              <p className="m-0 text-[12px] text-emerald-500">{formatSize(totalSize)} total</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 mt-2 flex items-center justify-between gap-3">
          <span className="text-[12px] text-slate-400">
            {files.length > 0
              ? `${files.length} file${files.length !== 1 ? 's' : ''} · ${formatSize(totalSize)}`
              : 'No files selected'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white cursor-pointer text-[13px] font-medium text-slate-500 transition-colors duration-150 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              className={getUploadButtonClasses()}
              onClick={uploadState === 'done' ? onClose : simulateUpload}
              disabled={!files.length || uploadState === 'uploading'}
            >
              {uploadState === 'done'
                ? 'Done'
                : uploadState === 'uploading'
                  ? 'Uploading…'
                  : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
