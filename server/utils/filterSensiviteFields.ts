import mongoose from "mongoose";

export default (rawFields: string, Model: any) => {
  const modelPaths = Model.schema.paths;
  const newFieldList = rawFields
    .split(",")
    .filter((field) => {
      return !modelPaths[field].options.sensivite;
    })
    .join(" ");

  return newFieldList;
};
