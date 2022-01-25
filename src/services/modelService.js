import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore/lite";
import db from "../db";

const modelsCollection = collection(db, "models");

export async function getModelsByFieldAndValue(field, value) {
  const modelsQuery = query(
    modelsCollection,
    orderBy(field),
    startAt(value),
    endAt(`${value}\uf8ff`),
    limit(20)
  );

  const modelSnapshots = await getDocs(modelsQuery);

  const models = [];

  modelSnapshots.forEach((model) => {
    models.push({ ...model.data(), id: model.id });
  });

  console.log(models);

  return models;
}
