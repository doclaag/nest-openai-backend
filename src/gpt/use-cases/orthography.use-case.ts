import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
          Las palabras usadas deben de exitir en el diccionario de la RAE,
          Debes de responder en formato JSON,
          tu tarea es corregirlos y retornar información solucionada,
          también debes de dar un porcentaje de aciertos por el usuario,

          Si no hay errores, debes de retornar un mensaje de felicitacions.

          Ejemplo de respuesta:

          {
            userScore: number,
            errors: string[], // ['error -> solución']
            message: string, // Usa emojis y texto para felicitar al usuario
          }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 150,
    temperature: 0.3,
  });

  // console.log(completion);
  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
