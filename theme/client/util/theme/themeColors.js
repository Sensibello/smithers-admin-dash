import skinColorCustom from "@@/client/styles/variables/skin/_color-custom.scss";

function getValueByName(name, arrValues) {
  for (let i = 0; i < arrValues.length; i++) {
    // debugger
    const arrValueItem = arrValues[i].trim().split(":");
    if (arrValueItem[0].trim() === name) return arrValueItem[1].trim();
  }
  return false;
}

// Receive sass variables using string format, to avoid :export problem using inner maps
function strVariantToMap(strVariants) {
  const data = {};

  if (!strVariants) return data;

  const tmpVariants = strVariants.substring(1, strVariants.length - 1);

  const strColors = tmpVariants.split(",");
  for (let i = 0; i < strColors.length; i++) {
    let colorStr = strColors[i].trim();
    colorStr = colorStr.substring(1, colorStr.length - 1); // strColors[i]
    const values = colorStr.split(";");
    // console.log(values)
    const colorName = getValueByName("name", values);
    data[colorName] = {
      light: getValueByName("light", values),
      dark: getValueByName("dark", values),
      mixed: getValueByName("mixed", values),
      "mixed-1": getValueByName("mixed-1", values),
      base: getValueByName("base", values),
      trans: getValueByName("trans", values).replace(/\[COMMA\]/g, ","),
    };
  }

  return data;
}

export default (skinName) => {
  let variablesColors = skinColorCustom;
  // if (skinName === "color-custom") variablesColors = skinColorCustom;

  variablesColors.variantsObj = strVariantToMap(variablesColors.variants);

  return variablesColors;
};
