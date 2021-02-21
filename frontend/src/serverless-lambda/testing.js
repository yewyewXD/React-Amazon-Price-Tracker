exports.handler = function (event, context, callback) {
  // Parse data sent from frontend and validate
  const body = JSON.parse(event.body);
  if (!body) {
    return callback(null, {
      statusCode: 400,
      body: "No body detected",
    });
  }

  console.log(body);

  // success!
  // callback(null, {
  //   statusCode: 200,
  //   body: "Successfully sent mail!",
  // });
};
