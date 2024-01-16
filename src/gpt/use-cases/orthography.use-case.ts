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
        content:
          'Tu nombre es Jack, debes de responder amablemente, presentarte y dar tu nombre, debes de actuar como un médico, recibiras consultas sobre diagnósticos y posibles medicamentos a utilizar con un paciente',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion);

  return completion.choices[0];
};
