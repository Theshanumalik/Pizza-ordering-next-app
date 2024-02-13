import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import React from "react";
import toast from "react-hot-toast";

export default function EditExtras({ title, extras, setExtras }) {
  console.log("extras: ", extras);
  const [inputs, setInputs] = React.useState({
    name: "",
    extraPrice: 0,
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
      setInputs({ name: "", extraPrice: 0 });
    }
  };
  const deleteSize = (name) => {
    const newSizes = extras.filter((size) => size?.name !== name);
    setExtras(newSizes);
  };
  return (
    <div className="mb-3 bg-gray-300 p-4 rounded-md w-full">
      <h3 className="mb-3 text-lg cursor-pointer">{title}</h3>
      {extras.map((size) => (
        <div className="flex gap-2 mb-2 w-full" key={size.name}>
          <input
            className="p-2 rounded-md sm:flex-1"
            type="text"
            placeholder="name"
            value={size?.name}
            disabled
          />
          <input
            className="p-2 rounded-md sm:flex-1"
            type="text"
            placeholder="Amount"
            disabled
            value={size?.extraPrice}
            name="extraPrice"
          />
          <button
            type="button"
            className="p-2 rounded-md bg-gray-300"
            onClick={() => deleteSize(size.name)}
          >
            <DeleteOutline />
          </button>
        </div>
      ))}
      <div className="sm:flex gap-2">
        <input
          className="p-2 rounded-md sm:flex-1"
          type="text"
          placeholder="Size"
          value={inputs.name}
          name="name"
          onChange={handleSizeInputChange}
        />
        <input
          className="p-2 rounded-md sm:flex-1"
          type="text"
          onChange={handleSizeInputChange}
          placeholder="Amount"
          name="extraPrice"
          value={inputs.extraPrice}
        />
        <button
          type="button"
          className="p-2 rounded-md bg-gray-300"
          onClick={addNewSize}
        >
          <AddOutlined />
        </button>
      </div>
    </div>
  );
}
