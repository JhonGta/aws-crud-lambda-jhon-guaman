exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hola mudo desde la espe sede santo domingo!",
    }),
  };
};
