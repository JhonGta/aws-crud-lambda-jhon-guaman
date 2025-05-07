const AWS = require('aws-sdk');

// Inicializar cliente de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerTasks = async (event) => {
  try {
    // Obtener todos los items de la tabla
    const result = await dynamoDB.scan({
      TableName: process.env.TAREAS_TABLE || 'tareasTable'
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Tareas obtenidas correctamente',
        data: result.Items
      })
    };

  } catch (error) {
    console.error('Error al obtener tareas:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener tareas',
        error: error.message
      })
    };
  }
};
