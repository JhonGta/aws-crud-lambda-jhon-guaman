const AWS = require('aws-sdk');

// Inicializar cliente de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.actualizarTask = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { titulo, descripcion } = JSON.parse(event.body);

    // Validar entrada
    if (!titulo && !descripcion) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Se requiere al menos un campo para actualizar' })
      };
    }

    // Construir expresión de actualización dinámicamente
    const updateExpression = [];
    const expressionAttributeValues = {};

    if (titulo) {
      updateExpression.push('titulo = :titulo');
      expressionAttributeValues[':titulo'] = titulo;
    }

    if (descripcion) {
      updateExpression.push('descripcion = :descripcion');
      expressionAttributeValues[':descripcion'] = descripcion;
    }

    const result = await dynamoDB.update({
      TableName: process.env.TAREAS_TABLE || 'tareasTable',
      Key: { id },
      UpdateExpression: `set ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Tarea actualizada correctamente',
        data: result.Attributes
      })
    };

  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al actualizar tarea',
        error: error.message
      })
    };
  }
};
