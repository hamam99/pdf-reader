export type Books = {
  id: string;
  user_id: string;
  title: string;
  author: string | null;
  file_key: string;
  file_format: 'pdf' | 'epub' | 'mobi' | 'txt';
  file_size_bytes: number;
  file_hash_sha256: string;
  cover_image_key: string | null;
  total_pages: number | null;
  total_words: number | null;
  status: 'not_started' | 'in_progress' | 'completed';
  processing_state: 'pending' | 'processing' | 'ready' | 'failed';
  uploaded_at: Date;
  updated_at: Date;
  progress?: number;
};
