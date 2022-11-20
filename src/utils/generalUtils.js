const delay = (time) =>
  new Promise((resolve, reject) => {
    console.log("created");

    setTimeout(() => {
      console.log("setTimeout - created");
      resolve(time);
    }, time);
  });

export { delay };
