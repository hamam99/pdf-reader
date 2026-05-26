import ProgressBar from '../../../../components/progress-bar';
import type { Books } from '../../../../constant/Books';

type Props = {
  book: Books;
};
const BookItem = ({ book }: Props) => {
  return (
    <div key={book.id} className="relative w-[200px] h-[400px]  block">
      <div className="absolute w-fit right-3 top-2 bg-blue-400 rounded-sm z-10">
        <p className="px-2 text-white text-[12px]">{book.file_format}</p>
      </div>
      <div className="w-[200px] border-[4px] border-black">
        <div className="relative w-full h-[300px]">
          <div className="absolute right-0 top-0 h-full w-[4px] bg-black" />
          <img src={book.cover_image_key ?? ''} alt={book.title} className="w-full h-full" />
          <div className="absolute bottom-0 h-[4px] w-full bg-black justify-end right-0" />
        </div>
      </div>
      <div className="px-1">
        <p className="text-left font-bold text-black line-clamp-1">{book.title}</p>
        <p className="text-left text-amber-800 line-clamp-1">{book.author}</p>
        <div className="absolute bottom-0 w-full">
          <ProgressBar value={book.progress} />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
