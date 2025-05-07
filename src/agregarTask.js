const { v4 } = require('uuid');
const AWS = require('aws-sdk');

exports.agregarTask = async (event) => {
  try {
    const { titulo, descripcion } = JSON.parse(event.body);  
    const fechaCreacion = new Date().toISOString();
    const id = v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const items = {
      id,
      titulo,
      descripcion,
      fechaCreacion
    };

    await dynamoDB.put({
      TableName: 'tareasTable',
      Item: items  
    }).promise(); 

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tarea agregada correctamente', data: items })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al agregar tarea', error: error.message })
    };
  }
};
