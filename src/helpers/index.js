export const formPath = (looper) => {
  let path = "";
  looper.forEach((each) => {
    path += `${each}>children>`;
  });

  return path;
};
export const formFilePath = (looper, fileList) => {
  let path = "home/";
  looper.forEach((each) => {
    path += `${fileList[each].name}/`;
    fileList = fileList[each].children
      ? fileList[each].children
      : fileList[each];
  });
  return path;
};
export const updateValueBasedOnPath = (source, looper, update) => {
  let path = formPath(looper).split(">");

  for (let i = 0; i < path.length - 2; i++) {
    source = source[path[i]];
  }

  source.children = update;
};
