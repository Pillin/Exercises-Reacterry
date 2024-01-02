import { useState } from "react";
import styled from "styled-components";

const animalData = [
  { name: "Eagle", class: "Birds" },
  { name: "Penguin", class: "Birds" },
  { name: "Parrot", class: "Birds" },
  { name: "Lion", class: "Mammals" },
  { name: "Tiger", class: "Mammals" },
  { name: "Elephant", class: "Mammals" },
  { name: "Cobra", class: "Reptiles" },
  { name: "Lizard", class: "Reptiles" },
  { name: "Tortoise", class: "Reptiles" },
  { name: "Salmon", class: "Fish" },
  { name: "Shark", class: "Fish" },
  { name: "Trout", class: "Fish" },
];

const LabelFilter = () => {
  const [filteredAnimals, setFilteredAnimals] = useState(animalData);
  const [selectedAnimalClass, setSelectedAnimalClass] = useState([]);

  const onHandleClick =
    ({ animalClass }) =>
    () => {
      const newSelectedAnimals = selectedAnimalClass.includes(animalClass)
        ? selectedAnimalClass.filter((elem) => elem !== animalClass)
        : [...selectedAnimalClass, animalClass];

      const filteredAnimals = animalData.filter((elem) =>
        newSelectedAnimals.includes(elem.class),
      );
      setFilteredAnimals(filteredAnimals);
      setSelectedAnimalClass(newSelectedAnimals);
    };

  const animalClasses = Array.from(
    new Set(animalData.map((animal) => animal.class)),
  );

  return (
    <Wrapper>
      <div data-testid="labels-wrapper-id" className="label-container">
        {animalClasses.map((animalClass) => (
          <div
            data-testid="label-id"
            className={`label ${
              selectedAnimalClass.includes(animalClass) && "selected"
            }`}
            key={animalClass}
            onClick={onHandleClick({ animalClass })}
          >
            {animalClass}
          </div>
        ))}
      </div>
      <div data-testid="tile-container-id" className="tile-container">
        {filteredAnimals.map((animal) => (
          <div data-testid="animal-tile-id" className="tile" key={animal.name}>
            {animal.name}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default LabelFilter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  margin: 24px;
  gap: 24px;

  .label-container {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .label {
      background-color: #fff;
      color: #333;
      border: 1px solid #333;
      border-radius: 4px;
      margin-bottom: 8px;
      padding: 6px 12px;
      cursor: pointer;
      transition: 0.1s ease-in-out;

      &:hover {
        opacity: 0.8;
      }

      &.selected {
        background-color: #333;
        color: #fff;
      }
    }
  }

  .tile-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .tile {
      background-color: #333;
      color: #fff;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      min-width: 120px;
    }
  }
`;
