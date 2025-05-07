const AWS = require('aws-sdk');

// Inicializar cliente de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerTask = async (event) => {
  try {
    // Obtener el ID de la ruta
    const { id } = event.pathParameters;

    // Obtener un solo item de la tabla por su ID
    const result = await dynamoDB.get({
      TableName: process.env.TAREAS_TABLE || 'tareasTable',
      Key: {
        id: id
      }
    }).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Tarea no encontradaa' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Tarea obtenida correctamente',
        data: result.Item
      })
    };

  } catch (error) {
    console.error('Error al obtener tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener tarea',
        error: error.message
      })
    };
  }
};
