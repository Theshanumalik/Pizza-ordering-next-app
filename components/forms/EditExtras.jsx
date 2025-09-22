import {
  AddOutlined,
  DeleteOutline,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import React from "react";
import toast from "react-hot-toast";

export default function EditExtras({ title, extras, setExtras }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    name: "",
    extraPrice: "",
  });
  const handleSizeInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const addNewSize = () => {
    const exists = extras.findIndex((size) => size.name === inputs.name);
    if (exists >= 0) return toast.error("Size exists!");
    if (inputs.name && inputs.extraPrice) {
      setExtras([...extras, inputs]);
      setInputs({ name: "", extraPrice: "" });
    }
  };
  const deleteSize = (name) => {
    const newSizes = extras.filter((size) => size?.name !== name);
    setExtras(newSizes);
  };
  return (
    <div className="mb-3 bg-gray-300 p-4 rounded-md w-full">
      <div className="w-full justify-center flex flex-col">
        <h3
          className="text-lg cursor-pointer flex justify-between items-center py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <button className="bg-gray-400 rounded-full p-1 flex items-center justify-center">
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </button>
        </h3>
        {isOpen && (
          <React.Fragment>
            {extras.map((size) => (
              <div className="grid grid-cols-3 gap-2 my-1" key={size.name}>
                <div className="p-2 flex-1 rounded-md bg-gray-200" disabled>
                  {size?.name}
                </div>
                <div className="p-2 flex-1 rounded-md bg-gray-200" disabled>
                  {size?.extraPrice}
                </div>
                <button
                  type="button"
                  className="rounded-md bg-gray-400 p-2"
                  onClick={() => deleteSize(size.name)}
                >
                  <DeleteOutline />
                </button>
              </div>
            ))}
            <div className="my-1 grid grid-cols-3 gap-2 flex-wrap">
              <input
                className="p-2 rounded-md"
                type="text"
                placeholder="Size"
                value={inputs.name}
                name="name"
                onChange={handleSizeInputChange}
              />
              <input
                className="p-2 rounded-md"
                type="text"
                onChange={handleSizeInputChange}
                placeholder="Amount"
                name="extraPrice"
                value={inputs.extraPrice}
              />
              <button
                type="button"
                className="rounded-md bg-gray-400 p-2"
                onClick={addNewSize}
              >
                <AddOutlined />
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
