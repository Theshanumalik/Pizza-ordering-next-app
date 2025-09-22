import SingleCard from "./SingleCard";

export default function Cards({ items }) {
  return (
    <div className="sm:flex sm:gap-3 sm:justify-between sm:flex-wrap">
      {items?.map((item) => (
        <SingleCard data={item} key={item._id} />
      ))}
    </div>
  );
}
