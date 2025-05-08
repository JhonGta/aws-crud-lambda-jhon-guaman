const AWS = require('aws-sdk');

// Inicializar cliente de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.eliminarTask = async (event) => {
  try {
    const { id } = event.pathParameters;

    await dynamoDB.delete({
      TableName: 'tareasTable',
      Key: { id }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Tarea eliminada correctamente',
        id
      })
    };

  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al eliminar tarea',
        error: error.message
      })
    };
  }
};
