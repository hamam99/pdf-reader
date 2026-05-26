import { BsPlus } from 'react-icons/bs';

type Props = {
  onClick?: () => void;
};
const BookAdd = ({ onClick = () => {} }: Props) => {
  return (
    <div className="relative w-[200px] h-[400px]  block hover:cursor-pointer" onClick={onClick}>
      <div className="absolute w-fit right-3 top-2 bg-blue-400 rounded-sm z-10"></div>
      <div className="w-[200px] border-[4px] border-black">
        <div className="relative w-full h-[300px]">
          <div className="absolute right-0 top-0 h-full w-[4px] bg-black" />
          <div className="absolute bottom-0 h-[4px] w-full bg-black justify-end right-0" />
          <BsPlus
            size={160}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default BookAdd;
