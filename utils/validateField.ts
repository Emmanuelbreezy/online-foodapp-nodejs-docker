
function validateRequiredFields(fields: string[], data: any) {
  return fields.find((field) => !data[field]);
}

export { validateRequiredFields };
