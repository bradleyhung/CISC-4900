import { OnboardingComponentProps } from "@/app/utils/interface";
import React from "react";

const dogBreeds = [
  "No Preference",
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "German Shorthaired Pointer",
  "Yorkshire Terrier",
];

const catBreeds = [
  "No Preference",
  "Persian",
  "Maine Coon",
  "Ragdoll",
  "Sphynx",
  "Siamese",
  "British Shorthair",
  "Abyssinian",
  "Bengal",
  "Birman",
  "Oriental Shorthair",
];

export default function BreedTypeForm({
  currentItem,
  handleFormData,
  data,
  previousData,
}: OnboardingComponentProps) {
  const [selected, setSelected] = React.useState<string[]>(
    Array.isArray(data) ? data : []
  );
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    const item = selected.find((k) => k === e.currentTarget.id);
    let resolve = [...selected, e.currentTarget.id];
    const removeSelected = (id: string) => {
      const index = resolve.indexOf(id)
      resolve.splice(index, 1)
      console.log(resolve)
      setSelected(resolve);
    }
    if(item === "No Preference") {
      removeSelected(item)
      console.log("Selected no Preference")

    } else {
      console.log("without Preference")
    } 
    handleFormData(resolve);
  };

  return (
    <div className="w-full py-5">
      <div className="py-2">
        <h1 className="text-2xl font-bold font-poppins text-center py-2">
          {currentItem.question}
        </h1>
      </div>
      <ul className="grid md:grid-cols-2 grid-cols-1 gap-3 py-5 h-96 md:h-auto overflow-auto md:border-none border p-5 md:rounded-none rounded-xl">
        {(previousData.data === "Cat" ? catBreeds : dogBreeds).map((item) => (
          <li
            id={item}
            onClick={handleClick}
            key={item}
            className={`border rounded-full py-2 cursor-pointer ${
              item !== "No Preference" &&
              selected.includes("No Preference") &&
              "pointer-events-none bg-slate-300"
            }  ${
              selected.find((e) => e === item) ? "bg-slate-500" : "bg-inherit"
            } `}
          >
            <input
              className={`pointer-events-none opacity-0 cursor-pointer`}
              type="radio"
              name={item}
              id={item}
            />
            <label className="cursor-pointer" htmlFor={item}>
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
