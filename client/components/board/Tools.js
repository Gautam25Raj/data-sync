import { TrashIcon } from "@heroicons/react/24/outline";

const Tools = ({ clear, setColor }) => {
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 w-auto p-2.5 bg-white rounded-md flex items-center justify-center shadow-2xl border border-gray-300 toolbox">
      <TrashIcon
        onClick={clear}
        className="text-black select-none mr-2.5 hover:scale-125 cursor-pointer w-5 h-5"
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <input type="color" onChange={handleColorChange} className="ml-2.5" />
    </div>
  );
};

export default Tools;
