import Divider from "../../components/divider";
import ProgressBar from "../../components/progress-bar";
import type { Books } from "../../constant/Books";

const mockBooks: Books[] = [
  {
    id: "1",
    user_id: "user123",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    file_key: "mockingbird.pdf",
    file_format: "pdf",
    file_size_bytes: 456789,
    file_hash_sha256: "sha256_hash_1",
    cover_image_key:
      "https://thamesandhudson.com.au/cdn/shop/files/9781419756795.jpg",
    total_pages: 320,
    total_words: 40000,
    status: "completed",
    processing_state: "ready",
    uploaded_at: new Date("2023-10-01T14:30:00Z"),
    updated_at: new Date("2023-10-05T10:45:00Z"),
  },
  {
    id: "2",
    user_id: "user456",
    title: "1984",
    author: "George Orwell",
    file_key: "1984.epub",
    file_format: "epub",
    file_size_bytes: 123456,
    file_hash_sha256: "sha256_hash_2",
    cover_image_key: null,
    total_pages: 300,
    total_words: 25000,
    status: "in_progress",
    processing_state: "processing",
    uploaded_at: new Date("2023-11-01T09:15:00Z"),
    updated_at: new Date(),
    progress: 10,
  },
  {
    id: "3",
    user_id: "user789",
    title: "The Great Gatsby",
    author: null,
    file_key: "gatsby.mobi",
    file_format: "mobi",
    file_size_bytes: 789012,
    file_hash_sha256: "sha256_hash_3",
    cover_image_key:
      "https://thamesandhudson.com.au/cdn/shop/files/9781419756795.jpg",
    total_pages: 210,
    total_words: 28000,
    status: "not_started",
    processing_state: "pending",
    uploaded_at: new Date("2023-12-01T12:00:00Z"),
    updated_at: new Date(),
    progress: 30,
  },
  {
    id: "4",
    user_id: "user234",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    file_key: "pride_and_prejudice.txt",
    file_format: "txt",
    file_size_bytes: 567890,
    file_hash_sha256: "sha256_hash_4",
    cover_image_key:
      "https://thamesandhudson.com.au/cdn/shop/files/9781419756795.jpg",
    total_pages: 432,
    total_words: 52000,
    status: "completed",
    processing_state: "failed",
    uploaded_at: new Date("2023-09-01T18:30:00Z"),
    updated_at: new Date(),
    progress: 100,
  },
];

const Dashboard = () => {
  return (
    <div className="w-full h-full py-3 flex flex-col gap-2">
      <div className="">
        <p className="font-bold text-left text-5xl py-2 text-slate-950">
          Novels
        </p>
        <Divider />
      </div>
      <input
        placeholder="Search"
        type="text"
        className="w-full h-10 px-1 border-b-slate-400 border-slate-400 border rounded-md"
      />
      <div className="flex flex-wrap gap-4">
        {mockBooks.map((book) => (
          <div key={book.id} className="relative w-[200px] h-[400px]  block">
            <div className="absolute w-fit right-3 top-2 bg-blue-400 rounded-sm z-10">
              <p className="px-2 text-white text-[12px]">{book.file_format}</p>
            </div>
            <div className="w-[200px] border-[4px] border-black">
              <div className="relative w-full h-[300px]">
                <div className="absolute right-0 top-0 h-full w-[4px] bg-black" />
                <img
                  src={book.cover_image_key ?? ""}
                  alt={book.title}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 h-[4px] w-full bg-black justify-end right-0" />
              </div>
            </div>
            <div className="px-1">
              <p className="text-left font-bold text-black line-clamp-1">
                {book.title}
              </p>
              <p className="text-left text-amber-800 line-clamp-1">
                {book.author}
              </p>
              <div className="absolute bottom-0 w-full">
                <ProgressBar value={book.progress} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
