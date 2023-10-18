import SingleCard from "./SingleCard";

export default function Cards({ items }) {
  return (
    <div className="flex max-sm:justify-center w-full gap-4 flex-wrap justify-between max-sm:gap-2">
      {items.map((item) => (
        <SingleCard data={item} key={item._id} />
      ))}
    </div>
  );
}
